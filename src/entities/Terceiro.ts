
import { Entity, Column, CreateDateColumn, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Cliente } from "./Cliente";

@Entity("terceiros")
export class Terceiro {
  @PrimaryColumn()
  id: string;

  @Column()
  email: string;

  @Column()
  nome: string;

  @Column()
  cpf: string;

  @Column()
  cliente_id: string;

  @ManyToOne(() => Cliente)
  @JoinColumn({ name: "cliente_id" })
  cliente: Cliente;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    // Preenche o id caso estiver criando um novo terceiro
    if (!this.id) {
      this.id = uuid();
    }
  }
}