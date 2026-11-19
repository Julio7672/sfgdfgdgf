import { FastifyReply, FastifyRequest } from 'fastify'
import { errorHttpStatus } from '@/core/errors/error-http-status'
import { makeToggleStatusAccreditationFepasUseCase } from '../../application/factories/use-cases/toggle-status-accreditation-fepas'
import { fepasAccreditationIdParamsSchema } from './schema/accreditation-schema'

export class ToggleFepasAccreditationStatusController {
  handle = async (request: FastifyRequest, reply: FastifyReply) => {
    const payload = fepasAccreditationIdParamsSchema.parse(request.params)

    const result = await makeToggleStatusAccreditationFepasUseCase().execute(
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
