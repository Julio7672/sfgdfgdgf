import { FastifyReply, FastifyRequest } from 'fastify'
import { errorHttpStatus } from '@/core/errors/error-http-status'
import { makeGetFepasProductByIdUseCase } from '../../application/factories/use-cases/get-fepas-product-by-id'
import { fepasProductIdParamsSchema } from './schema/product-schema'

export class GetFepasProductByIdController {
  handle = async (request: FastifyRequest, reply: FastifyReply) => {
    const payload = fepasProductIdParamsSchema.parse(request.params)

    const result = await makeGetFepasProductByIdUseCase().execute(payload)

    if (result.isLeft()) {
      return reply.status(errorHttpStatus(result.value)).send({
        message: result.value.message,
      })
    }

    return reply.status(200).send(result.value)
  }
}
