// Mock data for the Orders table, matching diseñoPayments/tableorders.png
export const mockOrders = [
  { paymentId: "TXN005", billerAccount: "Acme Corporation", sub: "CUIT - 20123456789", date: "2025-08-11T04:30:00Z", amount: 210000, currency: "ARS", status: "Processing" },
  { paymentId: "TXN004", billerAccount: "Acme Corporation", sub: "CUIT - 20123456789", date: "2025-08-11T04:30:00Z", amount: 210000, currency: "ARS", status: "Completed" },
  { paymentId: "TXN003", billerAccount: "Acme Corporation", sub: "CUIT - 20123456789", date: "2025-08-11T04:30:00Z", amount: 210000, currency: "ARS", status: "Pending" },
  { paymentId: "TXN002", billerAccount: "Acme Corporation", sub: "CUIT - 20123456789", date: "2025-08-11T04:30:00Z", amount: 210000, currency: "ARS", status: "Failed" },
  { paymentId: "TXN010", billerAccount: "Acme Corporation", sub: "CUIT - 20123456789", date: "2025-08-11T04:30:00Z", amount: 210000, currency: "ARS", status: "Replaced" },
  { paymentId: "TXN011", billerAccount: "Acme Corporation", sub: "CUIT - 20123456789", date: "2025-08-11T04:30:00Z", amount: 210000, currency: "ARS", status: "Paid" },
  { paymentId: "TXN012", billerAccount: "Acme Corporation", sub: "CUIT - 20123456789", date: "2025-08-11T04:30:00Z", amount: 210000, currency: "ARS", status: "Completed" },
  { paymentId: "TXN013", billerAccount: "Acme Corporation", sub: "CUIT - 20123456789", date: "2025-08-11T04:30:00Z", amount: 210000, currency: "ARS", status: "Completed" },
];

// Mock data for the Batches table, matching diseñoPayments/tablebatches.png
export const mockBatches = [
  { batchId: "BID-005", originBank: "Edge City Bank", sub: "CBU - 0010101010101010", date: "2025-08-11T04:30:00Z", debitAmount: -210000, creditAmount: 210000, currency: "ARS", status: "Completed", volume: 24 },
  { batchId: "BID-005", originBank: "Edge City Bank", sub: "CBU - 0010101010101010", date: "2025-08-11T04:30:00Z", debitAmount: -210000, creditAmount: 210000, currency: "ARS", status: "Completed", volume: 12 },
  { batchId: "BID-005", originBank: "Edge City Bank", sub: "CBU - 0010101010101010", date: "2025-08-11T04:30:00Z", debitAmount: -210000, creditAmount: 210000, currency: "ARS", status: "Pending", volume: 60 },
  { batchId: "BID-005", originBank: "Edge City Bank", sub: "CBU - 0010101010101010", date: "2025-08-11T04:30:00Z", debitAmount: -210000, creditAmount: 210000, currency: "ARS", status: "Processing", volume: 12 },
  { batchId: "BID-005", originBank: "Edge City Bank", sub: "CBU - 0010101010101010", date: "2025-08-11T04:30:00Z", debitAmount: -210000, creditAmount: 210000, currency: "ARS", status: "Processing", volume: 12 },
  { batchId: "BID-005", originBank: "Edge City Bank", sub: "CBU - 0010101010101010", date: "2025-08-11T04:30:00Z", debitAmount: -210000, creditAmount: 210000, currency: "ARS", status: "Paid", volume: 10 },
  { batchId: "BID-005", originBank: "Edge City Bank", sub: "CBU - 0010101010101010", date: "2025-08-11T04:30:00Z", debitAmount: -210000, creditAmount: 210000, currency: "ARS", status: "Paid", volume: 33 },
  { batchId: "BID-005", originBank: "Edge City Bank", sub: "CBU - 0010101010101010", date: "2025-08-11T04:30:00Z", debitAmount: -210000, creditAmount: 210000, currency: "ARS", status: "Paid", volume: 40 },
  { batchId: "BID-005", originBank: "Edge City Bank", sub: "CBU - 0010101010101010", date: "2025-08-11T04:30:00Z", debitAmount: -210000, creditAmount: 210000, currency: "ARS", status: "Pending", volume: 74 },
  { batchId: "BID-005", originBank: "Edge City Bank", sub: "CBU - 0010101010101010", date: "2025-08-11T04:30:00Z", debitAmount: -210000, creditAmount: 210000, currency: "ARS", status: "Failed", volume: 4 },
];

// Mock data for a batch's transactions, matching diseñoPayments/pantalladetailbatches.png
export const mockBatchTransactions = [
  { paymentId: "TXN005", billerAccount: "Personal Movil", sub: "BAC - 0010101010101010", date: "2025-08-11T04:30:00Z", amount: 210000, currency: "ARS", status: "Reversed" },
  { paymentId: "TXN004", billerAccount: "Personal Movil", sub: "BAC - 0010101010101010", date: "2025-08-11T04:30:00Z", amount: 210000, currency: "ARS", status: "Rejected" },
  { paymentId: "TXN003", billerAccount: "Personal Movil", sub: "BAC - 0010101010101010", date: "2025-08-11T04:30:00Z", amount: 210000, currency: "ARS", status: "Rejected" },
  { paymentId: "TXN002", billerAccount: "Personal Movil", sub: "BAC - 0010101010101010", date: "2025-08-11T04:30:00Z", amount: 210000, currency: "ARS", status: "Completed" },
  { paymentId: "TXN010", billerAccount: "Personal Movil", sub: "BAC - 0010101010101010", date: "2025-08-11T04:30:00Z", amount: 210000, currency: "ARS", status: "Reversed" },
  { paymentId: "TXN011", billerAccount: "Personal Movil", sub: "BAC - 0010101010101010", date: "2025-08-11T04:30:00Z", amount: 210000, currency: "ARS", status: "Completed" },
  { paymentId: "TXN012", billerAccount: "Personal Movil", sub: "BAC - 0010101010101010", date: "2025-08-11T04:30:00Z", amount: 210000, currency: "ARS", status: "Completed" },
  { paymentId: "TXN013", billerAccount: "Personal Movil", sub: "BAC - 0010101010101010", date: "2025-08-11T04:30:00Z", amount: 210000, currency: "ARS", status: "Reversed" },
];

// Status options for the Orders / Batches filter forms, matching
// diseñoPayments/statusorder.png and diseñoPayments/statusbatches.png
export const STATUS_FILTER_OPTIONS = ["All", "Completed", "Failed", "Paid", "Pending", "Processing", "Replaced"];

// Statuses offered in the table "Filter type" checklist (no "All"),
// matching diseñoPayments/filterbatchestable.png
export const TABLE_STATUS_CHECKLIST = ["Completed", "Failed", "Paid", "Pending", "Processing", "Replaced"];

// Mock data for the Payment Overview drawer, matching diseñoPayments/detailorder.png,
// detailorder2.png and detailorder3.png
export const mockPaymentDetailData = {
  transactionId: "TXN005",
  accountId: "Acme Corporation",
  accountNumber: "POS-99D23401",
  creationDate: "01-05-2026",
  creationTime: "04:30:00",
  currentStatus: "Completed",

  mainOrderInfo: {
    externalReference: "{ External Reference Name }",
    externalReferenceNumber: "{ External Reference Number }",
    cuit: "{ Tax ID Name }",
    cuitNumber: "{ Tax ID Number }",
    account: "{ Account Number }",
    accountCurrency: "( Currency Type )",
    subjectType: "{ Subject Type Name }",
    subjectTypeNumber: "( Subject Type Number )",
    agreementId: "{ 00.00 }",
    agreementCurrency: "( Currency Type )",
    paymentDate: "01-05-2026",
    paymentTime: "04:30:00",
  },

  financialBreakdown: [
    { label: "Principal Amount", value: "{ 00.00 }", currency: "( Currency Type )" },
    { label: "Processing Fee", value: "{ 00.00 }", currency: "( Currency Type )" },
    { label: "Applicable Tax (VAT)", value: "{ 00.00 }", currency: "( Currency Type )" },
    { label: "Net Total", value: "{ 00.00 }", currency: "( Currency Type )" },
  ],

  channelProcessing: {
    confectionId: "{ Confection ID N }",
    orderId: "{ Order ID N }",
    processId: "{ Process ID N }",
    channelState: "Verified",
    debitBankName: "{ Debit Bank  Name }",
    cbuNumber: "( CBU ID Number )",
  },

  settlements: [
    {
      settlementNumber: "{ Settlement N }",
      creationDate: "01-05-2026",
      creationTime: "04:30:00",
      settlementTotal: "{ 00.00 }",
      settlementCurrency: "( Currency Type )",
      consolidations: [
        {
          location: "{ Location }",
          invoiceNumber: "{ Invoice Number }",
          billingType: "Billing Type",
          itemType: "{ Item Type } e.g. Biller",
          dueDate: "01-05-2026",
          dueTime: "04:30:00",
          concentrationTaxes: [
            { taxComponent: "Federal VAT", rate: "{ 00.00 } %", amount: "{ 00.00 }", currency: "( Currency Type )" },
            { taxComponent: "Regional Levy", rate: "3,0 %", amount: "200.70", currency: "ARS" },
          ],
          note: '* Tax calculated based on agreement AGR-2023-4552 jurisdiction "US-EAST01". Final reconciliation subject to monthly audit.',
        },
        { location: "{ Location }" },
        { location: "{ Location }" },
      ],
    },
    {
      settlementNumber: "{ Settlement N }",
      creationDate: "01-05-2026",
      creationTime: "04:30:00",
      settlementTotal: "{ 00.00 }",
      settlementCurrency: "( Currency Type )",
      consolidations: [{ location: "{ Location }" }, { location: "{ Location }" }, { location: "{ Location }" }],
    },
  ],

  withholdings: [
    {
      idName: "{ ID Name or Number }",
      paymentItemId: "{ Payment Item ID Name }",
      paymentItemIdNumber: "( Payment Item ID Number )",
      paymentDate: "01-05-2026",
      paymentTime: "04:30:00",
      processId: "{ Process ID N }",
      channelState: "Completed",
      principalAmount: "{ 00.00 }",
      principalCurrency: "( Currency Type )",
      amountType: "{ Item Type } e.g. CREDIT",
      channelOut: "{ Channel Out }",
    },
    { idName: "{ ID Name or Number }" },
  ],
};
