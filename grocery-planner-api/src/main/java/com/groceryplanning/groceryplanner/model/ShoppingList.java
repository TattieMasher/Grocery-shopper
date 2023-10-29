package com.groceryplanning.groceryplanner.model;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Entity
@Table(name = "shopping_lists")
public class ShoppingList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "shopping_list_id")
    private Long shoppingListId;

    @Column(name = "list_name")
    private String listName;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "shoppingList", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<ShoppingListItem> items = new ArrayList<>();

    public Long getShoppingListId() {
        return shoppingListId;
    }

    public void setShoppingListId(Long shoppingListId) {
        this.shoppingListId = shoppingListId;
    }

    public String getListName() {
        return listName;
    }

    public void setListName(String listName) {
        this.listName = listName;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<ShoppingListItem> getItems() {
        return items;
    }

    public void setItems(List<ShoppingListItem> items) {
        this.items = items;
    }

    public boolean combineItems() {
        // HashMap map items by ingredientId and quantityUnit against ShoppingListItem
        HashMap<String, ShoppingListItem> groupedItems = new HashMap<>();

        // Iterate all current ShoppingListItems
        for (ShoppingListItem item : items) {
            // Create a composite HashMap key made up of current list item's id and quantity unit
            String key = item.getIngredient().getIngredientId() + "_" + item.getItemQuantityUnit();

            // If current item exists with same quantity unit
            if (groupedItems.containsKey(key)) {
                // Get existing item
                ShoppingListItem existingItem = groupedItems.get(key);
                // Sum the quantity of current item with the existent one
                BigDecimal combinedQuantity = existingItem.getItemQuantity().add(item.getItemQuantity());
                // Update existent quantity with sum
                existingItem.setItemQuantity(combinedQuantity);
            } else {
                // Item doesn't exist in the map, add it to it
                groupedItems.put(key, item);
            }
        }

        // Update items list with the combined items
        items = new ArrayList<>(groupedItems.values());

        return true;    // Find failure case, because there must be a case, and return false
    }
}