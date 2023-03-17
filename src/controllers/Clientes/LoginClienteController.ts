import { Request, ResponseObject } from "@hapi/hapi";
import { ClienteLoginService } from "../../services/Clientes/ClienteLoginService";
import { Cliente } from "../../entities/Cliente";

export class LoginClienteController {
  async handle(req: Request, res: ResponseObject) {
    const { email, password } = req.payload as Cliente
    const service = new ClienteLoginService()

    const result = await service.execute({ email, password })

    if (result instanceof Error) {
      return { statusmessage: result.message }
    }

    return result
  }
} 