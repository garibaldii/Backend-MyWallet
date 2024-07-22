import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Usuario } from "./Usuario";

export enum CategoriaReceita {
  SALARIO = "Salário",
  INVESTIMENTO = "Investimento",
  PRODUTOS_E_SERVICOS = "Produtos e Servicos Vendidos",
}

@Entity()
export class Receita {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "varchar",
    length: 100,
    nullable: false,
  })
  titulo!: string;

  @Column({ type: "varchar", length: 200, nullable: true })
  descricao!: string;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: true,
  })
  valor!: number;

  @Column({
    type: "enum",
    enum: CategoriaReceita,
    nullable: false,
  })
  categoria!: CategoriaReceita;

  @ManyToOne(() => Usuario, (usuario) => usuario.receitas)
  usuario!: Usuario;


}
