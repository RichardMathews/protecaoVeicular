import { describe, expect, test } from '@jest/globals';
import { createConnections } from 'typeorm';
import { Cliente } from '../entities/Cliente';
import { ClienteLoginService } from '../services/Clientes/ClienteLoginService';
import { CreateClienteService } from '../services/Clientes/CreateClienteService';
import { DeleteClienteService } from '../services/Clientes/DeleteClienteService';
import { GetAllClientesService } from '../services/Clientes/GetAllClientesService';
import { UpdateClienteService } from '../services/Clientes/UpdateClienteService';

// Implementando alguns testes de exemplo.
// Terceiros e Eventos seguem a mesma lógica.

describe('Cliente Service', () => {
  beforeAll(async () => {
    await createConnections()
  })

  test('Login cliente', async () => {
    const service = new ClienteLoginService()
    const email = "Johndoe3@teste.com"
    const password = "123"
    const result = await service.execute({ email, password }) as Cliente

    expect(result).toHaveProperty("token")
  });

  test('Buscar cliente', async () => {
    const service = new GetAllClientesService()
    const result = await service.execute()

    expect(Array.isArray(result)).toBe(true)
  });

  test('Criar cliente', async () => {
    const service = new CreateClienteService()
    const email = "Johndoe3@teste.com"
    const nome = "Jonnh Doe"
    const cpf = "38825993082"
    const password = "123"
    const result = await service.execute({ email, nome, cpf, password }) as Cliente

    expect(result.email).toEqual(email)
    expect(result.nome).toEqual(nome)
  });

  test('Editar cliente', async () => {
    const service = new UpdateClienteService()
    const serviceGet = new GetAllClientesService()
    const cliente = await serviceGet.execute()
    const id = cliente[0].id
    const email = "JohndoeTeste@teste.com"
    const nome = null
    const cpf = null
    const password = null
    const result = await service.execute({ id, email, nome, cpf, password }) as Cliente

    expect(result.email).toEqual(email)
  });


  test('Deletar cliente', async () => {
    const serviceGet = new GetAllClientesService()
    let cliente = await serviceGet.execute()
    const service = new DeleteClienteService()
    const id = cliente[0].id

    await service.execute(id)

    cliente = await serviceGet.execute()

    expect(cliente[0].id).not.toEqual(id)
  });
});