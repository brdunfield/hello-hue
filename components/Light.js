import React, { useState } from 'react';
import { Toggle } from "./ui-components/Toggle";
import { BrightnessSlider } from "./ui-components/BrightnessSlider";
import { ColourPicker } from "./ui-components/ColourPicker";

export const Light = (props) => {
  const {name, id, state, children} = props;
  console.log(state);

  // parse state values
  const ct = (state && state.colormode) ? state.colormode : "ct";
  const bri = (state && state.bri) ? state.bri : 254;
  const hsv = (state && state.hue) ? {h: state.hue, s: state.sat, v:50} : {h: 0, s:0, v:100};

  const [expanded, setExpanded] = useState(false);

  return (
    <li id={"light-" + id} className="inline-block my-2 cursor-pointer w-full relative bg-gray-700">
      <div className="mb-2 p-2" onClick={() => setExpanded(!expanded)}>
        <span className="inline-block w-3/4 relative">{children || name}</span>
        <span className="float-right">
          <Toggle id={id} active={(state && 'on' in state) ? state.on : true }></Toggle>
        </span>
      </div>
      {expanded ? (
        <ColourPicker hsv={hsv} id={id}></ColourPicker>
      ) : ""}
      <BrightnessSlider brightness={bri} hsv={hsv} ct={ct} id={id}></BrightnessSlider>
    </li>
  )
};

export default Light;