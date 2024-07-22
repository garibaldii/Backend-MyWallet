import { getRepository, Repository } from 'typeorm';
import { Despesa } from '../entity/Despesa';
import { Usuario } from '../entity/Usuario';

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
        const usuarioRepository = getRepository(Usuario);
    
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
}
