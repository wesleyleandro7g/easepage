'use server'

import { efipay } from '@/pay/efi'

export async function verifyChargeByPix({ txid }: { txid: string }) {
  const result = await efipay.pixDetailCharge({ txid })

  console.log(result)

  return result
}
