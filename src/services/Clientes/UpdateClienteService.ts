import { getRepository } from "typeorm"
import { Cliente } from "../../entities/Cliente"

interface CategoryUpdateRequest {
  id: string;
  email: string;
  nome: string;
  password: string;
  cpf: string;
}

export class UpdateClienteService {
  async execute({
    id,
    email,
    nome,
    password,
    cpf
  }: CategoryUpdateRequest) {
    const repo = getRepository(Cliente);

    if (cpf) {
      return new Error("O CPF não pode ser alterado!")
    }

    const cliente = await repo.findOne(id)

    if (!cliente) {
      return new Error("Cliente não existe!")
    }

    cliente.email = email ? email : cliente.email;
    cliente.nome = nome ? nome : cliente.nome;
    cliente.password = password ? password : cliente.password;

    repo.save(cliente)

    return cliente
  }
}