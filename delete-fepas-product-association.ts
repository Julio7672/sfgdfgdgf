import { FastifyReply, FastifyRequest } from 'fastify'
import { errorHttpStatus } from '@/core/errors/error-http-status'
import { makeDeleteFepasProductAssociationUseCase } from '../../application/factories/use-cases/delete-fepas-product-association'
import { fepasProductAssociationBodySchema } from './schema/product-association-schema'

export class DeleteFepasProductAssociationController {
  handle = async (request: FastifyRequest, reply: FastifyReply) => {
    const payload = fepasProductAssociationBodySchema.parse(request.body)

    const result =
      await makeDeleteFepasProductAssociationUseCase().execute(payload)

    if (result.isLeft()) {
      return reply.status(errorHttpStatus(result.value)).send({
        message: result.value.message,
      })
    }

    return reply.status(200).send(result.value)
  }
}
