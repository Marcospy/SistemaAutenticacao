import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Função para abrir a conexão com o banco e criar as tabelas
export async function inicializarBanco() {
  // Abre o arquivo do banco de dados (se não existir, o SQLite cria na hora)
  const db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  });

  // Cria a tabela de usuários se ela ainda não existir
  // Guardando Nome, E-mail (único) e Senha conforme a especificação do projeto
  await db.exec(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      senha TEXT NOT NULL
    )
  `);

  console.log('--- Banco de dados SQLite inicializado e pronto! ---');
  return db;
}
