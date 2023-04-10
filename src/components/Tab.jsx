import React from 'react'
import { useSnapshot } from 'valtio'

import state from '../store';

const Tab = ({ tab, isFilterTab, isActiveTab, handleClick , okState }) => {
  const snap = useSnapshot(state);

  const activeStyles = isFilterTab && isActiveTab 
    ? { backgroundColor: snap.color, opacity: 0.5 }
    : { backgroundColor: "transparent", opacity: 1 }

const renderState = () => {
    if(tab.name != "ColorPicker"){
        if(tab.name == 'Upload Logo' || tab.name == 'AI Helper') return

        if (tab.name == 'Logo' || tab.name == 'Textures' ){
            if(okState){
                return (
                    <div className="absolute top-[1rem] right-[-1.3rem] w-6 h-6 mr-2 rounded-full bg-green-500 text-xs flex justify-center items-center text-white">
                        On
                    </div>
                )
            }else{
                return(
                    <div className="absolute top-[1rem] right-[-1.3rem] w-6 h-6 mr-2 rounded-full bg-gray-500 text-xs flex justify-center items-center text-white">
                        Off
                    </div> 
                )
    
            } 
        }

        if(okState){
            return (
                <div className="absolute top-[-1rem] right-[-1rem] text-green-500 text-3xl">
                    &#10003;
                </div>
            )
        }else{
            return(
                <div className="absolute top-[-1rem] right-[-0.7rem] text-red-500 text-3xl">
                    &#63;
                </div> 
            )

        } 
    }
     
}

  return (
        <div className='relative flex flex-wrap justify-center'>
            <div
                key={tab.name}
                className={`tab-btn ${isFilterTab ? 'rounded-full glassmorphism' : 'rounded-4'}`}
                onClick={handleClick}
                style={activeStyles}
                >
                <img 
                    src={tab.icon}
                    alt={tab.name}
                    className={`${isFilterTab ? 'w-2/3 h-2/3' : 'w-11/12 h-11/12 object-contain'}`}
                />
        
            </div>
        
            { renderState() }
            <span className=' text-sm'>{(tab.name)}</span>
        </div>


  )
}
export default Tab