package order;

import delivery.DeliveryService;
import discount.DiscountService;
import inventory.InventoryService;
import java.util.ArrayList;
import java.util.UUID;
import model.Cart;
import model.CartItem;
import model.Customer;
import model.Order;
import model.OrderStatus;
import notification.NotificationService;
import payment.PaymentService;

public class DefaultOrderService implements OrderService {
    private final InventoryService inventoryService;
    private final DiscountService discountService;
    private final PaymentService paymentService;
    private final DeliveryService deliveryService;
    private final NotificationService notificationService;

    public DefaultOrderService(
            InventoryService inventoryService,
            DiscountService discountService,
            PaymentService paymentService,
            DeliveryService deliveryService,
            NotificationService notificationService
    ) {
        this.inventoryService = inventoryService;
        this.discountService = discountService;
        this.paymentService = paymentService;
        this.deliveryService = deliveryService;
        this.notificationService = notificationService;
    }

    @Override
    public Order placeOrder(Customer customer, Cart cart) {
        validateCart(cart);
        inventoryService.reserveItems(cart.getItems());

        double totalAmount = cart.getTotalAmount();
        double discountAmount = discountService.calculateDiscount(totalAmount);
        double finalAmount = totalAmount - discountAmount;

        paymentService.pay(customer, finalAmount);

        Order order = new Order(
                UUID.randomUUID().toString(),
                customer,
                new ArrayList<>(cart.getItems()),
                totalAmount,
                discountAmount,
                finalAmount,
                OrderStatus.PLACED
        );

        deliveryService.scheduleDelivery(order);
        notificationService.sendOrderConfirmation(order);

        return order;
    }

    private void validateCart(Cart cart) {
        if (cart.getItems().isEmpty()) {
            throw new IllegalArgumentException("Cart cannot be empty");
        }

        for (CartItem item : cart.getItems()) {
            if (!inventoryService.isAvailable(item.getProductId(), item.getQuantity())) {
                throw new IllegalStateException("Product is not available: " + item.getProductName());
            }
        }
    }
}
