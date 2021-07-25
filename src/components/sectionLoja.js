import React, {useState, useEffect} from "react"
import storage from "../scirpts/dataController"

export default function FormTemplate (props) {

  const [temp, setTemp] = useState(storage.getTemp(props.formName))
    
  useEffect(() =>{
    setTemp(storage.getTemp(props.formName))
  },[props.formName])
    
  const itensLength = storage.length('produtos')
  let intesList = []
  for (let i = 0; i < itensLength; i++) {
    let item = storage.getRow(i)
    intesList.push(
      <section className= "section">
        <div className = "card">
          <h3 className = "product-name">{item.produto}</h3>
          <img
            src = {item.foto} alt={item.produto}
          />
          <p className = "description">
            {item.descricao}
          </p>
        </div>
      </section>
    )
  }
  return (
    <div className = "sections">
      {intesList}
    </div>
  )
}