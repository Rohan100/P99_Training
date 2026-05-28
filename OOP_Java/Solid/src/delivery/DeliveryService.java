package delivery;

import model.Order;

public interface DeliveryService {
    void scheduleDelivery(Order order);
}
