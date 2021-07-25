import React, {useState, useEffect} from "react"
import InputTemplate from "./inputTemplate"
import storage from "../scirpts/dataController"
const tableFields = {
    produtos: [
      ['produto', 'nome do produto'],
    ],
    clientes: [
      ['nome', 'nome'],
    ],
}

export default function ViewTemplate (props) {

    const [temp, setTemp] = useState('')
    const [dataOutput, setDataOutput] = useState([])

    useEffect(() =>{
      setTemp('')
    },[props.formName])


    function setTempField (field) {
      return (value) => {
        const itemName = storage.getField(props.formName, field, value)
        if (itemName) {
          let data = []
          const index = storage.getRow(props.formName + 'Index', itemName)
          const item = storage.getRow(props.formName, index)
          for (let prop in item) {
            if (item.hasOwnProperty(prop)) {
              data.push(
                <p key={prop}>{prop} : {item[prop]}</p>
              )
            }
          }
          setDataOutput(data)
        } else {
          setDataOutput([])
        }
        setTemp(value)
      }
    }
    
    function getTempField (field) {
      return () => ''
    }

    
    const listInput = tableFields[props.formName].map(field =>
      <InputTemplate key={field[0]} fieldName={field[0]} temp={temp}
      getTempField={getTempField(field[0])} info = {field[1]}
      setTempField={setTempField(field[0])}/>
    )


    return (

      <div>
         {listInput}
         {dataOutput}
      </div>
    )
  }