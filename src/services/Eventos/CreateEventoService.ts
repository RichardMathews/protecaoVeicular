import { getRepository } from "typeorm";
import { Evento } from "../../entities/Evento";
import { Terceiro } from "../../entities/Terceiro";
import { decoded } from "../../utils/decode";
import { CreateTerceiroService } from "../Terceiros/CreateTerceiroService";

require('dotenv').config();

interface EventoRequestInterface {
  veiculo: string;
  terceiros: Array<Terceiro>;
  token: string;
}

export class CreateEventoService {
  async execute({
    veiculo,
    terceiros,
    token
  }: EventoRequestInterface): Promise<Evento | Error> {
    const repo = getRepository(Evento)
    const service = new CreateTerceiroService()
    const tokenDecoded = await decoded(token)
    const arrTerceiros = await service.execute({ terceiros, token: tokenDecoded }) as Array<string>

    const evento = repo.create({
      cliente_id: tokenDecoded.cliente_id,
      terceiro_id: arrTerceiros,
      veiculo
    })

    await repo.save(evento)

    return evento
  }
}