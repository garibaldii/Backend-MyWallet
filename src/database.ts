// src/database.ts
import { createConnection, getRepository, Connection } from 'typeorm';
import { UsuarioComum } from './entity/UsuarioComum';
import { Receita } from './entity/Receita';
import { Despesa } from './entity/Despesa';
import { Usuario } from 'entity/abstratas/Usuario';

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

export const getUsuarioComumRepository = () => {
  return getRepository(UsuarioComum);
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


