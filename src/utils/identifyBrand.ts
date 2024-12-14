import EfiPay from 'payment-token-efi'

// Identifica a bandeira do cartão de crédito
export async function identifyBrand(cardNumber: string) {
  try {
    return await EfiPay.CreditCard.setCardNumber(cardNumber).verifyCardBrand()
  } catch (error) {
    return error
  }
}
