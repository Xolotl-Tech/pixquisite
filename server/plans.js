// Pricing catalog — keep in sync with frontend i18n.js plans.
// transaction_amount is in MXN as a decimal number.
// frequency / frequency_type define the billing cycle.

export const PLANS = {
  free: {
    id: "free",
    title: "Gratis",
    description: "5 GB · para probar la nube",
    transaction_amount: 0,
    currency_id: "MXN",
    frequency: 0,
    frequency_type: "months",
  },
  pro: {
    id: "pro",
    title: "Pro",
    description: "500 GB · dispositivos ilimitados · soporte prioritario",
    transaction_amount: 89,
    currency_id: "MXN",
    frequency: 1,
    frequency_type: "months",
  },
  familia: {
    id: "familia",
    title: "Familia",
    description: "2 TB compartidos · 6 cuentas · control parental",
    transaction_amount: 179,
    currency_id: "MXN",
    frequency: 1,
    frequency_type: "months",
  },
};
