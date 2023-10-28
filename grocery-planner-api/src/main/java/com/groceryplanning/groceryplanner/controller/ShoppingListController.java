package com.groceryplanning.groceryplanner.controller;

        import com.groceryplanning.groceryplanner.model.Ingredient;
        import com.groceryplanning.groceryplanner.model.ShoppingList;
        import com.groceryplanning.groceryplanner.model.ShoppingListItem;
        import com.groceryplanning.groceryplanner.model.User;
        import com.groceryplanning.groceryplanner.repository.ShoppingListItemRepository;
        import com.groceryplanning.groceryplanner.repository.ShoppingListRepository;
        import com.groceryplanning.groceryplanner.repository.UserRepository;
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.http.HttpStatus;
        import org.springframework.http.ResponseEntity;
        import org.springframework.web.bind.annotation.*;

        import java.util.ArrayList;
        import java.util.List;
        import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000") // TODO: Check me! Added to get React working.
@RequestMapping("/lists")
public class ShoppingListController {
    @Autowired
    private ShoppingListRepository shoppingListRepository;

    @Autowired
    private ShoppingListItemRepository shoppingListItemRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/{id}")
    public ResponseEntity<ShoppingList> getShoppingListById(@PathVariable Long id) {
        ShoppingList shoppingList = shoppingListRepository.findById(id).orElse(null);
        if (shoppingList == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(shoppingList);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<ShoppingList> createShoppingListFromIngredients(@RequestBody List<ShoppingListItem> shoppingListItems) {
        // Create a new ShoppingList without items
        ShoppingList shoppingList = new ShoppingList();

        // Temporarily hardcode list user owner
        Optional<User> alex = userRepository.findById(Long.valueOf(1));
        shoppingList.setUser(alex.get());

        // Save the shopping list to the database using the repository
        ShoppingList savedShoppingList = shoppingListRepository.save(shoppingList);

        // Iterate and associate ShoppingListItems with the new ShoppingList
        for (ShoppingListItem item : shoppingListItems) {
            item.setShoppingList(savedShoppingList);
        }

        // Save the updated ShoppingListItem objects
        List<ShoppingListItem> savedItems = shoppingListItemRepository.saveAll(shoppingListItems);

        // Set the list of saved ShoppingListItem objects back to the ShoppingList
        savedShoppingList.setItems(savedItems);

        return ResponseEntity.ok(savedShoppingList);
    }

    // TODO: Either delete the above or this one
    @PostMapping("/create/{listName}")
    public ResponseEntity<ShoppingList> createShoppingListFromIngredients(
            @PathVariable String listName,
            @RequestBody List<ShoppingListItem> shoppingListItems) {
        // Create a new ShoppingList and set its name
        ShoppingList shoppingList = new ShoppingList();
        shoppingList.setListName(listName);

        // Temporarily hardcode list user owner
        Optional<User> alex = userRepository.findById(Long.valueOf(1));
        shoppingList.setUser(alex.get());

        // Save the shopping list to the database using the repository
        ShoppingList savedShoppingList = shoppingListRepository.save(shoppingList);

        // Iterate and associate ShoppingListItems with the new ShoppingList
        for (ShoppingListItem item : shoppingListItems) {
            item.setShoppingList(savedShoppingList);
        }

        // Save the updated ShoppingListItem objects
        List<ShoppingListItem> savedItems = shoppingListItemRepository.saveAll(shoppingListItems);

        // Set the list of saved ShoppingListItem objects back to the ShoppingList
        savedShoppingList.setItems(savedItems);

        return ResponseEntity.ok(savedShoppingList);
    }

    /*
        TEST METHOD
     */
    @GetMapping("/combine-and-return")
    public ResponseEntity<ShoppingList> combineAndReturn(@RequestBody List<ShoppingListItem> shoppingListItems) {
        // Create a new ShoppingList without items
        ShoppingList shoppingList = new ShoppingList();

        // Temporarily hardcode list user owner
        Optional<User> alex = userRepository.findById(Long.valueOf(1));
        shoppingList.setUser(alex.get());

        // Combine the items using the combineItems method
        shoppingList.setItems(shoppingListItems);

        // Combine the items using the combineItems method
        shoppingList.combineItems();

        // Return the combined shopping list as the response
        return ResponseEntity.ok(shoppingList);
    }
}
