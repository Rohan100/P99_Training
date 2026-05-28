package order;

import model.Cart;
import model.Customer;
import model.Order;

public interface OrderService {
    Order placeOrder(Customer customer, Cart cart);
}
