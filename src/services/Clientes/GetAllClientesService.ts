import { getRepository } from "typeorm";
import { Cliente } from "../../entities/Cliente";

export class GetAllClientesService {
  async execute() {
    const repo = getRepository(Cliente);
    const clientes = await repo.find();

    return clientes;
  }
}