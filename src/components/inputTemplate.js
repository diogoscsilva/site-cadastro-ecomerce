import React, {useState, useEffect} from "react"
export default function InputTemplate (props) {
 
    const [field, setField] = useState(props.temp)
    
    useEffect(() =>{
      setField(props.temp)
    },[props.temp])
   
    return (
      <input type="text" placeholder={props.info} 
        className = {props.className}
        value={field} onChange = {
          e => {
            setField(e.target.value)
          }
        }
        onBlur = { 
          e => {
            if (e.target.value !== props.getTempField()) {
              props.setTempField(e.target.value)
            }
          }
        }
      />
    )
  }
  