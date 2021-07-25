import storage from "./dataController"
  
  function existeProduto (nomeProuto) {
    const index = storage.getRow('produtosIndex', nomeProuto)
    return storage.getRow('produtos', index) && true
  }
  function existeCliente (nome) {
    const index = storage.getRow('clientesIndex', nome)
    return storage.getRow('clientes', index) && true
  }

  function quantidadeDipsonivel (quantidade, nomeProduto) {
    const produtoQuantidade = parseInt(storage.getField("produtos", "quantidade", nomeProduto))
    return produtoQuantidade >= parseInt(quantidade)
  }

  const checks = {
      notas:{
        quantidade: [quantidadeDipsonivel, 'produto'],
        produto: [existeProduto],
        nome: [existeCliente],
      },
      produtos:{
        produto: [existeProduto],
      },
      lotes:{
        produto: [existeProduto],
      },
      clientes:{
        nome: [existeCliente],
      },
    }

    export default getters