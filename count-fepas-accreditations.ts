import { FastifyReply, FastifyRequest } from 'fastify'
import { errorHttpStatus } from '@/core/errors/error-http-status'
import { makeCountFepasAccreditationUseCase } from '../../application/factories/use-cases/count-fepas-accreditation'
import { countFepasAccreditationsQuerySchema } from './schema/accreditation-schema'

export class CountFepasAccreditationsController {
  handle = async (request: FastifyRequest, reply: FastifyReply) => {
    const query = countFepasAccreditationsQuerySchema.parse(request.query ?? {})

    // Ajustar os argumentos caso o Count UseCase tenha
    // uma assinatura diferente.
    const result = await makeCountFepasAccreditationUseCase().execute(query)

    if (result.isLeft()) {
      return reply.status(errorHttpStatus(result.value)).send({
        message: result.value.message,
      })
    }

    return reply.status(200).send(result.value)
  }
}
