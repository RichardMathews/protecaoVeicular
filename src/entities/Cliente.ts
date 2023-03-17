import { Entity, Column, CreateDateColumn, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("clientes")
export class Cliente {
  @PrimaryColumn()
  id: string;

  @Column()
  email: string;

  @Column()
  nome: string;

  @Column()
  cpf: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  token: string;

  constructor() {
    // Preenche o id caso estiver criando um novo cliente
    if(!this.id) {
      this.id = uuid();
    }
  }
}