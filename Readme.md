# Sistema de Cadastro e Autenticação
# Sistema de Cadastro e Autenticação de Usuários

Este projeto consiste em uma aplicação web full-stack desenvolvida como atividade prática para a disciplina. A aplicação implementa um fluxo completo de cadastro de usuários com validações rigorosas tanto na camada de apresentação (Frontend) quanto na camada de persistência e lógica de negócios (Backend).

---

## 🚀 Tecnologias, Programas e Bibliotecas Utilizadas

### 💻 Ambiente de Desenvolvimento e Ferramentas
* **Node.js (v20+):** Ambiente de execução JavaScript runtime no lado do servidor, utilizado para construir o ecossistema do backend e gerenciar pacotes do ecossistema front-end.
* **Git & GitHub:** Ferramentas utilizadas para o controle de versão distribuído, histórico de commits e hospedagem do código na nuvem.
* **Visual Studio Code (VS Code):** Editor de código-fonte utilizado para o desenvolvimento de todo o projeto.

### ⚙️ Backend (Servidor e Banco de Dados)
* **Express:** Framework web minimalista e rápido para Node.js, utilizado para a criação do servidor HTTP e estruturação das rotas da API.
* **SQLite3 & SQLite (Driver):** Mecanismo de banco de dados SQL leve e serverless. Os dados são persistidos localmente em um único arquivo (`database.sqlite`). O pacote `sqlite` foi adotado para permitir o uso moderno de Promises (`async/await`).
* **CORS:** Middleware utilizado para habilitar o mecanismo de *Cross-Origin Resource Sharing*, permitindo que a aplicação React (rodando em uma porta distinta) se comunique de forma segura com a API Express.

### 🎨 Frontend (Interface do Usuário)
* **React.js:** Biblioteca JavaScript baseada em componentes para a construção de interfaces de usuário dinâmicas.
* **Vite:** Ferramenta de build moderna e extremamente rápida utilizada para gerar e servir a estrutura do projeto React.
* **React Hook Form:** Biblioteca otimizada para o gerenciamento de formulários no React através de componentes não-controlados, reduzindo o número de renderizações desnecessárias e tratando erros em tempo real.
* **Axios:** Cliente HTTP baseado em Promises utilizado para realizar as requisições assíncronas (chamadas de API) do Frontend para o Backend.

---

## 📋 Requisitos da Atividade Prática e Entregas

Abaixo estão detalhados os passos solicitados e como cada requisito técnico foi rigorosamente atendido e entregue nesta aplicação:

### 1. Persistência de Dados (Requisito 1)
* **O que foi entregue:** Implementação de um banco de dados relacional **SQLite**. Ao iniciar o servidor backend, o arquivo `database.sqlite` é gerado automaticamente e uma tabela chamada `usuarios` é criada contendo os campos: `id` (chave primária incremental), `nome`, `email` (definido como `UNIQUE` no banco) e `senha`.

### 2. Gerenciamento de Estado no Frontend (Requisito 2)
* **O que foi entregue:** Integração completa da biblioteca **React Hook Form** no arquivo `Cadastro.jsx`. O estado do formulário e o ciclo de vida dos inputs são controlados através da função `register`, garantindo máxima performance de renderização.

### 3. Validação dos Campos do Formulário (Requisito 3 e 4)
* **O que foi entregue:**
  * **No Frontend:** Validação em tempo real bloqueando o envio caso existam campos vazios, validação de formato de e-mail por expressão regular (RegEx), exigência de no mínimo 8 caracteres para a senha e verificação de igualdade entre os campos "Senha" e "Confirmação de Senha". Os erros são exibidos imediatamente abaixo de cada input.
  * **No Backend:** Validação duplicada na camada do servidor. Caso uma requisição intercepte a API com dados nulos ou senhas divergentes, o Express bloqueia a operação retornando o status HTTP `400 Bad Request`.

### 4. Tratamento de Exceções Descritivas (Requisito 5)
* **O que foi entregue:** O backend trata erros de forma explícita através de blocos `try/catch`. Caso o usuário tente cadastrar um e-mail que já existe, o banco dispara uma violação de restrição (`UNIQUE constraint failed`), o servidor captura e responde amigavelmente informando que o e-mail já está em uso, evitando falhas ocultas ou crash do sistema.

### 5. Integração e Comunicação HTTP (Requisito 6)
* **O que foi entregue:** A interface React utiliza a biblioteca **Axios** para disparar uma requisição assíncrona do tipo **POST** para o endpoint `http://localhost:5000/api/cadastro`. O sucesso e as falhas controladas retornadas pela API são exibidos ao usuário através de alertas na tela.

---

## 📂 Estrutura de Diretórios do Projeto

SistemaAutenticacao/
├── Backend/
│   ├── database.js          # Configuração e inicialização do SQLite
│   ├── server.js            # Servidor Express e rotas da API (Cadastro)
│   ├── package.json         # Dependências do servidor (Express, SQLite3, Cors)
│   └── .gitignore           # Ignora a pasta node_modules e arquivos locais
├── Frontend/
│   ├── src/
│   │   ├── Cadastro.jsx     # Componente da tela de cadastro (React Hook Form + Axios)
│   │   ├── App.jsx          # Componente raiz que renderiza a tela
│   │   └── main.jsx         # Ponto de entrada do React
│   ├── package.json         # Dependências da interface (React, Axios, Hook Form)
│   └── vite.config.js       # Configurações do Vite
└── README.md                # Documentação do projeto

🛠️ Como Executar o Projeto Localmente
Clonar o Repositório:
git clone [https://github.com/Marcospy/SistemaAutenticacao.git](https://github.com/Marcospy/SistemaAutenticacao.git)
cd SistemaAutenticacao

Iniciar o Backend:
cd Backend
npm install
node server.js
(O servidor iniciará na porta 5000)

Iniciar o Frontend:
Abra outro terminal e navegue:
cd Frontend
npm install
npm run dev
(Abra o link gerado pelo Vite no navegador, ex: http://localhost:5173)
