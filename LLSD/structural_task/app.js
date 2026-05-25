// app.js
// Client code

const PaymentAdapter = require("./paymentAdapter");

async function main() {
  const paymentService = new PaymentAdapter();

  const result = await paymentService.pay(500, "INR");

  console.log("Payment Result:");
  console.log(result);
}

main();