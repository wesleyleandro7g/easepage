import efi from 'sdk-node-apis-efi'

export const efipay = new efi({
  client_id: process.env.EFI_CLIENT_ID!,
  client_secret: process.env.EFI_CLIENT_SECRET!,
  cert_base64: true,
  certificate: process.env.EFI_CERTIFICATE_CONTENT!,
  pemKey: process.env.EFI_CERTIFICATE_CONTENT!,
  sandbox: false,
})
