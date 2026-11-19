import { FastifyReply, FastifyRequest } from 'fastify'
import { errorHttpStatus } from '@/core/errors/error-http-status'
import { makeGetFepasProductsUseCase } from '../../application/factories/use-cases/get-fepas-products'
import { listFepasProductsQuerySchema } from './schema/product-schema'

export class ListFepasProductsController {
  handle = async (request: FastifyRequest, reply: FastifyReply) => {
    const query = listFepasProductsQuerySchema.parse(request.query ?? {})

    const result = await makeGetFepasProductsUseCase().execute(query)

    if (result.isLeft()) {
      return reply.status(errorHttpStatus(result.value)).send({
        message: result.value.message,
      })
    }

    return reply.status(200).send(result.value)
  }
}
