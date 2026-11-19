import { FastifyReply, FastifyRequest } from 'fastify'
import { errorHttpStatus } from '@/core/errors/error-http-status'
import { makeAddFepasAccreditationUseCase } from '../../application/factories/use-cases/add-fepas-accreditation'
import { createFepasAccreditationBodySchema } from './schema/accreditation-schema'

export class CreateFepasAccreditationController {
  handle = async (request: FastifyRequest, reply: FastifyReply) => {
    // O schema definitivo deve seguir FepasAccreditationInput.
    const payload = createFepasAccreditationBodySchema.parse(request.body)

    const result = await makeAddFepasAccreditationUseCase().execute(
      payload as Parameters<
        ReturnType<typeof makeAddFepasAccreditationUseCase>['execute']
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
