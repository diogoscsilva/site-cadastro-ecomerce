import React, {useState, useEffect} from "react"
import InputTemplate from "./inputTemplate"
import storage from "../scirpts/dataController"
import setters from "../scirpts/dataSetters"
import checkes from "../scirpts/dataCheckers"
const tableFields = {
    produtos: [
      ['produto', 'nome do produto'],
      ['descricao', 'descricao do produto'],
      ['preco', 'preco do produto'],
      ['foto', 'link da foto do produto'],
    ],
    clientes: [
      ['nome', 'nome'],
      ['email', 'email'],
      ['cpf', 'cpf'],
      ['dataNascimento', 'data de nascimento'],
      ['telefone', 'telefone'],
      ['cep', 'cep'],
      ['rua', 'rua'],
      ['numero', 'numero'],
      ['bairro', 'bairro'],
      ['cidade', 'cidade'],
      ['estado', 'estado'],
    ],
    lotes: [
      ['produto', 'nome do produto'],
      ['valor', 'valor da unidade'],
      ['quantidade', 'quantidade do produto'],
    ],
    notas: [
      ['nome', 'nome do cliente'],
      ['produto', 'nome do produto'],
      ['quantidade', 'quantidade do produto'],
    ],
}

export default function FormTemplate (props) {

    const [temp, setTemp] = useState(storage.getTemp(props.formName))
    const [checkAlert, setCheckAlert] = useState(false)
    
    useEffect(() =>{
      setTemp(storage.getTemp(props.formName))
    },[props.formName])

    function setTempField (field) {
      return (value) => {
        storage.setTempField(props.formName, field, value)
        if (checks[props.formName] && checks[props.formName][field]) {
          if (checks[props.formName][field](value)) {
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
      setters[props.formName] (storage.getTemp(props.formName))
      storage.setTemp(props.formName, {})
      setTemp({})
    }
    
    const listInput = tableFields[props.formName].map(field =>
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
         {listInput}
         <input type="submit" value = "Enviar" aria-label = "Enivar os dados para cadastro"/>
    
        </form>
      </div>
    )
  }