import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Usuario } from '../entity/Usuario';

export class AuthService {
  
  static async login(email: string, senha: string) {
    const usuarioRepository = getRepository(Usuario);

    const usuario = await usuarioRepository.findOne({ where: { email } });

    if (!usuario) {
      return { status: 404, message: 'Usuário não encontrado.' };
    }

    const ehSenhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!ehSenhaValida) {
      return { status: 401, message: 'Credenciais inválidas' };
    }

    const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    return { status: 200, token };
  }

  static verificaToken(token: string) {
    try {
      const decodificado = jwt.verify(token, process.env.JWT_SECRET as string);
      return { status: 200, decodificado };
    } catch (error) {
      return { status: 401, message: 'Token inválido.' };
    }
  }
}
