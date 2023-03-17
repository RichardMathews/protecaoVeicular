import { getRepository } from "typeorm";
import { Cliente } from "../../entities/Cliente";
import { encrypt } from "../../utils/encrypt";

const jwt = require('jsonwebtoken');

require('dotenv').config();

interface ClienteRequestInterface {
  email: string;
  nome: string;
  cpf: string;
  password: string;
}

export class CreateClienteService {
  async execute({
    email,
    nome,
    cpf,
    password
  }: ClienteRequestInterface): Promise<Cliente | Error> {
    const repo = getRepository(Cliente)
    password = await encrypt(password)

    if (await repo.findOne({ cpf })) {
      return new Error("O cliente informado já está cadastrado!")
    }

    const cliente = repo.create({
      email,
      nome,
      cpf,
      password
    })

    cliente.token = jwt.sign({cliente_id: cliente.id}, process.env.API_SECRET, { expiresIn: '15m' })

    await repo.save(cliente)
    
    delete cliente.password

    return cliente
  }
}