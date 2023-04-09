// import { HexColorPicker } from "react-colorful";
// import { useSnapshot } from "valtio";
// import state from "../store";

// export default function ColorPicker(props) {
//   const snap = useSnapshot(state);

//   const updateColor = (pro, value) => {
//     state.colors[pro] = value;
//   };
//   return (
//     <div
//       className={snap.current !== null ? "color-picker" : "color-picker hidden"}
//     >
//       <HexColorPicker
//         color={snap.colors[snap.current]}
//         onChange={(color) => updateColor(snap.current, color)}
//       />
//       <h1>{snap.current}</h1>
//     </div>
//   );
// }

import React from 'react'
import { SketchPicker } from 'react-color'
import { useSnapshot } from 'valtio'

import state from '../store';

const ColorPicker = () => {
  const snap = useSnapshot(state);
  const updateColor = (pro, value) => {
    console.log(value.hex)
    state.colors[pro] = value.hex;
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
    <div className="absolute left-full ml-3 z-30">
      <span className=''>{getHeader()}</span>
      <SketchPicker 
        color={snap.colors[snap.current]}
        disableAlpha
        onChange={(color) => updateColor(snap.current, color)}
        className='z-30'
      />
    </div>
  )
}

export default ColorPicker
