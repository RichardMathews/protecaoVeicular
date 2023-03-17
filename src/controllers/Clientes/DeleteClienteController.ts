import { Request, ResponseObject } from "@hapi/hapi";
import { DeleteClienteService } from "../../services/Clientes/DeleteClienteService";

export class DeleteClienteController {
  async handle(req: Request, res: ResponseObject) {
    const { id } = req.params
    const service = new DeleteClienteService();
    const result = await service.execute(id)

    if (result instanceof Error) {
      return { statusmessage: result.message }
    }

    return {}
  }
}