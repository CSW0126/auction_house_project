import React from 'react'
import { SketchPicker } from 'react-color'
import { useSnapshot } from 'valtio'

import state from '../store';

const ColorPicker = () => {
  const snap = useSnapshot(state);
  const updateColor = (pro, value) => {
    console.log(value.hex)
    if(snap.myItemShow == 'shoe'){
      state.colors[pro] = value.hex;
    }else if(snap.myItemShow == 'TShirt'){
      state.TShirtColor = value.hex;
    }
  };

  const getHeader = () => {
    try{
      if(snap.current === null) return "Nothing Selected"
      let capitalizedStr = snap.current.charAt(0).toUpperCase() + snap.current.slice(1);
      return capitalizedStr
    }catch(err){
      console.error(err)
      return "Nothing Selected"
    }
  }

  return (
    <div className="absolute left-full ml-3 z-30 top-[10rem] md:top-auto">
      <span className=''>{getHeader()}</span>
      <SketchPicker 
        color={snap.myItemShow == 'shoe' ?  snap.colors[snap.current] : snap.TShirtColor}
        disableAlpha
        onChange={(color) => updateColor(snap.current, color)}
        className='z-30'
      />
    </div>
  )
}

export default ColorPicker
