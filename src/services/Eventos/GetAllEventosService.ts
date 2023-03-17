import { getRepository } from "typeorm";
import { Evento } from "../../entities/Evento";

export class GetAllEventosService {
  async execute() {
    const repo = getRepository(Evento);
    const eventos = await repo.find({
      relations: ["cliente", "terceiro"]
    });

    return eventos;
  }
}