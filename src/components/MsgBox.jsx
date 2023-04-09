import React from 'react'
import CustomButton from './CustomButton'

const MsgBox = ({ prompt, setPrompt, handleSubmit, name, msg }) => {
  return (
    <div className="aipicker-container">
      <textarea 
        placeholder={msg}
        rows={5}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="aipicker-textarea"
      />
      <div className="flex flex-wrap gap-3">

        <CustomButton 
            type="filled"
            title="Save"
            handleClick={() => handleSubmit(name)}
            customStyles="text-xs"
        />
      </div>
    </div>
  )
}

export default MsgBox