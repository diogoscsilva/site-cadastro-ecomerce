import React, {useState, useEffect} from "react"
import InputTemplate from "./inputTemplate"
import storage from "../scirpts/dataController"
import setters from "../scirpts/dataSetters"
import checks from "../scirpts/dataCheckers"
import {tableFields} from "../scirpts/dataToTemplate"

export default function FormTemplate (props) {

    const [temp, setTemp] = useState(storage.getTemp(props.formName))
    const [checkAlert, setCheckAlert] = useState(false)
    const [idPrevia, setIdPrevia] = useState('')
    
    useEffect(() =>{
      setTemp(storage.getTemp(props.formName))
    },[props.formName])

    function setTempField (field) {
      return (value) => {
        storage.setTempField(props.formName, field, value)
        if (checks[props.formName] && checks[props.formName][field]) {
          if (checks[props.formName][field][0](value,
            getTempField(checks[props.formName][field][1])())) {
            setCheckAlert(false)
          } else {
            setCheckAlert(true)
          }
        } else {
          setCheckAlert(false)
        }
      }
    }
    
    function getTempField (field) {
      return () => {
        storage.getTempField(props.formName, field)
      }
    }

    function submitHandler (e) {
      e.preventDefault()
      setters[props.formName] (storage.getTemp(props.formName), idPrevia)
      storage.setTemp(props.formName, {})
      setTemp({})
    }
    
    const listInput = tableFields.formTemplate[props.formName].map(field =>
      <InputTemplate 
        key={field[0]} fieldName={field[0]} temp={temp[field[0]]}
        getTempField={getTempField(field[0])} info = {field[1]}
        setTempField={setTempField(field[0])}
        className={(checkAlert && 'inputAlert') || ''}
      />
    )
    
    return (
      <div className="card">
        <form action="" onSubmit={submitHandler}>
         <input type="text" value = {idPrevia} 
           onChage={e => setIdPrevia(e.target.value)}
           placeholder="colacar id previa para trocar"
         />
         {listInput}
         <input type="submit" value = "Enviar" aria-label = "Enivar os dados para cadastro"/>
    
        </form>
      </div>
    )
  }