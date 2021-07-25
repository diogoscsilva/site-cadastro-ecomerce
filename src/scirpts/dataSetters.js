import storage from "./dataController"

function setCliente (cliente, nomePrevio) {
  const {nome, email, cpf, dataNascimento, telefone,
    cep, rua, numero, bairro, cidade, estado} =  cliente
  if (nome !== null || email !== null || cpf !== null ||
    cep !== null || numero !== null) {
      storage.setRow("clientes",
        {
          nome,
          email,
          cpf,
          dataNascimento: (dataNascimento &&
            new Date(dataNascimento).getTime()) || '',
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


  function setProduto (produtoObj, nomeProdutoPrevio) {
    const {produto, preco, descricao, foto} = produtoObj
    if (produto !== null || preco !== null) {
      const quantidade = 0
      storage.setRow("produtos", 
        {
          produto,
          descricao,
          preco,
          foto,
          quantidade,
        },
        nomeProdutoPrevio
      )
      storage.commit()
    }
  }
  
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

  function reduzQuantidadeProduto (nomeProduto, quantidade) {
      const produtoQuantidade = parseInt(storage.getField("produtos", "quantidade", nomeProduto))
      const quantidadeRetirada = parseInt(quantidade)
      if (produtoQuantidade < quantidadeRetirada) {
        throw new Error('Quantidade indiponivel')
      }
      let quantidadeNecessaria = quantidadeRetirada
      let produtoLote = 0
      let numLote = storage.getRow("produtoLoteIndex", nomeProduto + produtoLote)
      let lote = storage.getRow("lotes", numLote)
      let origemLotes = ''
      while (lote && quantidadeNecessaria > 0) {
        if (lote.disponiveis > 0) {
          if (lote.disponiveis >= quantidadeNecessaria) {
            storage.setField("lotes", "disponiveis", numLote, lote.disponiveis - quantidadeNecessaria)
            origemLotes += numLote + '(' + quantidadeNecessaria + ')|'
            quantidadeNecessaria = 0
            break
          } else {
            origemLotes += numLote + '(' + lote.disponiveis + ')|'
            quantidadeNecessaria -= lote.disponiveis
            storage.setField("lotes", "disponiveis", numLote, 0)
          }
        }
        produtoLote++
        numLote = storage.getRow("produtoLoteIndex", nomeProduto + produtoLote)
        lote = storage.getRow("lotes", numLote)
      }
      storage.setField("produtos", "quantidade",nomeProduto, produtoQuantidade - quantidadeRetirada)
      return origemLotes
  }
     

  function setLote (lote) {
    const {produto, valor, quantidade} = lote
    if (produto !== null || valor !== null || quantidade !== null) {
      const data = new Date().getTime()
      storage.setRow("lotes", {
        produto,
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

  function setNota (notaReferencias) {
    if (notaReferencias.nome !== null || notaReferencias.produto !== null ||
         !notaReferencias.quantidade) {
        const {nome, produto, quantidade} = notaReferencias          
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
    checks: {
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
  }
  export default setters