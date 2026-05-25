// paymentAdapter.js
// Adapter Pattern Implementation

const ExternalPaymentAPI = require("./externalPaymentAPI");

class PaymentAdapter {
  constructor() {
    this.externalAPI = new ExternalPaymentAPI();
  }

  // Standardized method for our application
  async pay(amount, currency) {
    const payload = {
      total_amount: amount,
      currency: currency,
    };

    const response = await this.externalAPI.makePayment(payload);

    // Convert external API response
    // into internal application format
    return {
      success: response.status_code === 200,
      transactionId: response.transaction_id,
      amount: response.amount_paid,
      currency: response.currency_used,
    };
  }
}

module.exports = PaymentAdapter;