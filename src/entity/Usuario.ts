import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Receita } from "./Receita";
import { Despesa } from "./Despesa";

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "varchar",
    length: 50,
    nullable: false,
  })
  nome!: string;

  @Column({
    type: "varchar",
    length: 100,
    nullable: false,
    unique: true,
  })
  email!: string;

  @Column({
    type: "varchar",
    length: 200,
    nullable: false,
  })
  senha!: string;

  @Column({
    type: "blob",
    nullable: true
  })
  foto!: Blob;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
  })
  saldo!: number;

 
  @OneToMany(() => Receita, (receita) => receita.usuario)
  receitas!: Receita[];


  
  @OneToMany(() => Despesa, (despesa) => despesa.usuario)
  despesas!: Despesa[];


}
