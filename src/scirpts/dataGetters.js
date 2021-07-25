import storage from "./dataController"

function getClienteNome (nome) {
  return getByPrimaryIndex ('clientes', 'clientesIndex', nome, trataCliente)
}
function trataCliente (cliente) {
  if (cliente) {
    if (cliente.dataNascimento) {
      cliente.dataNascimento = getDateString(cliente.dataNascimento)
    }
    return cliente
  }
}
function getByPrimaryIndex (nomeTabela, nomeIndex, nomeProp, tratamentoFunc) { 
  const index = storage.getRow(nomeIndex, nomeProp)
  let data = storage.getRow(nomeTabela, index)
  data = tratamentoFunc(data)
  if (data) {
    return data
  }
}

  function getDateString (time) {
    if (time) {
      const dateObj =  new Date(time)
      const dateString = 
        '' + dateObj.getDate() + '/' +
        dateObj.getMonth()+ '/' +
        dateObj.getFullYear()
      return dateString
    }
  }

  function getProdutoProduto (nomeProduto) {
    return getByPrimaryIndex ('produtos', 'produtosIndex', nomeProduto, trataProduto)
  }
  function trataProduto (produto) {
    if (produto) {
      delete produto.foto
      return produto
    }
  }  

  function trataLote (lote) {
    if (lote && lote.data) {
      lote.data = getDateString(lote.data)
      return lote
    }
  }
  function getLoteProduto (nomeProduto) {
    return getByForeignIndex("lotes", "produtoLoteIndex", nomeProduto, trataLote)
  }


  function getByForeignIndex (nomeTabela, nomeIndex, nomeProp, tratamentoFunc) {
    const itens = []
    let numero = 0
    let numProp = storage.getRow(nomeIndex, nomeProp + numero)
    let item = storage.getRow(nomeTabela, numProp)
    while (item) {
      item = tratamentoFunc(item)
      if (item) {
        itens.unshift(item)
      }
      numero++
      numProp = storage.getRow(nomeIndex, nomeProp + numero)
      item = storage.getRow(nomeTabela, numProp)
    }
    return (itens.length < 2 && itens[0]) || itens
  }
  
  function getNotaProduto (nomeProduto) {
    return getByForeignIndex("notas", "produtoNotaIndex", nomeProduto, trataNota)
  }

  function getNotaNome (nome) {
    return getByForeignIndex("notas", "nomeNotaIndex", nome, trataNota)
  } 

  function trataNota (nota) {
    if (nota && nota.data) {
      delete nota.nome
      delete nota.produto
      nota.data = getDateString(nota.data)
      return nota
    }
  }

  const getters = {
    notas:{
      produto: getNotaProduto,
      nome: getNotaNome,
    },
    lotes:{
      produto: getLoteProduto,
    },
    produtos:{
      produto: getProdutoProduto,
    },
    clientes:{
      nome: getClienteNome,
    },
  }
  export default getters