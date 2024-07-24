import { Column, PrimaryGeneratedColumn } from "typeorm";



export abstract class Usuario{

  

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
  senha!: string

  
    @Column({
      type: "blob",
      nullable: true
    })
    foto!: Buffer;



    
}