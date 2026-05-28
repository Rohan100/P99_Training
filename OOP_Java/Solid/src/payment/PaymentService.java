package payment;

import model.Customer;

public interface PaymentService {
    void pay(Customer customer, double amount);
}
