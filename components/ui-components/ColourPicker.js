import React, { useState } from 'react';

export const ColourPicker = (props) => {
  const {hsv, id} = props;

  // TODO - render colour picker dot at initial light hue value

  const [active, setActive] = useState(false);
  const [xpos, setXPos] = useState(80),
    [ypos, setYPos] = useState(80);

  const [saturation, setSat] = useState(hsv.s);
  const [hue, setHue] = useState(hsv.h);

  // 11 rem is 176px diameter;
  // 1 rem is 16px;
  // picker diameter is 24px;
  
  const handlePickerMove = (e) => {
    if (active) {
      // get center of the picker circle
      const rect = e.target.getBoundingClientRect();
      const x = e.clientX - rect.left - 12,
        y = e.clientY - rect.top - 12;
      
      const parentEle = document.getElementById("light-" + id + "picker").getBoundingClientRect();
      const center = {
        x: parentEle.left + (parentEle.height/2), // use height because it's not a block element
        y: parentEle.top + (parentEle.height/2)};
      
      // limit the distance from the center of the circle to 176/2 px (radius)
      // dist is also the saturation value
      let dist = Math.sqrt(Math.pow(e.clientX - center.x, 2) + Math.pow(e.clientY - center.y, 2));
      if (dist < 88) {
        setXPos(xpos + x);
        setYPos(ypos + y);

        // max saturation hits a little closer in because it's hard to drop the dot right on the edge
        setSat(Math.round(Math.min(255,dist/82*255)));
      }

    }
  };

  const handleSetNewColour = async (e) => {
    setActive(false);
    // convert x and y to a hue based on angle  
    // relative center of the picker is at x=88, y=88
    const x = xpos + 12 - 88,
      y = ypos + 12 - 48 - 88; // TODO - find this programmatically. 48 is distance from top of light ele to top of picker ele

    // 0 hue is vertical line at x=88
    // relative: (0,0) -> (0,-88)
    // https://math.stackexchange.com/questions/878785/how-to-find-an-angle-in-range0-360-between-2-vectors
    const dot = (x*0) + (y*-88);
    const det = (x*-88) + (y*0);
    let angle = -Math.atan2(det, dot);
    if (angle < 0)
      angle += Math.PI*2

    // convert to range 0 - 65535
    //console.log(angle/(Math.PI*2)* 65535);

    // call the API
    const req = {
      id: id,
      state: {
        "hue": Math.round(angle/(Math.PI*2) * 65535),
        "sat": saturation
      }
    }
    const resp = await fetch("/api/hue", {
      method: 'POST',
      body: JSON.stringify(req)
    }).then(response => response.json())
      .then(data => {
        setHue(Math.round(angle/(Math.PI*2) * 65535));
        //console.log(saturation);
        hsv.h = Math.round(angle/(Math.PI*2) * 65535);
      });
  }


  return (
    <div className="h-48">
      <div 
        className="pickerPosition" 
        style={{top: ypos + "px", left: xpos + "px"}}
        onMouseDown={() => {setActive(true)}}
        onMouseUp={handleSetNewColour}
        onMouseMove={handlePickerMove}
        ></div>
      <div className="radialGradient" id={"light-" + id + "picker"}></div>
      <div className="conicGradient"></div>
    </div>
  )
};
export default ColourPicker;