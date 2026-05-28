package discount;

public class PercentageDiscountService implements DiscountService {
    private final double percentage;

    public PercentageDiscountService(double percentage) {
        this.percentage = percentage;
    }

    @Override
    public double calculateDiscount(double totalAmount) {
        return totalAmount * percentage / 100;
    }
}
