import { FastifyReply, FastifyRequest } from 'fastify'
import { errorHttpStatus } from '@/core/errors/error-http-status'
import { makeListDestinationNetworkUseCase } from '../../application/factories/use-cases/list-destination-network'

export class ListFepasDestinationNetworksController {
  handle = async (_request: FastifyRequest, reply: FastifyReply) => {
    const result = await makeListDestinationNetworkUseCase().execute()

    if (result.isLeft()) {
      return reply.status(errorHttpStatus(result.value)).send({
        message: result.value.message,
      })
    }

    return reply.status(200).send(result.value)
  }
}
