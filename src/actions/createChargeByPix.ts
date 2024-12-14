'use server'

import { efipay } from '@/pay/efi'

interface CreateChargeByPixParams {
  amount: string
}

export async function createChargeByPix({ amount }: CreateChargeByPixParams) {
  const result = await efipay.pixCreateImmediateCharge(
    {},
    {
      calendario: {
        expiracao: 3600,
      },
      valor: {
        original: amount,
      },
      chave: process.env.EFI_PIX_KEY!,
    }
  )

  console.log(result)

  return result
}
