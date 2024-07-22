// src/database.ts
import { createConnection, getRepository, Connection } from 'typeorm';
import { Usuario } from './entity/Usuario';
import { Receita } from './entity/Receita';
import { Despesa } from './entity/Despesa';

let connection: Connection

export const connectDatabase = async () => {
  try {
    
    connection = await createConnection();
    console.log('Conectado com Banco de dados com sucesso! ✅');
  } catch (error) {
    console.error('Erro ao se conectar com o banco: ', error);
    throw error;
  }
};

export const getUsuarioRepository = () => {
  return getRepository(Usuario);
};

export const getReceitaRepository = () => {
  return getRepository(Receita)
}

export const getDespesaRepository = () => {
  return getRepository(Despesa)
}

export const getConnection = (): Connection => {
  if (!connection){
    throw new Error("Conexao com o bd nao estabelecida")
  }
  return connection
}


