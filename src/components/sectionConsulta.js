import React, {useState, useEffect} from "react"
import ViewTemplate from "./viewTemplate"
import {buttonsText} from "../scirpts/dataToTemplate"

export default function SectionConsulta () {
 
    const [activeForm, setActiveForm] = useState('produtos')
    const [refresh, setRefresh] = useState(false)
    
    useEffect(()=>{
      setRefresh(false)
    },[refresh])

    const listTable = Object.keys(buttonsText.sectionConsulta).map(tableName => 
      <li>
        <button key={tableName} onClick={
            ()=>{
              setActiveForm(tableName)
              setRefresh(true)
            }
          }
        >
          {buttonsText.sectionConsulta[tableName]}
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
        <ViewTemplate formName={activeForm}/>
      </>
    )
  }