import { connectDatabase } from './database';
import express from 'express'
import routes from './routes'
import "reflect-metadata"

const app = express()
const port = 3000

app.use(express.json())

const iniciarServidor = async () => {
    try {
        await connectDatabase()
        app.use(routes)

        app.listen(port, () => {
            console.log(`App rodando na porta ${port} 💻`);
          })
    } catch (error){
        console.error("Erro ao iniciar o servidor: ", error);
    }
}

iniciarServidor()





