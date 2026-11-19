import { FastifyReply, FastifyRequest } from 'fastify'
import { errorHttpStatus } from '@/core/errors/error-http-status'
import { makeUpdateFepasProductAssociationUseCase } from '../../application/factories/use-cases/update-fepas-product-association'
import { fepasProductAssociationUpsertBodySchema } from './schema/product-association-schema'

export class UpdateFepasProductAssociationController {
  handle = async (request: FastifyRequest, reply: FastifyReply) => {
    const payload = fepasProductAssociationUpsertBodySchema.parse(request.body)

    const result =
      await makeUpdateFepasProductAssociationUseCase().execute(
        payload as Parameters<
          ReturnType<typeof makeUpdateFepasProductAssociationUseCase>['execute']
        >[0],
      )

    if (result.isLeft()) {
      return reply.status(errorHttpStatus(result.value)).send({
        message: result.value.message,
      })
    }

    return reply.status(200).send(result.value)
  }
}
