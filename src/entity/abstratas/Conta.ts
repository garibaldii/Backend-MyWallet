import { Column, PrimaryGeneratedColumn } from "typeorm";
import { Transacao } from "../../interface/Transacao";
import { UsuarioComum } from "../UsuarioComum";
import { Status } from "../../enums/Status";


export abstract class Conta implements Transacao{

    @PrimaryGeneratedColumn()
      id!: number;
    
      @Column({ type: "varchar", length: 100, nullable: false })
      titulo!: String;
    
      @Column({ type: "varchar", length: 200, nullable: true })
      descricao!: String;
    
      @Column({
        type: Number,
      })
      valor!: number;

      @Column({
        type: "enum",
        enum: Status,
        nullable: false
      })
      status: Status = Status.ATIVO


    abstract operacao(conta: Conta, usuario: UsuarioComum): void 
    
}