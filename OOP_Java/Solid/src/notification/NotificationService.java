package notification;

import model.Order;

public interface NotificationService {
    void sendOrderConfirmation(Order order);
}
