import { Request, ResponseObject } from "@hapi/hapi";
import { Terceiro } from "../../entities/Terceiro";
import { CreateEventoService } from "../../services/Eventos/CreateEventoService";

interface EventoRequestInterface {
  veiculo: string;
  terceiros: Array<Terceiro>;
}

export class CreateEventoController {
  async handle(req: Request, res: ResponseObject) {
    const { terceiros, veiculo } = req.payload as EventoRequestInterface
    const service = new CreateEventoService()
    const auth = req.auth as any

    const result = await service.execute({ terceiros, veiculo, token: auth.token })

    if (result instanceof Error) {
      return { stautsmessage: result.message }
    }

    return result
  }
}  