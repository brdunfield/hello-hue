import React, { useState } from 'react';

export const Toggle = (props) => {
  const {id, active, handleOnOffUpdate} = props;

  // need a server side method to send the actual command
  const toggleLightState = async () => {
    const req = {
      id: id,
      state: {"on": !active}
    }
    const resp = await fetch("/api/hue", {
      method: 'POST',
      body: JSON.stringify(req)
    }).then(response => response.json())
      .then(data => {
        //console.log(data)
        if (data && !data.error)
          handleOnOffUpdate(!active);
      });
  }

  return (
    <>
      <label className=" switch relative inline-block">
        <input type="checkbox" className="w-0 h-0 opacity-0" checked={active} onChange={() => toggleLightState()}/>
        <span className="slider bg-white"></span>
      </label>
    </>
  )
};

export default Toggle;