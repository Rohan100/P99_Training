package payment;

import model.Customer;

public class CardPaymentService implements PaymentService {
    @Override
    public void pay(Customer customer, double amount) {
        System.out.println("Paid Rs. " + amount + " using card for " + customer.getName());
    }
}
