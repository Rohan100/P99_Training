package notification;

import model.Order;

public class EmailNotificationService implements NotificationService {
    @Override
    public void sendOrderConfirmation(Order order) {
        System.out.println("Order confirmation sent to " + order.getCustomer().getEmail());
    }
}
