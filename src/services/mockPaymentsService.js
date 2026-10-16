import { mockOrders, mockBatches, mockBatchTransactions, mockPaymentDetailData } from "../paymentsMockData";

const SIMULATED_DELAY_MS = 1500;

const withinDateRange = (isoDate, dateRange) => {
  if (!dateRange || dateRange.length !== 2) return true;
  const [start, end] = dateRange;
  const d = new Date(isoDate);
  return d >= start.startOf("day").toDate() && d <= end.endOf("day").toDate();
};

// Simula la búsqueda de Orders. Devuelve [] cuando no hay coincidencias
// para disparar el estado de error (ver errorfilterorder.png).
export function fetchMockOrders({ status, accountId, paymentId, dateRange }) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let rows = mockOrders.slice();
      if (status && status !== "All") rows = rows.filter((r) => r.status === status);
      if (paymentId) rows = rows.filter((r) => r.paymentId.toLowerCase().includes(paymentId.toLowerCase()));
      if (accountId) rows = rows.filter((r) => r.sub.replace(/\D/g, "").includes(accountId.replace(/\D/g, "")));
      rows = rows.filter((r) => withinDateRange(r.date, dateRange));
      resolve(rows);
    }, SIMULATED_DELAY_MS);
  });
}

// Simula la búsqueda de Batches. Devuelve [] cuando no hay coincidencias
// para disparar el estado de error (ver errorfilterbatches.png).
export function fetchMockBatches({ status, searchByValue, batchId, dateRange }) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let rows = mockBatches.slice();
      if (status && status !== "All") rows = rows.filter((r) => r.status === status);
      if (batchId) rows = rows.filter((r) => r.batchId.toLowerCase().includes(batchId.toLowerCase()));
      if (searchByValue) rows = rows.filter((r) => r.originBank.toLowerCase().includes(searchByValue.toLowerCase()));
      rows = rows.filter((r) => withinDateRange(r.date, dateRange));
      resolve(rows);
    }, SIMULATED_DELAY_MS);
  });
}

// Simula la obtención de las transacciones de un batch (pantalladetailbatches.png)
export function fetchMockBatchTransactions(batch) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ batch, transactions: mockBatchTransactions.slice() });
    }, SIMULATED_DELAY_MS);
  });
}

// Simula la obtención del detalle de un pago para el drawer
// (detailorder.png, detailorder2.png, detailorder3.png)
export function fetchMockPaymentDetail(record) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ...mockPaymentDetailData,
        transactionId: record?.paymentId || mockPaymentDetailData.transactionId,
        accountId: record?.billerAccount || mockPaymentDetailData.accountId,
        accountNumber: record?.sub || mockPaymentDetailData.accountNumber,
        currentStatus: record?.status || mockPaymentDetailData.currentStatus,
      });
    }, 400);
  });
}
