import EfiPay from 'payment-token-efi'

const payeeCode = process.env.NEXT_PUBLIC_EFI_PAYEE_CODE
const environment = process.env.NEXT_PUBLIC_EFI_ENVIRONMENT

interface generatePaymentTokenParams {
  brand: string
  number: string
  cvv: string
  expirationMonth: string
  expirationYear: string
  holderName: string
  holderDocument: string
  reuse: boolean
}

// Gera o token de pagamento
export async function generatePaymentToken(params: generatePaymentTokenParams) {
  try {
    const result = await EfiPay.CreditCard.setAccount(payeeCode!)
      .setEnvironment(environment as 'production' | 'sandbox')
      .setCreditCardData({
        brand: params.brand,
        number: params.number,
        cvv: params.cvv,
        expirationMonth: params.expirationMonth,
        expirationYear: params.expirationYear,
        holderName: params.holderName,
        holderDocument: params.holderDocument,
        reuse: params.reuse,
      })
      .getPaymentToken()

    if ('card_mask' in result) {
      return {
        card_mask: result.card_mask,
        payment_token: result.payment_token,
      }
    } else {
      throw new Error('Failed to generate payment token')
    }
  } catch (error) {
    return error
  }
}
