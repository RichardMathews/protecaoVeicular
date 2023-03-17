import { Request, ResponseObject } from "@hapi/hapi";
import { GetAllEventosService } from "../../services/Eventos/GetAllEventosService";

export class GetAllEventosController {
  async handle(req: Request, res: ResponseObject) {
    const service = new GetAllEventosService();

    const eventoss = await service.execute()

    return eventoss
  }
}