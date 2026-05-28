package model;

import java.util.List;

public class Order {
    private final String id;
    private final Customer customer;
    private final List<CartItem> items;
    private final double totalAmount;
    private final double discountAmount;
    private final double finalAmount;
    private final OrderStatus status;

    public Order(
            String id,
            Customer customer,
            List<CartItem> items,
            double totalAmount,
            double discountAmount,
            double finalAmount,
            OrderStatus status
    ) {
        this.id = id;
        this.customer = customer;
        this.items = items;
        this.totalAmount = totalAmount;
        this.discountAmount = discountAmount;
        this.finalAmount = finalAmount;
        this.status = status;
    }

    public String getId() {
        return id;
    }

    public Customer getCustomer() {
        return customer;
    }

    public List<CartItem> getItems() {
        return items;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public double getDiscountAmount() {
        return discountAmount;
    }

    public double getFinalAmount() {
        return finalAmount;
    }

    public OrderStatus getStatus() {
        return status;
    }

    @Override
    public String toString() {
        return "Order{id='" + id + "', customer='" + customer.getName()
                + "', totalAmount=" + totalAmount
                + ", discountAmount=" + discountAmount
                + ", finalAmount=" + finalAmount
                + ", status=" + status + "}";
    }
}
