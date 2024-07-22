
import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, OneToMany } from "typeorm";
import { Receita } from "./Receita";
import { Despesa } from "./Despesa";

@Entity()
export class Usuario {





  @PrimaryGeneratedColumn()
  @PrimaryColumn()
  id!: number;

  @Column({
    type: "varchar",
    length: 50,
    nullable: false,
  })
  nome!: String;

  @Column({
    type: "varchar",
    length: 100,
    nullable: false,
    unique: true,
  })
  email!: String;

  @Column({
    type: "varchar",
    length: 300,
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
  saldo!: Number;



  @OneToMany(() => Receita, receita => receita.usuario )
  receitas!: Receita[]

  @OneToMany(() => Despesa, despesa => despesa.usuario)
  despesas!: Despesa[]
}
