'use server'

import { efipay } from '@/pay/efi'

interface CreateChargeRequest {
  amount: string
}

export async function createChargeByPix({ amount }: CreateChargeRequest) {
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

export async function verifyChargeByPix({ txid }: { txid: string }) {
  const result = await efipay.pixDetailCharge({ txid })

  console.log(result)

  return result
}
