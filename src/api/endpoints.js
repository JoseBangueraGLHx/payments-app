export const API_BASE_URL = "https://api.example.com";

export const ENDPOINTS = {
  //Agent accounts
  getAccountByCuit: (cuit) => `/v1/bo/billers/${cuit}/agent`,
  getAccountByWorkStation: (workStationId) => `/v1/bo/billers/${workStationId}/agent`,

  // Transaccions
  getTransactions: "/v1/trx/transactions",
  getTransactionByPaymentItemId: (paymentItemId) => `/v1/trx/transactions/${paymentItemId}`,
};
