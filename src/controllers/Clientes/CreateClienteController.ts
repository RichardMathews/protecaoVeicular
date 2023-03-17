import { Request, ResponseObject } from "@hapi/hapi";
import { CreateClienteService } from "../../services/Clientes/CreateClienteService";
import { Cliente } from "../../entities/Cliente";

export class CreateClienteController {
  async handle(req: Request, res: ResponseObject) {
    const { email, nome, cpf, password } = req.payload as Cliente
    const service = new CreateClienteService()

    const result = await service.execute({ email, nome, cpf, password })

    if (result instanceof Error) {
      return { stautsmessage: result.message }
    }

    return result
  }
} 