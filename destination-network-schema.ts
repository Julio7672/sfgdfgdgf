import { z } from 'zod'

export const fepasDestinationNetworkParamsSchema = z.object({ idDestinationNetwork: z.string().min(1) })
export const availableDestinationAccreditationsQuerySchema = z.object({ cnpjCpf: z.string().min(1) })
export const destinationAssociationBodySchema = z.object({
  idCredenciamento: z.string().min(1),
  idDestinationNetwork: z.string().min(1),
})
