import { z } from 'zod'

export const fepasProductIdParamsSchema = z.object({ id: z.string().min(1) })
export const listFepasProductsQuerySchema = z.object({
  type: z.union([
    z.coerce.number().pipe(z.union([z.literal(1), z.literal(2)])),
    z.literal(''),
  ]).optional(),
  page: z.coerce.number().int().positive().default(1),
})
export const fepasProductBodySchema = z.object({
  code: z.string().min(1),
  type: z.union([z.literal(1), z.literal(2)]),
  characteristics: z.record(z.string(), z.unknown()),
  idDestinationNetwork: z.string().min(1),
})
export const availableProductAccreditationsQuerySchema = z.object({ cnpj: z.string().min(1) })
