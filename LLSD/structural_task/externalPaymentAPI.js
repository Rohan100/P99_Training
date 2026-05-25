// externalPaymentAPI.js
// Mock external REST API

class ExternalPaymentAPI {
  async makePayment(payload) {
    // Simulate external API response
    return {
      status_code: 200,
      transaction_id: "TXN123456",
      amount_paid: payload.total_amount,
      currency_used: payload.currency,
    };
  }
}

module.exports = ExternalPaymentAPI;