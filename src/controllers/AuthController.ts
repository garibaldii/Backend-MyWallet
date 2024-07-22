import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';

export class AuthController {
  
  static async login(req: Request, res: Response) {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
    }

    try {
      const response = await AuthService.login(email, senha);
      if (response.token) {
        return res.json({ token: response.token });
      } else {
        return res.status(response.status).json({ message: response.message });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  }

  static async verifyToken(req: Request, res: Response) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Token não fornecido.' });
    }

    try {
      const response = AuthService.verificaToken(token);
      return res.status(response.status).json(response.status === 200 ? response.decodificado : { message: response.message });
    } catch (error) {
      return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  }
}
