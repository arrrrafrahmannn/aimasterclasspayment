export const WHATSAPP_RECIPIENT = '8801893291245';
export function paymentWhatsAppUrl({name,whatsapp,transactionId,reference}) {
  const message = [
    'EKTU AI — AI MASTERCLASS PAYMENT',
    '',
    `Client name: ${name}`,
    `WhatsApp number: ${whatsapp}`,
    'Amount: ৳299',
    'Payment method: bKash Send Money',
    `Transaction ID: ${transactionId}`,
    `Reference: ${reference}`,
    '',
    'Please verify my payment.'
  ].join('\n');
  return `https://wa.me/${WHATSAPP_RECIPIENT}?text=${encodeURIComponent(message)}`;
}
