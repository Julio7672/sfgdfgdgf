import { z } from 'zod'

export const fepasProductAssociationBodySchema = z.object({
  idAccreditation: z.string().min(1),
  idProduct: z.string().min(1),
})
export const fepasProductAssociationUpsertBodySchema = fepasProductAssociationBodySchema.extend({
  services: z.unknown().optional(),
  credit: z.object({
    minInstallmentsAdmin: z.number().optional(),
    maxInstallmentsAdmin: z.number().optional(),
    minInstallmentsStore: z.number().optional(),
    maxInstallmentsStore: z.number().optional(),
  }).nullable().optional(),
  debit: z.object({
    minInstallments: z.number().optional(),
    maxInstallments: z.number().optional(),
    qtdPreDatedDays: z.number().optional(),
    firstIntallmentInCash: z.string().optional(),
    closedMonth: z.string().optional(),
  }).nullable().optional(),
})
