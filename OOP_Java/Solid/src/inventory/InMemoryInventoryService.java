package inventory;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import model.CartItem;

public class InMemoryInventoryService implements InventoryService {
    private final Map<String, Integer> stock = new HashMap<>();

    public InMemoryInventoryService() {
        stock.put("BOOK-1", 10);
        stock.put("PEN-1", 100);
    }

    @Override
    public boolean isAvailable(String productId, int quantity) {
        return stock.getOrDefault(productId, 0) >= quantity;
    }

    @Override
    public void reserveItems(List<CartItem> items) {
        for (CartItem item : items) {
            int availableQuantity = stock.getOrDefault(item.getProductId(), 0);
            stock.put(item.getProductId(), availableQuantity - item.getQuantity());
        }
    }
}
