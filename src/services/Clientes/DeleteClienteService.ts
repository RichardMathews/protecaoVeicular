import { getRepository } from "typeorm";
import { Cliente } from "../../entities/Cliente";

export class DeleteClienteService {
  async execute(id: string) {
    const repo = getRepository(Cliente);

    if(!await repo.findOne(id)) {
      return new Error("Cliente não existe!");
    }

    await repo.delete(id);
  }
}