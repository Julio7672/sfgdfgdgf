import { FastifyReply, FastifyRequest } from 'fastify'
import { errorHttpStatus } from '@/core/errors/error-http-status'
import { makeCreateFepasProductAssociationUseCase } from '../../application/factories/use-cases/create-fepas-product-association'
import { fepasProductAssociationUpsertBodySchema } from './schema/product-association-schema'

export class CreateFepasProductAssociationController {
  handle = async (request: FastifyRequest, reply: FastifyReply) => {
    const payload = fepasProductAssociationUpsertBodySchema.parse(request.body)

    const result =
      await makeCreateFepasProductAssociationUseCase().execute(payload)

    if (result.isLeft()) {
      return reply.status(errorHttpStatus(result.value)).send({
        message: result.value.message,
      })
    }

    return reply.status(200).send(result.value)
  }
}
