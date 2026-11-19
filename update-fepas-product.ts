import { FastifyReply, FastifyRequest } from 'fastify'
import { errorHttpStatus } from '@/core/errors/error-http-status'
import { makeUpdateFepasProductUseCase } from '../../application/factories/use-cases/update-fepas-product'
import { fepasProductIdParamsSchema, fepasProductBodySchema } from './schema/product-schema'

export class UpdateFepasProductController {
  handle = async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = fepasProductIdParamsSchema.parse(request.params)
    const payload = fepasProductBodySchema.parse(request.body)

    const result = await makeUpdateFepasProductUseCase().execute({
      id,
      ...payload,
    })

    if (result.isLeft()) {
      return reply.status(errorHttpStatus(result.value)).send({
        message: result.value.message,
      })
    }

    return reply.status(200).send(result.value)
  }
}
