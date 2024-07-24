import { connectDatabase } from './database';
import express from 'express'
import bodyParser from 'body-parser'; 
import rotaUsuario from './routes/UsuarioRoutes'
import rotaReceita from './routes/ReceitaRoutes'
import rotaDespesa from './routes/DespesaRoutes'
import rotaAuth from './routes/AuthRoutes'
import cors from 'cors'

import "reflect-metadata"


const app = express()
const port = 8080




app.use(cors())

app.use(express.json())
app.use(bodyParser.json())
app.use("/api/usuarioComum", rotaUsuario)
app.use("/api/receita", rotaReceita)
app.use("/api/despesa", rotaDespesa)
app.use("/api/auth", rotaAuth)



const iniciarServidor = async () => {
    try {
        await connectDatabase()
        
        app.listen(port, () => {
            console.log(`App rodando na porta ${port} 💻`);
          })
    } catch (error){
        console.error("Erro ao iniciar o servidor: ", error);
    }
}

iniciarServidor()







