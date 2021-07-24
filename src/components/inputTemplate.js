import {useState, useEffect} from "react"
export default function InputTemplate (props) {
 
    const [field, setField] = useState(props.temp)
    
    useEffect(() =>{
      setField(temp)
    },[props.temp])
   
    return (
      <input type="text" placeholder={props.fieldName} 
        value={field} onChange = {
          e => {
            setField(e.target.value)
          }
        }
        onBlur = { 
          e => {
            props.setTemp(e.target.value)
          }
        }
      />
    )
  }
  