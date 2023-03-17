import { getRepository } from "typeorm";
import { Cliente } from "../../entities/Cliente";

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

export class ClienteLoginService {
  async execute({
    email,
    password
  }) {
    const repo = getRepository(Cliente);
    const cliente = await repo.findOne({ email });

    if (!cliente) {
      return new Error("Cliente não encontrado!")
    }

    if (await bcrypt.compare(password, cliente.password)) {
      cliente.token = jwt.sign({ cliente_id: cliente.id }, process.env.API_SECRET, { expiresIn: '15m' })
      delete cliente.password

      return cliente
    }

    return new Error("Verifique sua senha!");
  }
}