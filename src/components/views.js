import React, {useState, useEffect} from "react"
import SectionCadastro from "./sectionCadastro"
import Loja from "./sectionLoja"
import SectionConsulta from "./sectionConsulta"


const buttonsText = {
  sectionConsulta: 'Consultas',
  sectionLoja: 'Loja',
  sectionCadastro: 'Cadastros',
}

export default function Views () {
 
    const [activeView, setActiveView] = useState('sectionLoja')
    const [refresh, setRefresh] = useState(false)
    
    useEffect(()=>{
      setRefresh(false)
    },[refresh])

   const secitonsComponents = {
     sectionConsulta: <SectionConsulta/>,
     sectionLoja: <Loja/>,
     sectionCadastro: <SectionCadastro/>,
   }


    const listSections = Object.keys(buttonsText).map(sectionName => 
      <li>
        <button key={sectionName} onClick={
            ()=>{
              setActiveView(sectionName)
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
            {listSections}
          </ul>
        </nav>
        {secitonsComponents[activeView]}
      </>
    )
  }
  