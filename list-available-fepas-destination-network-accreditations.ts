import { FastifyReply, FastifyRequest } from 'fastify'
import { errorHttpStatus } from '@/core/errors/error-http-status'
import { makeListAccreditationsToAssociationUseCase } from '../../application/factories/use-cases/list-accreditations-to-association'
import { fepasDestinationNetworkParamsSchema, availableDestinationAccreditationsQuerySchema } from './schema/destination-network-schema'

export class ListAvailableFepasDestinationNetworkAccreditationsController {
  handle = async (request: FastifyRequest, reply: FastifyReply) => {
    const { idDestinationNetwork } = fepasDestinationNetworkParamsSchema.parse(request.params)

    const { cnpjCpf } = availableDestinationAccreditationsQuerySchema.parse(request.query ?? {})

    const result =
      await makeListAccreditationsToAssociationUseCase().execute({
        idDestinationNetwork,
        cnpjCpf,
      })

    if (result.isLeft()) {
      return reply.status(errorHttpStatus(result.value)).send({
        message: result.value.message,
      })
    }

    return reply.status(200).send(result.value)
  }
}
