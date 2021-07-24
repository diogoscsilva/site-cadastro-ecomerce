import storage from "dataController"

setCliente = function (cliente, nomePrevio) {
  const {nome, email, cpf, dataNascimento, telefone,
    cep, rua, numero, bairro, cidade, estado} =  cliente
  if (nome !== null || email !== null || cpf !== null ||
    cep !== null || numero !== null) {
      storage.setRow("clientes",
        {
          nome,
          email,
          cpf,
          dataNascimento: dataNascimento &&
            new Date(dataNascimento).getTime() || '',
          telefone,
          cep,
          rua,
          numero,
          bairro,
          cidade,
          estado,
        },
        nomePrevio
      )
      storage.commit()
    }
  }


setProduto = function (produtoObj, nomeProdutoPrevio) {
    const {produto, preco, descricao} = produtoObj
    if (produto !== null || preco !== null) {
      const quantidade = 0
      storage.setRow("produtos", 
        {
          produto,
          descricao,
          preco,
          quantidade,
        },
        nomeProdutoPrevio
      )
      storage.commit()
    }
  }
  
  quantidadeDipsonivel = function (nomeProduto, quantidade) {
      let produtoQuantidade = parseInt(storage.getField("produtos", "quantidade", nomeProduto))
      return produtoQuantidade >= parseInt(quantidade)
  }
  reduzQuantidadeProduto = function (nomeProduto, quantidade) {
      const produtoQuantidade = parseInt(storage.getField("produtos", "quantidade", nomeProduto))
      const quantidadeRetirada = parseInt(quantidade)
      if (produtoQuantidade < quantidadeRetirada) {
        throw 'Quantidade indiponivel'
      }
      let quantidadeNecessaria = quantidadeRetirada
      let produtoLote = 0
      let numLote = storage.getRow("produtoLoteIndex", produto + produtoLote)
      let lote = storage.getRow("lotes", numLote)
      let origemLotes = ''
      while (lote && quantidadeNecessaria > 0) {
        if (lote.disponiveis > 0) {
          if (lote.disponiveis >= quantidadeNecessaria) {
            storage.setField("lotes", "disponiveis", numLote, lote.disponiveis - quantidadeNecessaria)
            quantidadeNecessaria = 0
            origemLotes += numLote + '|'
            break
          } else {
            quantidadeNecessaria -= lote.disponiveis
            storage.setField("lotes", "disponiveis", numLote, 0)
            origemLotes += numLote + '|'
          }
        }
        produtoLote++
        numLote = storage.getRow("produtoLoteIndex", produto + produtoLote)
        lote = storage.getRow("lotes", numLote)
      }
      storage.setField("produtos", "quantidade",produto, produtoQuantidade - quantidadeRetirada)
      return origemLotes
  }
     

setLote = function (lote) {
    const {produto, valor, quantidade} = lote
    if (produto !== null || valor !== null || quantidade !== null) {
      const data = new Date().getTime()
      storage.setRow("lotes", {
        nome,
        valor,
        data,
        quantidade,
        disponiveis: quantidade,
      })
      let produtoQuantidade = parseInt(storage.getField("produtos", "quantidade", produto))
      storage.setField('produtos', 'quantidade', produto, produtoQuantidade + parseInt(quantidade))
      storage.commit()
    }
  }

setNota = function (notaReferencias) {
    if (notaReferencia.nome !== null || notaReferencia.produto !== null ||
         !notaReferencia.quantidade) {
        const {nome, produto, quantidade} = notaReferencia          
        let preco = storage.getField("produtos", "preco", produto)
        let cliente = storage.getRow("clientes", nome) || {}
        let data = new Date().getTime()
        let origemLotes = reduzQuantidadeProduto(produto, quantidade)
        storage.setRow("notas", {
          nome,
          produto,
          nomeNota: nome,
          produtoNota: produto,
          data,
          quantidade,
          preco,
          lote : origemLotes,
          email: cliente.email ,
          cpf: cliente.cpf,
          dataNascimento: cliente.dataNascimento,
          telefone: cliente.telefone,
          cep: cliente.cep,
          rua: cliente.rua,
          numero: cliente.numero,
          bairro: cliente.bairro,
          cidade: cliente.cidade,
          estado: cliente.estado,
        })
        storage.commit()
    }
  }

  const setters = {
    produtos: setProduto,
    lotes: setLote,
    notas: setNota,
    clientes: setCliente,
  }
  export default setters