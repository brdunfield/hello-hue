import React, { useState } from 'react';

export const BrightnessSlider = (props) => {
  const {brightness, hsv, ct, id} = props;

  const[bri, setBri] = useState(brightness);

  const gradientString = ct == "hs" || ct == "xy" ?
    "linear-gradient(to right, #000000 0%, hsl(" + hsv.h/65280*360 + "," + Math.round(hsv.s/255*100) + "%, 50%)" :
    "linear-gradient(to right, #000000 0%, #FFEAB8 100%)";

  const updateBrightnessValue = (e) => {
    e.stopPropagation();
    setBri(e.target.value);
  };
  const updateLightBrightness = async (e) => {
    const req = {
      id: id,
      state: {
        "bri": parseInt(bri),
        "on": true
      }
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
  return (
    <div style={{background: gradientString}} className="h-6 w-full">
        <input type="range" min="0" max="254" value={bri} onChange={updateBrightnessValue} onMouseUp={updateLightBrightness} className="brightness-slider w-full h-6 appearance-none bg-transparent"></input>
    </div>
  )
};

export default BrightnessSlider;