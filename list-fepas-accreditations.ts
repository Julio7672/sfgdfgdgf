import { FastifyReply, FastifyRequest } from 'fastify'
import { errorHttpStatus } from '@/core/errors/error-http-status'
import { makeListFepasAccreditationUseCase } from '../../application/factories/use-cases/list-fepas-accreditation'
import { listFepasAccreditationsQuerySchema } from './schema/accreditation-schema'

export class ListFepasAccreditationsController {
  handle = async (request: FastifyRequest, reply: FastifyReply) => {
    const query = listFepasAccreditationsQuerySchema.parse(request.query ?? {})

    const result = await makeListFepasAccreditationUseCase().execute(query)

    if (result.isLeft()) {
      return reply.status(errorHttpStatus(result.value)).send({
        message: result.value.message,
      })
    }

    return reply.status(200).send(result.value)
  }
}
