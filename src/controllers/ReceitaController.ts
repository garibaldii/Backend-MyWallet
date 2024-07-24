import { Request, Response } from 'express';
import { ReceitaService } from '../services/ReceitaService';
import { UsuarioComumService } from '../services/UsuarioComumService';


//USUÁRIO SÓ PODE TER ACESSO AS RECEITAS/DESPESAS QUE ELE MESMO CRIOU, OU SEJA, SÓ TERÁ ACESSO AOS
//ENPOINS ONDE ELE MESMO QUEM CADASTROU, IPS DINÂMICOS


export class ReceitaController {


  static async criar(req: Request, res: Response) {
    try {
      const receitaService = await ReceitaService.getInstance();

      const receita = req.body

      const idUsuario = req.body.usuario.id;

      const receitaCriada = await receitaService.criar(receita, idUsuario);

      const receitaParaResposta = {
        id: receitaCriada.id,
        titulo: receitaCriada.titulo,
        descricao: receitaCriada.descricao,
        valor: receitaCriada.valor,
        categoria: receitaCriada.categoria,
        usuario: {
          id: receitaCriada.usuario.id,
        }
        // Não inclua a propriedade 'usuario' para evitar ciclo
      }

      return res.status(201).json(receitaParaResposta);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao criar receita: ' + error });
    }
  }

  static async listarTodos(req: Request, res: Response){
    try {
      const receitaService = await ReceitaService.getInstance()
      const receitas = await receitaService.listar()

      return res.status(200).json(receitas)
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao listar receitas', error });
    }
  }


  static async listarUm(req: Request, res: Response){
    try {
      const receitaService = await ReceitaService.getInstance()
      const receita = await receitaService.buscarPorId(Number(req.params.id))

      if(!receita){
        return res.status(404).json({message: 'Receita não encontrada.'})
      }
      return res.status(200).json(receita)

    } catch (error) {
      return res.status(500).json({ message: 'Erro ao listar receita ' + error });
    }
  }


 


  static async deletarTodos(req: Request, res: Response){
    try {
        const receitaSerice = await ReceitaService.getInstance()
        
        receitaSerice.deletarTodos()

        return res.status(201).json('receitas excluídas com sucesso!')
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao excluir receitas: ' + error });
        
    }
  }

  static async deletarUm(req:Request, res: Response){
    try {
      const receitaService = await ReceitaService.getInstance()
      const receita = await receitaService.buscarPorId(Number(req.params.id))
      if(!receita){
        return res.status(404).json({message: 'Receita não encontrada.'})
      }

      await receitaService.deletar(Number(req.params.id))
      return res.status(200).json({message: "Receita excluída com sucesso!"})

    }catch(error){
     return res.status(500).json({ message: 'Erro ao deletar receita: '})
    }


}

static async atualizar(req: Request, res: Response) {
  try {
    const receitaService = await ReceitaService.getInstance();
    const id = Number(req.params.id);

    const receitaExistente = await receitaService.buscarPorId(id);

    if (!receitaExistente) {
      return res.status(404).json({ message: 'Receita não encontrada.' });
    }

    const dadosAtualizados = req.body;
    const receitaAtualizada = await receitaService.atualizar(dadosAtualizados, id);

    return res.status(200).json(receitaAtualizada);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao atualizar receita: ' + error });
  }
}

static async realizarOperacao(req: Request, res: Response) {
  try{
    const receitaService = await ReceitaService.getInstance()
    const usuarioComumService = await UsuarioComumService.getInstance()

    const idReceita = Number(req.params.idReceita)
    const idUsuarioComum = Number(req.params.idUsuarioComum)


    await receitaService.realizarOperacao(idReceita,idUsuarioComum)

    return res.status(200).json({
      message: 'Operacao Realizada com sucesso',
      receita: await receitaService.buscarPorId(idReceita),
      usuario: await usuarioComumService.buscarPorId(idUsuarioComum)
  })
  }
  catch(error){
    return res.status(500).json(`Erro ao realizar a operacao da receita ${error}`)
  }

}



}
