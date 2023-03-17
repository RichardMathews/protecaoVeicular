import { Request, ResponseObject } from "@hapi/hapi";
import { GetAllClientesService } from "../../services/Clientes/GetAllClientesService";

export class GetAllClientesController {
  async handle(req: Request, res: ResponseObject) {
    const service = new GetAllClientesService();

    const clientes = await service.execute()

    return clientes
  }
}