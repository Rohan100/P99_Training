package delivery;

import model.Order;

public class StandardDeliveryService implements DeliveryService {
    @Override
    public void scheduleDelivery(Order order) {
        System.out.println("Delivery scheduled to " + order.getCustomer().getAddress());
    }
}
