interface Product {
  product_id: string
  product_name: string
}

interface Customer {
  full_name: string
  first_name: string
  email: string
  mobile: string
  CPF: string
  ip: string
}

interface Commissions {
  charge_amount: string
  product_base_price: string
  kiwify_fee: string
  commissioned_stores: unknown[]
  currency: string
  my_commission: string
  funds_status: string | null
  estimated_deposit_date: string | null
  deposit_date: string | null
}

interface TrackingParameters {
  src: string | null
  sck: string | null
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  utm_content: string | null
  utm_term: string | null
}

interface Plan {
  id: string
  name: string
  frequency: string
  qty_charges: number
}

interface Charges {
  completed: unknown[]
  future: unknown[]
}

interface Subscription {
  id: string
  start_date: string
  next_payment: string
  status: string
  plan: Plan
  charges: Charges
}

export interface WebhookEvent {
  order_id: string
  order_ref: string
  order_status: string
  product_type: string
  payment_method: string
  store_id: string
  payment_merchant_id: string
  installments: string | null
  card_type: string
  card_last4digits: string
  card_rejection_reason: string | null
  boleto_URL: string | null
  boleto_barcode: string | null
  boleto_expiry_date: string | null
  pix_code: string
  pix_expiration: string
  sale_type: string
  created_at: string
  updated_at: string
  approved_date: string | null
  refunded_at: string | null
  webhook_event_type: string
  Product: Product
  Customer: Customer
  Commissions: Commissions
  TrackingParameters: TrackingParameters
  Subscription: Subscription
  subscription_id: string
}
