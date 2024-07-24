import { getRepository, Repository } from 'typeorm';
import { UsuarioComum } from '../entity/UsuarioComum';
import jwt from 'jsonwebtoken';

export class UsuarioComumService {
  private static instance: UsuarioComumService;
  private usuarioComumRepository: Repository<UsuarioComum>;

  private constructor() {
    this.usuarioComumRepository = getRepository(UsuarioComum);
  }

  public static async getInstance(): Promise<UsuarioComumService> {
    if (!UsuarioComumService.instance) {
      UsuarioComumService.instance = new UsuarioComumService();
    }
    return UsuarioComumService.instance;
  }

  public async criar(usuarioComum: UsuarioComum): Promise<UsuarioComum> {
    return await this.usuarioComumRepository.save(usuarioComum);
  }

  public async deletar(id: number): Promise<void> {
    await this.usuarioComumRepository.delete(id);
  }

  public async listar(): Promise<UsuarioComum[]> {
    return await this.usuarioComumRepository.find({
      relations: ['receitas', 'despesas']
    });
  }

  public async buscarPorId(id: number): Promise<UsuarioComum | null> {
    return await this.usuarioComumRepository.findOne({
      where: { id: id },
      relations: ['receitas', 'despesas']
    });
  }

  
}
