import { Conta } from "entity/abstratas/Conta";
import { UsuarioComum } from "entity/UsuarioComum";



export interface Transacao{
    
    operacao(conta: Conta, usuario: UsuarioComum):void

}