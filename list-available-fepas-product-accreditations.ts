import { FastifyReply, FastifyRequest } from 'fastify'
import { errorHttpStatus } from '@/core/errors/error-http-status'
import { makeListFepasProductsAccreditationsToAssociationUseCase } from '../../application/factories/use-cases/list-fepas-products-accreditations-to-association'
import { fepasProductIdParamsSchema, availableProductAccreditationsQuerySchema } from './schema/product-schema'

export class ListAvailableFepasProductAccreditationsController {
  handle = async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = fepasProductIdParamsSchema.parse(request.params)

    const { cnpj } = availableProductAccreditationsQuerySchema.parse(request.query ?? {})

    const result =
      await makeListFepasProductsAccreditationsToAssociationUseCase().execute({
        id,
        cnpj,
      })

    if (result.isLeft()) {
      return reply.status(errorHttpStatus(result.value)).send({
        message: result.value.message,
      })
    }

    return reply.status(200).send(result.value)
  }
}
