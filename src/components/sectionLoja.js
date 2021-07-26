import React, {Image} from "react"
import storage from "../scirpts/dataController"
import {ironFoto} from "../assets/iron.jpg"

const fotos = {
  ironFoto,
}

export default function Loja () {
  const itensLength = storage.length('produtos')
  let intesList = []
  for (let i = 0; i < itensLength; i++) {
    let item = storage.getRow('produtos', i)
    const foto =  <Image source={item.foto || fotos[item.produto + 'fotos']}/>
    intesList.push(
      <section className= "section">
        <div className = "card">
          <h3 className = "product-name">{item.produto}</h3>
          {foto}
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