import React, {useState, useEffect} from "react"
import InputTemplate from "./inputTemplate"
import getters from "../scirpts/dataGetters"
import {tableFields} from "../scirpts/dataToTemplate"

export default function ViewTemplate (props) {

    const [temp, setTemp] = useState('')
    const [dataOutput, setDataOutput] = useState([])
    const [checkAlert, setCheckAlert] = useState(false)

    useEffect(() =>{
      setTemp('')
    },[props.formName])

    function dataToCompnonent (item) {
      const data = []
      for (let prop in item) {
        if (item.hasOwnProperty(prop)) {
          data.push(
            <p key={prop}>{prop} : {item[prop]}</p>
          )
        }
      }
      return data
    }

    function setTempField (field) {
      return (value) => {
        const itens = getters[props.formName][field](value)
        if (itens) {
          let data = []
          if (itens.length && itens.map) {
            for (let i = 0; i < itens.length; i++) {
              data.push(<div> {dataToCompnonent(itens[i])}</div>)
            }
          } else {
            data = dataToCompnonent(itens)
          }
          setDataOutput(data)
          setCheckAlert(false)
        } else {
          setCheckAlert(true)
          setDataOutput([])
        }
        setTemp(value)
      }
    }
    
    function getTempField (field) {
      return () => ''
    }

    
    const listInput = tableFields.viewTemplate[props.formName].map(field =>
      <InputTemplate 
        key={field[0]} fieldName={field[0]} temp={temp}
        getTempField={getTempField(field[0])} info = {field[1]}
        setTempField={setTempField(field[0])}
        className={(checkAlert && 'inputAlert') || ''}
      />
    )


    return (

      <div>
         {listInput}
         {dataOutput}
      </div>
    )
  }