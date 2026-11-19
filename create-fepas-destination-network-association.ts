import { FastifyReply, FastifyRequest } from 'fastify'
import { errorHttpStatus } from '@/core/errors/error-http-status'
import { makeCreateFepasAccreditationDestinationNetworkUseCase } from '../../application/factories/use-cases/create-fepas-accreditation-destination-network'
import { destinationAssociationBodySchema } from './schema/destination-network-schema'

export class CreateFepasDestinationNetworkAssociationController {
  handle = async (request: FastifyRequest, reply: FastifyReply) => {
    const payload = destinationAssociationBodySchema.parse(request.body)

    const result =
      await makeCreateFepasAccreditationDestinationNetworkUseCase().execute(
        payload,
      )

    if (result.isLeft()) {
      return reply.status(errorHttpStatus(result.value)).send({
        message: result.value.message,
      })
    }

    return reply.status(200).send(result.value)
  }
}
