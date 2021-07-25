import React, {useState, useEffect} from "react"
import FormTemplate from "./formTemplate"


const buttonsText = {
  produtos: 'Cadastro de produtos',
  lotes: 'Inclusao de lote de produto',
  notas: 'Emissao de nota',
  clientes: 'Cadastro de clientes',
}

export default function SectionCadastro (props) {
 
    const [activeForm, setActiveForm] = useState('produtos')
    const [refresh, setRefresh] = useState(false)
    
    useEffect(()=>{
      setRefresh(false)
    },[refresh])

    const listTable = Object.keys(buttonsText).map(tableName => 
      <li>
        <button key={tableName} onClick={
            ()=>{
              setActiveForm(tableName)
              setRefresh(true)
            }
          }
        >
          {buttonsText[tableName]}
        </button>
      </li>
    )
   
    return refresh ?
      (
        <></>
      ):
      (
      <>
        <nav>
          <ul>
            {listTable}
          </ul>
        </nav>
        <FormTemplate formName={activeForm}/>
      </>
    )
  }
  