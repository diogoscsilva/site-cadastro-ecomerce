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
  setctionConsulta: {
    produtos: 'Consulta de produtos',
    clientes: 'Consulta de clientes',
    lotes: 'Consulta de lotes de produtos',
    notas: 'Consulta de notas de compras',
  },
}

export const dataPreLoad = {
  produtos: [
    {
      descricao: "ferro de passar",
      preco: "150",
      produto: "iron",
      quantidade: 0,
      foto: "./assets/iron.jpg"
    },
  ],
  produtoIndex: {
    iron: 0
  }
}

