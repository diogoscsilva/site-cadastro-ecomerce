import React, {useState} from "react"
import FormTemplate from "./formTemplate"


const buttonsText = {
  produtos: 'Cadastro de produtos',
  lotes: 'Inclusao de lote de produto',
  notas: 'Emissao de nota',
  clientes: 'Cadastro de clientes',
}

export default function SectionCadastro (props) {
 
    const [activeForm, setActiveForm] = useState('entrada')
    
    
    const listTable = Object.keys(buttonsText).map(tableName => {
      <li><button key={tableName} onClick={()=>setActiveForm(tableName)}>
          {buttonsText[tableName]}
      </button></li>
    })
   
    return (
      <>
        <nav role = "navigation" aria-level = "main navigation">
          <ul>
            {listTable}
          </ul>
        </nav>
        <FormTemplate formName={activeForm}/>
      </>
    )
  }
  