import React, {useState, useEffect} from "react"
import InputTemplate from "./inputTemplate"
import getters from "../scirpts/dataGetters"
const tableFields = {
    produtos: [
      ['produto', 'nome do produto'],
    ],
    clientes: [
      ['nome', 'nome'],
    ],
    lotes: [
      ['produto', 'nome do produto'],
    ],
    notas: [
      ['nome', 'nome do cliente'],
      ['produto', 'nome do produto'],
    ],
}

export default function ViewTemplate (props) {

    const [temp, setTemp] = useState('')
    const [dataOutput, setDataOutput] = useState([])

    useEffect(() =>{
      setTemp('')
    },[props.formName])

    function dataToCompnonent (item) {
      data = []
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
            itens.map((item)=>{
              data.push(<div> {dataToCompnonent(item)}</div>)
            })
          } else {
            data = dataToCompnonent(itens)
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