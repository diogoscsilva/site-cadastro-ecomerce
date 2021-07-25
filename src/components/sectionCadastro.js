import React, {useState, useEffect} from "react"
import FormTemplate from "./formTemplate"
import {buttonsText} from "../scirpts/dataToTemplate"


export default function SectionCadastro (props) {
 
    const [activeForm, setActiveForm] = useState('produtos')
    const [refresh, setRefresh] = useState(false)
    
    useEffect(()=>{
      setRefresh(false)
    },[refresh])

    const listTable = Object.keys(buttonsText.sectionCadastro).map(tableName => 
      <li>
        <button key={tableName} onClick={
            ()=>{
              setActiveForm(tableName)
              setRefresh(true)
            }
          }
        >
          {buttonsText.sectionCadastro[tableName]}
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
  