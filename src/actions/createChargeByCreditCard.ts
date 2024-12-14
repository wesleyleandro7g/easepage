'use server'

import { efipay } from '@/pay/efi'

interface createChargeByCreditCardParams {
  descricao: string
  quantidade: number
  valor: number
  nome_cliente: string
  cpf: string
  telefone: string
  email: string
  nascimento: string // YYYY-MM-DD
  payment_token: string
  rua: string
  numero: string
  bairro: string
  cep: string
  cidade: string
  estado: string
  installments: number
}

export async function createChargeByCreditCard({
  descricao,
  quantidade,
  valor,
  nome_cliente,
  cpf,
  telefone,
  email,
  nascimento,
  payment_token,
  rua,
  numero,
  bairro,
  cep,
  cidade,
  estado,
  installments,
}: createChargeByCreditCardParams) {
  try {
    const result = await efipay.createOneStepCharge(
      {},
      {
        items: [
          {
            name: descricao,
            amount: quantidade,
            value: valor,
          },
        ],
        payment: {
          credit_card: {
            installments: installments,
            billing_address: {
              street: rua,
              number: numero,
              neighborhood: bairro,
              zipcode: cep,
              city: cidade,
              state: estado,
            },
            payment_token: payment_token,
            customer: {
              name: nome_cliente,
              cpf: cpf,
              phone_number: telefone,
              email: email,
              birth: nascimento,
              address: {
                city: cidade,
                state: estado,
                neighborhood: bairro,
                number: numero,
                street: rua,
                zipcode: cep,
              },
            },
          },
        },
      }
    )
    console.log(result)
    return result
  } catch (error) {
    console.error(error)
    return error
  }
}
