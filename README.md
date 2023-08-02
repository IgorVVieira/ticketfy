# Desafio Backend MB Labs

## 💻 Tencologias utilizadas

- [Node.js](https://nodejs.org/en)
- [Typescript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)
- [Jest](https://jestjs.io/pt-BR/)
- [Docker](https://www.docker.com/)
- [Swagger](https://swagger.io/)
- [JWT](https://jwt.io/)
- [TypeORM](https://typeorm.io/)

Resumidamente, este teste foi desenvolvido utilizando Node.js com o framework NestJS e banco de dados SQLITe em memória, seguindo os princípios da clean architecture e do SOLID. O Docker foi utilizado para criar uma imagem padrão, facilitando os testes e garantindo consistência entre os ambientes. Para realizar os testes unitários, foi utilizado o Jest, enquanto o Swagger foi empregado para criar uma documentação e uma forma mais simples de testar a API.

## 🤔 Enunciado do desafio

"Olá, tudo bem? Estou procurando uma empresa para desenvolver um app de gestão de eventos, a ideia é ter algo que as pessoas possam utilizar para buscar e comprar ingressos para eventos de empresas e universidades. Qual nosso próximo passo?".

Você deverá desenvolver a aplicação backend completa, utilizando typescript, TypeORM ou Prisma, Swagger, documentações (Ex: diagrama), validação de erros e com deploy em docker.

## 🛠️ Requisitos de execução/instalação

Para rodar este projeto, precisa ter o node ou Docker instalado em sua máquina. Se não tem o Docker ou Node instalado, pode encontrá-los no site oficial para download: [Docker](https://www.docker.com/), [Node.js](https://nodejs.org/en).

## Instalação

1. Clone o repositório em sua máquina:

   ```bash
   git clone https://github.com/IgorVVieira/desafio_mb.git
   ```

2. Mude para o diretório do projeto:

   ```bash
   cd desafio_mb
   ```

3. Rode o projeto utilizando Docker Compose:

   ```bash
    docker compose up -d .
   ```

   3.1 - Rode as migrations:

   ```bash
   docker compose exec app npm run migrate:docker
   ```

4. O projeto estará rodando em sua máquina na porta 3000.

## Como testar

Para facilitar a realização dos testes e torná-los mais visualmente acessíveis, foi adicionada uma documentação do Swagger que permite testar todos os endpoints da API. Após instalar o projeto, você pode acessar a documentação em [Documentação](http://localhost:3000/api-docs) para explorar e testar os endpoints de forma mais fácil e interativa.

## ✨ Deploy

A aplicação foi implantada utilizando o [Render](https://render.com/), tornando-a disponível em [Produção](https://test-fpass.onrender.com/api/heroes). Agora, é possível realizar todas as operações no endpoint, e os dados são persistidos em um banco em Postgre que também está hospedado no Render. O deploy é feito automaticamente sempre que um novo código é enviado para a branch master, garantindo um processo de implantação contínuo.

## 🧪 Rodar testes de unidade

Por padrão, a cada push em qualquer uma das branches deste projeto, os testes unitários serão executados automaticamente. Isso foi implementado por meio das actions do GitHub, garantindo que cada nova funcionalidade adicionada seja testada e verificada quanto a possíveis regressões, garantindo assim a integridade do código existente. Essa abordagem ajuda a assegurar que o novo código esteja correto e não cause problemas nas funcionalidades já existentes.

Para rodar os testes unitários com Docker:

```bash
docker compose exec app npm run teste
```

Atualizar code coverage

```bash
docker compose exec app npm run --coverage
```

## 🎉 Requisitos funcionais

- [x] RF01: Visualizar lista de eventos
      O sistema deve exibir uma lista de eventos disponíveis para compra.
      Os eventos devem ser filtrados por categoria (empresas e universidades) e data.
      O usuário deve ser capaz de pesquisar eventos por palavras-chave.
      O sistema deve exibir informações básicas do evento, como título, categoria, data e hora.

- [x] RF02: Visualizar detalhes do evento
      O usuário deve poder ver os detalhes de um evento específico ao selecioná-lo na lista.
      Os detalhes do evento devem incluir localização, data e hora, preço do ingresso e informações adicionais.

- [x] RF03: Cadastro de conta
      Os usuários devem poder cadastrar uma conta no aplicativo.
      O cadastro deve exigir informações como nome, valor em conta e tipo de conta.

- [x] RF04: Comprar ingressos
      Os usuários cadastrados devem poder comprar ingressos para eventos diretamente no aplicativo.
      O sistema deve permitir que os usuários escolham a quantidade de ingressos a serem adquiridos.
      O usuário deve receber uma confirmação após a compra.

- [x] RF05: Visualizar histórico de ingressos comprados
      Os usuários cadastrados devem poder acessar seu histórico de ingressos comprados.
      O histórico deve exibir informações sobre os eventos comprados, como título, data e hora.

- [x] RF06: Criar novos eventos (Para Organizadores de Eventos)
      Os organizadores de eventos devem poder criar novos eventos através do sistema.
      O sistema deve permitir que o organizador forneça informações detalhadas do evento, como título, categoria, data, hora, localização, preço do ingresso e informações adicionais.

- [x] RF07: Acompanhar vendas de ingressos (Para Organizadores de Eventos)
      Os organizadores de eventos devem poder acessar informações de venda dos ingressos de seus eventos.
      O sistema deve exibir a quantidade de ingressos vendidos e a quantidade restante para cada evento.

- [x] RF08: Adicionar/alterar e remover foto de usuário
      Os usuários cadastrados devem poder adicionar ou alterar sua foto de perfil.
      Os usuários devem poder remover sua foto de perfil, se desejarem.

- [x] RF09: Adicionar várias fotos ao eventos (Para Organizadores de Eventos)
      Os organizadores de eventos devem poder adicionar várias fotos para ilustrar seus eventos.
      O sistema deve permitir o upload e gerenciamento das fotos pelo organizador.

- [x] RF10: Encerrar eventos (Para Organizadores de Eventos)
      Os organizadores podem encerrar os eventos, impedindo a compra de ingressos.

## 🎉 Requisitos não funcionais

- [x] Segurança (middleware em rotas necessárias) um usário não pode ver dados de outro usuãrio;
- [x] Permissionamento (middleware em rotas necessárias) para verificar permissionamento, evita que usuários comuns faça tarefas que não são do seu papel;
- [x] Não permitir compra de ingressos sem vaga ou com eventos finalizados.

Todas essas funcionalidades adicionais, além dos requisitos obrigatórios, foram implementadas e estão cobertas por testes de unidade e integração.
