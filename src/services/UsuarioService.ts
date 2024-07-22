import bcrypt from 'bcryptjs'; // Importa a biblioteca bcrypt para hash de senhas
import { getRepository, Repository } from 'typeorm';
import { Usuario } from '../entity/Usuario';

export class UsuarioService {
 

  private static instance: UsuarioService;
  private usuarioRepository: Repository<Usuario>;

  private constructor() {
    this.usuarioRepository = getRepository(Usuario);
  }

  public static async getInstance(): Promise<UsuarioService> {
    if (!UsuarioService.instance) {
      UsuarioService.instance = new UsuarioService();
    }
    return UsuarioService.instance;
  }

  public async criar(usuario: Usuario): Promise<Usuario> {
    const salt = bcrypt.genSaltSync(10)
    usuario.senha = bcrypt.hashSync(usuario.senha, salt)
    return await this.usuarioRepository.save(usuario);
  }

  public async deletar(id: number): Promise<void> {
    await this.usuarioRepository.delete(id);
  }

  public async listar(): Promise<Usuario[]> {
    return await this.usuarioRepository.find();
  }


  public async buscarPorId(id: number): Promise<Usuario | undefined> {
    return await this.usuarioRepository.findOne({
      where: { id: id },
    }) ?? undefined;
  }

}
