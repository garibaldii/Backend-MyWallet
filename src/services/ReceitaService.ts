import { getRepository, Repository } from 'typeorm';
import { Receita } from '../entity/Receita';
import { Usuario } from '../entity/Usuario';

export class ReceitaService {
    private static instance: ReceitaService;
    private receitaRepository: Repository<Receita>;

    private constructor() {
        this.receitaRepository = getRepository(Receita);
    }

    public static async getInstance(): Promise<ReceitaService> {
        if (!ReceitaService.instance) {
            ReceitaService.instance = new ReceitaService();
        }
        return ReceitaService.instance;
    }

    public async criar(dados: Receita, idUsuario: number): Promise<Receita> {
        const usuarioRepository = getRepository(Usuario);
    
        const usuario = await usuarioRepository.findOne({
            where: { id: idUsuario },
            relations: ['receitas'] 
        });
    
        if (!usuario) {
            throw new Error("Usuário não existente");
        }
    
        // Garantir que receitas seja um array
        usuario.receitas = usuario.receitas || [];
    
        const receita = this.receitaRepository.create(dados);
        receita.usuario = usuario;
    
        const receitaCriada = await this.receitaRepository.save(receita);
    
        // Adiciona a receita criada à lista de receitas do usuário
        usuario.receitas.push(receitaCriada);
        await usuarioRepository.save(usuario);
    
        // Retorna a receita criada, incluindo o usuário
        const receitaComUsuario = await this.receitaRepository.findOne({
            where: { id: receitaCriada.id },
            relations: ['usuario'] 
        });
    
        if (!receitaComUsuario) {
            throw new Error("Erro ao buscar receita criada");
        }
    
        return receitaComUsuario;
    }


    public async listar():Promise<Receita[]>{
        return await this.receitaRepository.find()
    }


    public async buscarPorId(id: number): Promise<Receita | undefined> {
        return await this.receitaRepository.findOne({
            where: {id: id}
        }) ?? undefined
    }


    public async deletarTodos(){
        return this.receitaRepository.clear()
    }


    public async deletar(id: number): Promise<void>{
        await this.receitaRepository.delete(id)
    }


    public async atualizar(dados: Receita, id: number): Promise<Receita> {
        const receita = await this.receitaRepository.findOne({
            where: { id: id }
        });

        if (!receita) throw new Error("Receita não encontrada");

        
        receita.titulo = dados.titulo;
        receita.descricao = dados.descricao;
        receita.valor = dados.valor;
        receita.categoria = dados.categoria;

        await this.receitaRepository.save(receita); 

        return receita;
    }


}
