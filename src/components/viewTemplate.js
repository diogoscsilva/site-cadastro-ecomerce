import React, {useState, useEffect} from "react"
import InputTemplate from "./inputTemplate"
import storage from "../scirpts/dataController"
import setters from "../scirpts/dataSetters"
const tableFields = {
    produtos: [
      ['produto', 'nome do produto'],
    ],
    clientes: [
      ['nome', 'nome'],
    ],
}

export default function ViewTemplate (props) {

    const [temp, setTemp] = useState(storage.getTemp(props.formName))
    let dataOuput = []
    useEffect(() =>{
      setTemp(storage.getTemp(props.formName))
    },[props.formName])


    function setTempField (field) {
      return (value) => {
        const itemName = storage.getField(props.formName, field, value)
        if (itemName) {
          const item = storage.getRow(storage.getRow(props.formName + 'Index', itemName))
          for (let prop in item) {
            if (item.hasOwnProperty(prop)) {
              dataOuput.push(
                <p>{prop} : {item[prop]}</p>
              )
            }
          }
        } else {
          dataOuput = []
        }
      }
    }
    
    function getTempField (field) {
      return () => ''
    }

    function submitHandler (e) {
      e.preventDefault()
      setters[props.formName] (storage.getTemp(props.formName))
      storage.setTemp(props.formName, {})
      setTemp({})
    }
    
    const listInput = tableFields[props.formName].map(field =>
      <InputTemplate key={field[0]} fieldName={field[0]} temp={temp[field[0]]}
      getTempField={getTempField(field[0])} info = {field[1]}
      setTempField={setTempField(field[0])}/>
    )


    return (
      <div className="card">
        <form action="" onSubmit={submitHandler}>
         {listInput}
         {dataOuput}
        </form>
      </div>
    )
  }