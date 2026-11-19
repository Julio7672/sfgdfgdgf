import { FastifyReply, FastifyRequest } from 'fastify'
import { errorHttpStatus } from '@/core/errors/error-http-status'
import { makeAddFepasProductsUseCase } from '../../application/factories/use-cases/add-fepas-products'
import { fepasProductBodySchema } from './schema/product-schema'

export class CreateFepasProductController {
  handle = async (request: FastifyRequest, reply: FastifyReply) => {
    const payload = fepasProductBodySchema.parse(request.body)

    const result = await makeAddFepasProductsUseCase().execute(
      payload as Parameters<
        ReturnType<typeof makeAddFepasProductsUseCase>['execute']
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
