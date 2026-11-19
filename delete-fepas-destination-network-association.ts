import { FastifyReply, FastifyRequest } from 'fastify'
import { errorHttpStatus } from '@/core/errors/error-http-status'
import { makeDeleteFepasAccreditationDestinationNetworkUseCase } from '../../application/factories/use-cases/delete-fepas-accreditation-destination-network'
import { destinationAssociationBodySchema } from './schema/destination-network-schema'

export class DeleteFepasDestinationNetworkAssociationController {
  handle = async (request: FastifyRequest, reply: FastifyReply) => {
    const payload = destinationAssociationBodySchema.parse(request.body)

    const result =
      await makeDeleteFepasAccreditationDestinationNetworkUseCase().execute(
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
