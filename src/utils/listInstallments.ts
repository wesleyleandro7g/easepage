import EfiPay from 'payment-token-efi'

const payeeCode = process.env.NEXT_PUBLIC_EFI_PAYEE_CODE
const environment = process.env.NEXT_PUBLIC_EFI_ENVIRONMENT

interface listInstallmentsParams {
  total: number
  cardBrand: string
}

// Lista as parcelas disponíveis para um determinado valor
export async function listInstallments({
  cardBrand,
  total,
}: listInstallmentsParams) {
  try {
    const installments = await EfiPay.CreditCard.setAccount(payeeCode!)
      .setEnvironment(environment as 'production' | 'sandbox')
      .setBrand(cardBrand)
      .setTotal(total)
      .getInstallments()

    return installments
  } catch (error) {
    return error
  }
}
