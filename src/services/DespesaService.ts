import { getRepository, Repository } from 'typeorm';
import { Despesa } from '../entity/Despesa';
import { UsuarioComum } from '../entity/UsuarioComum';
import { UsuarioComumService } from './UsuarioComumService';
import { Status } from '../enums/Status';

export class DespesaService {
    private static instance: DespesaService;
    private despesaRepository: Repository<Despesa>;

    private constructor() {
        this.despesaRepository = getRepository(Despesa);
    }

    public static async getInstance(): Promise<DespesaService> {
        if (!DespesaService.instance) {
            DespesaService.instance = new DespesaService();
        }
        return DespesaService.instance;
    }

    public async criar(dados: Despesa, idUsuario: number): Promise<Despesa> {
        const usuarioRepository = getRepository(UsuarioComum);
    
        const usuario = await usuarioRepository.findOne({
            where: { id: idUsuario },
            relations: ['despesas'] 
        });
    
        if (!usuario) {
            throw new Error("Usuário não existente");
        }
    
        // Garantir que despesas seja um array
        usuario.despesas = usuario.despesas || [];
    
        const despesa = this.despesaRepository.create(dados);
        despesa.usuario = usuario;
    
        const despesaCriada = await this.despesaRepository.save(despesa);
    
        // Adiciona a despesa criada à lista de despesas do usuário
        usuario.despesas.push(despesaCriada);
        await usuarioRepository.save(usuario);
    
        // Retorna a despesa criada, incluindo o usuário
        const despesaComUsuario = await this.despesaRepository.findOne({
            where: { id: despesaCriada.id },
            relations: ['usuario'] 
        });
    
        if (!despesaComUsuario) {
            throw new Error("Erro ao buscar despesa criada");
        }
    
        return despesaComUsuario;
    }

    public async salvar(despesa: Despesa): Promise<Despesa>{
        return await this.despesaRepository.save(despesa)
    }

    public async listar(): Promise<Despesa[]> {
        return await this.despesaRepository.find();
    }

    public async buscarPorId(id: number): Promise<Despesa | undefined> {
        return await this.despesaRepository.findOne({
            where: { id: id }
        }) ?? undefined;
    }

    public async deletarTodos(): Promise<void> {
        await this.despesaRepository.clear();
    }

    public async deletar(id: number): Promise<void> {
        await this.despesaRepository.delete(id);
    }

    public async atualizar(dados: Despesa, id: number): Promise<Despesa> {
        const despesa = await this.despesaRepository.findOne({
            where: { id: id }
        });

        if (!despesa) throw new Error("Despesa não encontrada");

        despesa.titulo = dados.titulo;
        despesa.descricao = dados.descricao;
        despesa.valor = dados.valor;
        despesa.categoria = dados.categoria;

        await this.despesaRepository.save(despesa);

        return despesa;
    }


    public async realizarOperacao(idDespesa: number, idUsuario: number): Promise<void> {
        const usuarioComumService = await UsuarioComumService.getInstance();

        // Buscar a despesa e o usuário
        const despesa = await this.buscarPorId(idDespesa);
        const usuario = await usuarioComumService.buscarPorId(idUsuario);

        if (!despesa || !usuario) throw new Error("Despesa ou Usuário não encontrados");
        
        if(despesa.status === Status.FINALIZADO) throw new Error("Esta conta já foi finalizada, tente com outra");

        // Verificar se a despesa está na lista de despesas do usuário
        const despesaExiste = usuario.despesas.some(d => d.id === idDespesa);

        if (!despesaExiste) throw new Error("Despesa não encontrada na lista de despesas do usuário");
        
        // Realizar a operação
        despesa.operacao(despesa, usuario);

        // Salvar as mudanças
        await this.salvar(despesa);
        await usuarioComumService.criar(usuario); 
    }
}
