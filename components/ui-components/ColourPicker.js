import React, { useState } from 'react';

export const ColourPicker = (props) => {
  const {hsv, id} = props;

  const [active, setActive] = useState(false);
  const [xpos, setXPos] = useState(80),
    [ypos, setYPos] = useState(80);

  // 11 rem is 176px diameter;
  // 1 rem is 16px;
  // picker diameter is 24px;
  
  const handlePickerMove = (e) => {
    if (active) {
      const rect = e.target.getBoundingClientRect();
      const x = e.clientX - rect.left - 12,
        y = e.clientY - rect.top - 12;
      
      setXPos(xpos + x);
      setYPos(ypos + y);
      // TODO limit the distance from the center of the circle to
      // 176/2 px (radius)
    }
  };

  console.log(active);

  return (
    <div className="h-48">
      <div 
        className="pickerPosition" 
        style={{top: ypos + "px", left: xpos + "px"}}
        onMouseDown={() => {setActive(true)}}
        onMouseUp={() => setActive(false)}
        onMouseMove={handlePickerMove}
        ></div>
      <div className="radialGradient"></div>
      <div className="conicGradient"></div>
    </div>
  )
};
export default ColourPicker;