import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Receita } from "./Receita";
import { Despesa } from "./Despesa";
import { Usuario } from "./abstratas/Usuario";

@Entity()
export class UsuarioComum extends Usuario{
  

  @Column({
    type: Number,
    nullable: false
  })
  saldo!: number;

 
  @OneToMany(() => Receita, (receita) => receita.usuario)
  receitas!: Receita[];


  
  @OneToMany(() => Despesa, (despesa) => despesa.usuario)
  despesas!: Despesa[];




  
}
