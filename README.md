Pagina de cadastro de e-comerce simples para atividade de aprendizado no Hiring Coders.

Projeto desenvolvido utilizando React e JavaScript com estilo de orientação objeto funcional, sem uso de classes, com encapsulamento através de closures.

No projeto foram desenvolvidos templates simples, permitindo que alterações funcionalidades apenas através de arquivos javascript contendo as regras de negócio, esquema de tabela relacional e estrutura da página.

Desta forma os templates estão desacoplados da estrutura da página e das regras de negócio, podemos usar os mesmos templates para outras aplicações sem mudar o código dos mesmo.

dataController.js
dataToTemplate.js
O armazenamento de dados no cliente é feito no local storage, mas se não estiver disponível no navegador o armazenamento será feito nos cookies  como alternativa, mantendo a mesma funcionalidade. Dados pré-carregados são disponibilizados por uma estrutura de dados e serão guardados caso o local storage esteja vazio.
Os dados são armazenados em um esquema de tabela relacional simples com um esquema chave primária única ou local da inserção na lista. Podendo haver Chaves estrangeiras com  restrição e checagem de integridade relacional. São disponibilizados index através de dicionários para tabelas com chaves estrangeiras e para tabela que definem um campo como chave primária no esquema através do campo fildIndex do schema.

dataCheckers.js
dataGetters.js
dataSetters.js
Validação  e checagem de dados, bem como aplicação das regras de negócio podem ser feitas através dos getters e setters. Também é possível interação dos dados do cliente checagem através do data checkers.


Site hospedado neste link: [landing page] (https://infallible-heyrovsky-91057a.netlify.app).