import React, {useState, useEffect} from "react"
import FormTemplate from "./sectionCadastro"


const buttonsText = {
  sectionConsulta: 'Consultas',
  sectionLoja: 'Loja',
  sectionCadastro: 'Cadastros',
}

export default function Views () {
 
    const [activeView, setActiveView] = useState('loja')
    const [refresh, setRefresh] = useState(false)
    
    useEffect(()=>{
      setRefresh(false)
    },[refresh])

   const secitonsComponents = {
    sectionConsulta: <ViewTemplate/>,
     sectionLoja: <Loja/>,
     sectionCadastro: <FormTemplate/>,
   }


    const listSections = Object.keys(buttonsText).map(sectionName => 
      <li>
        <button key={sectionName} onClick={
            ()=>{
              setActiveForm(sectionName)
              setRefresh(true)
            }
          }
        >
          {buttonsText[sectionName]}
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
        {secitonsComponents[activeView]}
      </>
    )
  }
  