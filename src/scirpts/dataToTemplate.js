
export const schema = {
  lotes: {
    primariesTables : {
      produto: "produtos",
    },
  },
  notas: {
    primariesTables : {
      produto: "produtos",
      nome: "clientes",
    },
  },
  clientes: {
    foreingIndexes : {
      notas: "nomeNotaIndex",
    },
    fieldIndex: 'nome'
  },
  produtos: {
    foreingIndexes : {
      lotes: "produtoLoteIndex",
      notas: "produtoNotaIndex",
    },
    fieldIndex: 'produto'
  },
}

export const tableFields = {
  formTemplate:{
    produtos: [
      ['produto', 'nome do produto'],
      ['descricao', 'descricao do produto'],
      ['preco', 'preco do produto'],
      ['foto', 'link da foto do produto'],
    ],
    clientes: [
      ['nome', 'nome'],
      ['email', 'email'],
      ['cpf', 'cpf'],
      ['dataNascimento', 'data de nascimento'],
      ['telefone', 'telefone'],
      ['cep', 'cep'],
      ['rua', 'rua'],
      ['numero', 'numero'],
      ['bairro', 'bairro'],
      ['cidade', 'cidade'],
      ['estado', 'estado'],
    ],
    lotes: [
      ['produto', 'nome do produto'],
      ['valor', 'valor da unidade'],
      ['quantidade', 'quantidade do produto'],
    ],
    notas: [
      ['nome', 'nome do cliente'],
      ['produto', 'nome do produto'],
      ['quantidade', 'quantidade do produto'],
    ],
  },
  viewTemplate:{
    produtos: [
      ['produto', 'nome do produto'],
    ],
    clientes: [
      ['nome', 'nome'],
    ],
    lotes: [
      ['produto', 'nome do produto'],
    ],
    notas: [
      ['nome', 'nome do cliente'],
      ['produto', 'nome do produto'],
    ],
  }
}


export const buttonsText = {
   views: {
    sectionConsulta: 'Consultas',
    sectionLoja: 'Loja',
    sectionCadastro: 'Cadastros',
  },
  sectionCadastro: {
    produtos: 'Cadastro de produtos',
    lotes: 'Inclusao de lote de produto',
    notas: 'Emissao de nota',
    clientes: 'Cadastro de clientes',
  },
  sectionConsulta: {
    produtos: 'Consulta de produtos',
    clientes: 'Consulta de clientes',
    lotes: 'Consulta de lotes de produtos',
    notas: 'Consulta de notas de compras',
  },
}

export const dataPreLoad = {
  produtos: [
    {
      descricao: "notebook apple",
      preco: "10.500",
      produto: "apple",
      foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfvXZE7HUKJKySqWof5yx1JzVrHZRdx5xp8w&usqp=CAU",
      quantidade: 0,
    },
    {
      descricao: "ferro de passar",
      preco: "150",
      produto: "iron",
      foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzCoxdXgijSpFy_FiJLJgpoTA1ZMXmCa3KyA&usqp=CAU",
      quantidade: 0,
    },
    {
      descricao: "torradeira",
      preco: "740",
      produto: "toaster",
      foto: "https://images-americanas.b2w.io/produtos/1526236448/imagens/torradeira-eletrica-yabano-4-fatias-estilo-retro-aco-inoxidavel-amarelo-110v/1526236448_1_large.jpg",
      quantidade: 0,
    },
    {
      descricao: "smartphone",
      preco: "6800",
      produto: "iphone",
      foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJbaEA-P4dUVAXvOCCqpUH3T3QTp2AJ-eVfQ&usqp=CAU",
      quantidade: 0,
    },
    {
      descricao: "monitor ultrawwide",
      preco: "1150",
      produto: "monitos",
      foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRU7onot7ovElGTOUtM5hX5-rerzAWBjxEaw&usqp=CAU",
      quantidade: 0,
    },
    {
      descricao: "barbeador eletrico",
      preco: "180",
      produto: "razor",
      foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcNSdmQz1-L4NRy5fFzsGp77fVOKm1uSq2zw&usqp=CAU",
      quantidade: 0,
    },
  ],
  produtoIndex: {
    iron: 0
  }
}

