import React, {useState, useEffect} from "react"
import InputTemplate from "./inputTemplate"
import storage from "../scirpts/dataController"
import setters from "../scirpts/dataSetters"
const tableFields = {
    produtos: [
      'produto',
      'descricao',
      'preco',
      'foto',
    ],
    clientes: [
      'nome',
      'email',
      'cpf',
      'dataNascimento',
      'telefone',
      'cep',
      'rua',
      'numero',
      'bairro',
      'cidade',
      'estado',
    ],
    lotes: [
      'valor',
      'data',
      'produto',
      'quantidade',
      'disponiveis',
    ],
    notas: [
      'nome',
      'produto',
      'nomeNota',
      'produtoNota',
      'data',
      'quantidade',
      'preco',
      'lote',
      'email',
      'cpf',
      'dataNascimento',
      'telefone',
      'cep',
      'rua',
      'numero',
      'bairro',
      'cidade',
      'estado',
    ],
}

export default function FormTemplate (props) {

    const [temp, setTemp] = useState(storage.getTemp(props.formName))
    
    useEffect(() =>{
      setTemp(storage.getTemp(props.formName))
    },[props.formName])

    function setTempField (field) {
      return (value) => {
        storage.setTempField(props.formName, field, value)
      }
    }
    
    function getTempField (field) {
      return () => {
        storage.getTempField(props.formName, field)
      }
    }

    function submitHandler (e) {
      e.preventDefault()
      setters[props.formName] (storage.getTemp(props.formName))
      storage.setTemp(props.formName, {})
      setTemp({})
    }
    
    const listInput = tableFields[props.formName].map(fieldName =>
      <InputTemplate key={fieldName} fieldName={fieldName} temp={temp[fieldName]}
        getTempField={getTempField(fieldName)}  setTempField={setTempField(fieldName)}/>
    )
    
    return (
      <div className="card">
        <form action="" onSubmit={submitHandler}>
         {listInput}
         <input type="submit" value = "Enviar" aria-label = "Enivar os dados para cadastro"/>
    
        </form>
      </div>
    )
  }