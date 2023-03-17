
import { Entity, Column, CreateDateColumn, PrimaryColumn, ManyToOne, JoinColumn, ManyToMany } from "typeorm";
import { v4 as uuid } from "uuid";
import { Cliente } from "./Cliente";
import { Terceiro } from "./Terceiro";

@Entity("eventos")
export class Evento {
  @PrimaryColumn()
  id: string;

  @Column()
  cliente_id: string;

  // Dificuldade de implementar o array com TypeORM e PostgresSQL
  @Column("simple-array")
  terceiro_id: string[];

  @Column()
  veiculo: string;

  @ManyToOne(() => Cliente)
  @JoinColumn({ name: "cliente_id" })
  cliente: Cliente;

  //Dificuldade com a implementação do ManyToMany no GET
  // @ManyToMany(() => Terceiro)
  // @JoinTable()
  
  // So esta buscando se alterar para ManyToOne
  @ManyToMany(() => Terceiro)
  @JoinColumn({ name: "terceiro_id" })
  terceiro: Terceiro;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    // Preenche o id caso estiver criando um novo evento
    if (!this.id) {
      this.id = uuid();
    }
  }
}