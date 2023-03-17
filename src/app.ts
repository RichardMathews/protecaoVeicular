import "reflect-metadata"
import "./database";
import { Server } from "@hapi/hapi";
import { CreateClienteController } from "./controllers/Clientes/CreateClienteController";
import { LoginClienteController } from "./controllers/Clientes/LoginClienteController";
import { GetAllClientesController } from "./controllers/Clientes/GetAllClientesController";
import { DeleteClienteController } from "./controllers/Clientes/DeleteClienteController";
import { UpdateClienteController } from "./controllers/Clientes/UpdateClienteController";
import { CreateEventoController } from "./controllers/Eventos/CreateEventoController";
import { GetAllEventosController } from "./controllers/Eventos/GetAllEventoController";
import { validate } from "./utils/auth";

const JWTAuth = require('hapi-auth-jwt2');
require('dotenv').config();

export const init = async () => {
    const server: Server = new Server({
        port: 3000,
        host: 'localhost'
    });

    server.route({
        method: 'POST',
        path: '/clientes',
        handler: new CreateClienteController().handle,
        options: {
            auth: false
        }
    });

    server.route({
        method: 'POST',
        path: '/login',
        handler: new LoginClienteController().handle,
        options: {
            auth: false
        }
    });

    await server.register([
        { plugin: JWTAuth }
    ])

    server.auth.strategy('jwt', 'jwt', {
        key: process.env.API_SECRET,
        validate,
        verifyOptions: { algorithms: ['HS256'] },
        cookieKey: 'id_token'
    });

    server.auth.default('jwt');

    server.route({
        method: 'GET',
        path: '/clientes',
        handler: new GetAllClientesController().handle,
    });

    server.route({
        method: 'PUT',
        path: '/clientes/{id}',
        handler: new UpdateClienteController().handle,
    });

    server.route({
        method: 'DELETE',
        path: '/clientes/{id}',
        handler: new DeleteClienteController().handle,
    });

    server.route({
        method: 'POST',
        path: '/evento',
        handler: new CreateEventoController().handle,
    });

    server.route({
        method: 'GET',
        path: '/eventos',
        handler: new GetAllEventosController().handle,
    });

    await server.start();
    console.log('Server running on port 3000');
};
init()