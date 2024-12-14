'use server'

import { efipay } from '@/pay/efi'

export async function getPlans() {
  try {
    const plans = await efipay.listPlans({})
    return plans.data
  } catch (e) {
    console.error('Get Plans', e)
    throw e
  }
}
