import express from 'express';
import cors from 'cors';
import { inicializarBanco } from './database.js';

const app = express();

// Configura os middlewares essenciais
app.use(cors());
app.use(express.json()); // Permite que o Express entenda requisições no formato JSON

// Inicializa o banco de dados e configura as rotas
inicializarBanco().then((db) => {

  // ----------------------------------------------------
  // REQUISITO 4 e 6: Rota de Cadastro de Usuário (POST)
  // ----------------------------------------------------
  app.post('/api/cadastro', async (req, res) => {
    const { nome, email, senha, confirmarSenha } = req.body;

    // 1. Validação rigorosa na camada do servidor (Requisito 4)
    if (!nome || !email || !senha || !confirmarSenha) {
      return res.status(400).json({ erro: 'Todos os campos são obrigatórios!' });
    }

    if (senha !== confirmarSenha) {
      return res.status(400).json({ erro: 'As senhas não coincidem!' });
    }

    if (senha.length < 8) {
      return res.status(400).json({ erro: 'A senha deve conter no mínimo 8 caracteres!' });
    }

    try {
      // 2. Insere o novo usuário no banco de dados SQLite
      await db.run(
        'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
        [nome, email, senha]
      );

      // Resposta de sucesso (Requisito 5)
      return res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!' });

    } catch (error) {
      // 3. Tratamento de exceções descritivas (Requisito 5)
      // O SQLite retorna o erro 'SQLITE_CONSTRAINT' se o e-mail já estiver cadastrado
      if (error.message.includes('UNIQUE constraint failed')) {
        return res.status(400).json({ erro: 'Este e-mail já está cadastrado!' });
      }

      return res.status(500).json({ erro: 'Falha interna no servidor ao salvar o usuário.' });
    }
  });

  // Inicializa o servidor na porta 5000
  const PORT = 5000;
  app.listen(PORT, () => {
    console.log(`=== Servidor HTTP rodando com sucesso na porta ${PORT} ===`);
  });

}).catch((erro) => {
  console.error('Erro crítico ao inicializar o banco de dados:', erro);
});