import { FastifyReply, FastifyRequest } from 'fastify'
import { errorHttpStatus } from '@/core/errors/error-http-status'
import { makeToggleFepasPixAssociationUseCase } from '../../application/factories/use-cases/toggle-fepas-pix-association'
import { fepasAccreditationIdParamsSchema } from './schema/accreditation-schema'

export class ToggleFepasPixAssociationController {
  handle = async (request: FastifyRequest, reply: FastifyReply) => {
    const payload = fepasAccreditationIdParamsSchema.parse(request.params)

    const result = await makeToggleFepasPixAssociationUseCase().execute(
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
