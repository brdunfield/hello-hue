import React, { useState } from 'react';
import {Toggle} from "./Toggle";
export const Light = (props) => {
  const {name, id, state, children} = props;
  //console.log(state);

  const [ct, setCT] = useState((state && state.colormode) ? state.colormode : "ct");

  const[bri, setBri] = useState((state && state.bri) ? state.bri : 254);
  const[hsv, setHSV] = useState((state && state.hue) ? {h: state.hue, s: state.sat, v:50} : {h: 0, s:0, v:100})

  const updateBrightnessValue = (e) => {
    setBri(e.target.value);
  };
  const updateLightBrightness = async (e) => {
    const req = {
      id: id,
      state: {"bri": parseInt(bri)}
    }
    const resp = await fetch("/api/hue", {
      method: 'POST',
      body: JSON.stringify(req)
    }).then(response => response.json())
      .then(data => {
        //console.log(data)
        if (data && !data.error)
        setBri(bri);
      });
  }

  const gradientString = ct == "hs" || ct == "xy" ?
    "linear-gradient(to right, #000000 0%, hsl(" + hsv.h/65280*255 + "," + Math.round(hsv.s/255*100) + "%, 50%)" :
    "linear-gradient(to right, #000000 0%, #FFEAB8 100%)";

  return (
    <li className="inline-block my-2 cursor-pointer w-full relative bg-gray-700">
      <div className="mb-2 p-2">
        <span className="inline-block w-3/4 relative">{children || name}</span>
        <span className="float-right">
          <Toggle id={id} active={(state && 'on' in state) ? state.on : true }></Toggle>
        </span>
      </div>
      <div style={{background: gradientString}} className="h-6 w-full">
        <input type="range" min="0" max="254" value={bri} onChange={updateBrightnessValue} onMouseUp={updateLightBrightness} className="brightness-slider w-full h-6 appearance-none bg-transparent"></input>
      </div>
    </li>
  )
};

export default Light;