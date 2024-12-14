/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { efipay } from '@/pay/efi'

interface CreateSubscriptionParams {
  customer: {
    name: string
    cpf: string
    phone_number: string
    email: string
    birth: string
  }
  item: {
    name: string
    amount: number
    value: number
  }
  payment_token?: string
  billing_address: {
    street: string
    number: string
    neighborhood: string
    zipcode: string
    city: string
    state: string
  }
  planId: number
}

export async function createSubscription({
  planId,
  customer,
  item,
  payment_token,
  billing_address,
}: CreateSubscriptionParams) {
  const items = [
    {
      name: item.name,
      amount: item.amount,
      value: item.value,
    },
  ]

  const body_signature = {
    items: items,
  }

  const params_signature = { id: planId }

  async function associarAssinaturaAPlano(
    params_signature: any,
    body_signature: any
  ) {
    try {
      const subscription = await efipay.createSubscription(
        params_signature,
        body_signature
      )
      return subscription.data
    } catch (e) {
      console.error('Associar Assinatura', e)
      throw e
    }
  }

  const novaAssinatura = await associarAssinaturaAPlano(
    params_signature,
    body_signature
  )

  const params_subscription = { id: novaAssinatura.subscription_id }

  if (payment_token) {
    try {
      const charge = await efipay.defineSubscriptionPayMethod(
        params_subscription,
        {
          payment: {
            credit_card: {
              billing_address: billing_address,
              payment_token: payment_token,
              customer: {
                name: customer.name,
                cpf: customer.cpf,
                phone_number: customer.phone_number,
                email: customer.email,
                birth: customer.birth,
                address: {
                  city: billing_address.city,
                  state: billing_address.state,
                  neighborhood: billing_address.neighborhood,
                  number: billing_address.number,
                  street: billing_address.street,
                  zipcode: billing_address.zipcode,
                  complement: '',
                },
              },
            },
          },
        }
      )
      return charge
    } catch (e) {
      console.error('Pagamento com Cartão', e)
      throw e
    }
  }
}
