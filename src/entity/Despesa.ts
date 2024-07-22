import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Usuario } from "./Usuario";


export enum CategoriaDespesa {
    ALIMENTACAO = "Alimentação",
    CARTAO_DE_CREDITO = "Cartão de Crédito",
    SEGURO_MEDICO = "Seguro Médico",
  }

@Entity()
export class Despesa{

    @PrimaryGeneratedColumn()
      id!: Number;
    
      @Column({ type: "varchar", length: 100, nullable: false })
      titulo!: String;
    
      @Column({ type: "varchar", length: 200, nullable: true })
      descricao!: String;
    
      @Column({
        type: "decimal",
        precision: 10,
        scale: 2,
        nullable: true,
      })
      valor!: Number;
    
    
      @Column({
        type: "enum",
        enum: CategoriaDespesa,
        nullable: false,
      })
      categoria!: String;
      

      @ManyToOne(() => Usuario, usuario => usuario.despesas)
      usuario!: Usuario;

    
    }