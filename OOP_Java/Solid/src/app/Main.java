package app;

import delivery.DeliveryService;
import delivery.StandardDeliveryService;
import discount.DiscountService;
import discount.PercentageDiscountService;
import inventory.InMemoryInventoryService;
import inventory.InventoryService;
import model.Address;
import model.Cart;
import model.CartItem;
import model.Customer;
import model.Order;
import notification.EmailNotificationService;
import notification.NotificationService;
import order.DefaultOrderService;
import order.OrderService;
import payment.CardPaymentService;
import payment.PaymentService;

public class Main {
    public static void main(String[] args) {
        InventoryService inventoryService = new InMemoryInventoryService();
        DiscountService discountService = new PercentageDiscountService(10);
        PaymentService paymentService = new CardPaymentService();
        DeliveryService deliveryService = new StandardDeliveryService();
        NotificationService notificationService = new EmailNotificationService();

        OrderService orderService = new DefaultOrderService(
                inventoryService,
                discountService,
                paymentService,
                deliveryService,
                notificationService
        );

        Customer customer = new Customer(
                "CUST-1",
                "Amit Sharma",
                "amit@example.com",
                new Address("12 Park Street", "Pune", "Maharashtra", "411001")
        );

        Cart cart = new Cart();
        cart.addItem(new CartItem("BOOK-1", "Clean Code", 600, 1));
        cart.addItem(new CartItem("PEN-1", "Blue Pen", 20, 3));

        Order order = orderService.placeOrder(customer, cart);
        System.out.println(order);
    }
}
