import React, {Image} from "react"
import storage from "../scirpts/dataController"

export default function Loja () {
    
  const itensLength = storage.length('produtos')
  let intesList = []
  for (let i = 0; i < itensLength; i++) {
    let item = storage.getRow('produtos', i)
    const foto = require(item.foto)
    intesList.push(
      <section className= "section">
        <div className = "card">
          <h3 className = "product-name">{item.produto}</h3>
          <Image
            source = {foto} alt={item.produto}
          />
          <p className = "description">
            {item.descricao}
          </p>
          <p className = "description">
            Preco: {item.preco}
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