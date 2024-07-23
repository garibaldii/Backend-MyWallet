import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { UsuarioComum } from "./UsuarioComum";
import { Conta } from "./abstratas/Conta";
import { Status } from "../enums/Status";


export enum CategoriaDespesa {
    ALIMENTACAO = "Alimentação",
    CARTAO_DE_CREDITO = "Cartão de Crédito",
    SEGURO_MEDICO = "Seguro Médico",
  }

@Entity()
export class Despesa extends Conta{

      operacao(conta: Conta, usuario: UsuarioComum): void {
        usuario.saldo = conta.valor - usuario.saldo
        conta.status = Status.FINALIZADO
      }
    
      @Column({
        type: "enum",
        enum: CategoriaDespesa,
        nullable: false,
      })
      categoria!: CategoriaDespesa;
      

      @ManyToOne(() => UsuarioComum, usuario => usuario.despesas)
      usuario!: UsuarioComum;

    
    }