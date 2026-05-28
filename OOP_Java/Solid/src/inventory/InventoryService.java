package inventory;

import java.util.List;
import model.CartItem;

public interface InventoryService {
    boolean isAvailable(String productId, int quantity);

    void reserveItems(List<CartItem> items);
}
