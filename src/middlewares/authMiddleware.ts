import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET não está definido nas variáveis de ambiente');
}

interface JwtPayload {
    id: number;
}

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    console.log('Cabeçalho de Autorização:', authHeader);

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        console.log('Token:', token);

        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
                console.log('Erro na verificação do token:', err);
                return res.sendStatus(403);
            }

            req.userId = (user as JwtPayload).id; // Agora o TypeScript deve reconhecer `userId`
            console.log('ID do usuário do token:', req.userId);
            next();
        });
    } else {
        console.log('Não autorizado');
        res.sendStatus(401);
    }
};
