import { getRepository } from "typeorm";
import { Terceiro } from "../../entities/Terceiro";
import { decoded } from "../../utils/decode";

require('dotenv').config();

interface TerceiroRequestInterface {
  terceiros: Array<Terceiro>
  token: {
    cliente_id: string;
  }
}

export class CreateTerceiroService {
  async execute({
    terceiros,
    token
  }: TerceiroRequestInterface): Promise<Array<string> | Error> {
    const repo = getRepository(Terceiro)
    let arrIdTerceiros = []

    for await (let terceiro of terceiros) {
      const findTerceiro = await repo.findOne({ cpf: terceiro.cpf })

      if (findTerceiro) {
        arrIdTerceiros.push(findTerceiro.id)

      } else {
        terceiro = repo.create({
          email: terceiro.email,
          nome: terceiro.nome,
          cpf: terceiro.cpf,
          cliente_id: token.cliente_id
        })
  
        terceiro = await repo.save(terceiro)
        arrIdTerceiros.push(terceiro.id)
      }
    }

    return arrIdTerceiros
  }
}