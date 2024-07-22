import { Request, Response } from 'express';
import { Despesa } from './../entity/Despesa';
import { DespesaService } from '../services/DespesaService';

export class DespesaController {

  //USUÁRIO SÓ PODE TER ACESSO AS RECEITAS/DESPESAS QUE ELE MESMO CRIOU, OU SEJA, SÓ TERÁ ACESSO AOS
//ENPOINS ONDE ELE MESMO QUEM CADASTROU, IPS DINÂMICOS


  static async criar(req: Request, res: Response) {
    try {
      const despesaService = await DespesaService.getInstance();

      const despesa = req.body;

      const idUsuario = req.body.usuario.id;

      const despesaCriada = await despesaService.criar(despesa, idUsuario);

      const despesaParaResposta = {
        id: despesaCriada.id,
        titulo: despesaCriada.titulo,
        descricao: despesaCriada.descricao,
        valor: despesaCriada.valor,
        categoria: despesaCriada.categoria,
        usuario: {
          id: despesaCriada.usuario.id,
        }
        // Não inclua a propriedade 'usuario' para evitar ciclo
      }

      return res.status(201).json(despesaParaResposta);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao criar despesa: ' + error });
    }
  }

  static async listarTodos(req: Request, res: Response) {
    try {
      const despesaService = await DespesaService.getInstance();
      const despesas = await despesaService.listar();

      return res.status(200).json(despesas);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao listar despesas', error });
    }
  }

  static async listarUm(req: Request, res: Response) {
    try {
      const despesaService = await DespesaService.getInstance();
      const despesa = await despesaService.buscarPorId(Number(req.params.id));

      if (!despesa) {
        return res.status(404).json({ message: 'Despesa não encontrada.' });
      }
      return res.status(200).json(despesa);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao listar despesa: ' + error });
    }
  }

  static async deletarTodos(req: Request, res: Response) {
    try {
      const despesaService = await DespesaService.getInstance();
      
      await despesaService.deletarTodos();

      return res.status(200).json('Despesas excluídas com sucesso!');
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao excluir despesas: ' + error });
    }
  }

  static async deletarUm(req: Request, res: Response) {
    try {
      const despesaService = await DespesaService.getInstance();
      const despesa = await despesaService.buscarPorId(Number(req.params.id));
      
      if (!despesa) {
        return res.status(404).json({ message: 'Despesa não encontrada.' });
      }

      await despesaService.deletar(Number(req.params.id));
      return res.status(200).json({ message: 'Despesa excluída com sucesso!' });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao deletar despesa: ' + error });
    }
  }

  static async atualizar(req: Request, res: Response) {
    try {
      const despesaService = await DespesaService.getInstance();
      const id = Number(req.params.id);

      const despesaExistente = await despesaService.buscarPorId(id);

      if (!despesaExistente) {
        return res.status(404).json({ message: 'Despesa não encontrada.' });
      }

      const dadosAtualizados = req.body;
      const despesaAtualizada = await despesaService.atualizar(dadosAtualizados, id);

      return res.status(200).json(despesaAtualizada);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao atualizar despesa: ' + error });
    }
  }
}
