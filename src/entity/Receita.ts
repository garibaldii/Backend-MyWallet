import { Entity, Column, ManyToOne } from "typeorm";
import { UsuarioComum } from "./UsuarioComum";
import { Conta } from "./abstratas/Conta";

import { Status } from "../enums/Status";


export enum CategoriaReceita {
  SALARIO = "Salário",
  INVESTIMENTO = "Investimento",
  PRODUTOS_E_SERVICOS = "Produtos e Servicos Vendidos",
}
 


@Entity()
export class Receita extends Conta{


  operacao(receita: Receita, usuario: UsuarioComum): void {
    usuario.saldo = receita.valor + usuario.saldo
    receita.status = Status.FINALIZADO

  }
 

  @Column({
    type: "enum",
    enum: CategoriaReceita,
    nullable: false,
  })
  categoria!: CategoriaReceita;



  @ManyToOne(() => UsuarioComum, (usuario) => usuario.receitas)
  usuario!: UsuarioComum;


}
