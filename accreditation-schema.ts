import { z } from 'zod'

export const listFepasAccreditationsQuerySchema = z.object({
  idCredenciamento: z.string().optional(),
  cnpjCpf: z.string().optional(),
  page: z.coerce.number().int().positive().default(1),
})

export const countFepasAccreditationsQuerySchema = listFepasAccreditationsQuerySchema.omit({ page: true })

export const fepasDocumentQuerySchema = z.object({ cnpjCpf: z.string().min(1) })

// Preserva o contrato flexível original até a definição de FepasAccreditationInput.
export const createFepasAccreditationBodySchema = z.record(z.string(), z.unknown())

export const fepasAccreditationIdParamsSchema = z.object({ idAccreditation: z.string().min(1) })
