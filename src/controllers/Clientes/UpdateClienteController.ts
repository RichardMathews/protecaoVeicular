import { Request, ResponseObject } from "@hapi/hapi";
import { Cliente } from "../../entities/Cliente";
import { UpdateClienteService } from "../../services/Clientes/UpdateClienteService";

export class UpdateClienteController {
  async handle(req: Request, res: ResponseObject) {
    const { id } = req.params
    const { email, nome, cpf, password } = req.payload as Cliente
    const service = new UpdateClienteService();

    const result = await service.execute({ id, email, nome, cpf, password })

    if (result instanceof Error) {
      return { stautsmessage: result.message }
    }

    return result
  }
}