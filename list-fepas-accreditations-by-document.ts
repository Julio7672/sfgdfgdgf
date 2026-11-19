import { FastifyReply, FastifyRequest } from 'fastify'
import { errorHttpStatus } from '@/core/errors/error-http-status'
import { makeListAccreditationByCNPJUseCase } from '../../application/factories/use-cases/list-accreditation-by-cnpj'
import { fepasDocumentQuerySchema } from './schema/accreditation-schema'

export class ListFepasAccreditationsByDocumentController {
  handle = async (request: FastifyRequest, reply: FastifyReply) => {
    const { cnpjCpf } = fepasDocumentQuerySchema.parse(request.query ?? {})

    const result = await makeListAccreditationByCNPJUseCase().execute({
      cnpjCpf,
    })

    if (result.isLeft()) {
      return reply.status(errorHttpStatus(result.value)).send({
        message: result.value.message,
      })
    }

    return reply.status(200).send(result.value)
  }
}
