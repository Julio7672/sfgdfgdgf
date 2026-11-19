import { FastifyReply, FastifyRequest } from 'fastify'
import { errorHttpStatus } from '@/core/errors/error-http-status'
import { makeListAccreditationByDestinationNetworkUseCase } from '../../application/factories/use-cases/list-accreditation-by-destination-network'
import { fepasDestinationNetworkParamsSchema } from './schema/destination-network-schema'

export class ListFepasDestinationNetworkAccreditationsController {
  handle = async (request: FastifyRequest, reply: FastifyReply) => {
    const payload = fepasDestinationNetworkParamsSchema.parse(request.params)

    const result =
      await makeListAccreditationByDestinationNetworkUseCase().execute(payload)

    if (result.isLeft()) {
      return reply.status(errorHttpStatus(result.value)).send({
        message: result.value.message,
      })
    }

    return reply.status(200).send(result.value)
  }
}
