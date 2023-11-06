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
@CrossOrigin(origins = "*") // TODO: Check me! Added to get React working.
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
    @PostMapping("/create-and-combine")
    public ResponseEntity<ShoppingList> combineAndReturn(@RequestBody List<ShoppingListItem> shoppingListItems) {
        // Create a new ShoppingList without items
        ShoppingList shoppingList = new ShoppingList();

        // Temporarily hardcode list user owner
        Optional<User> alex = userRepository.findById(Long.valueOf(1));
        shoppingList.setUser(alex.get());

        // Save the shopping list to the database using the repository
        ShoppingList savedShoppingList = shoppingListRepository.save(shoppingList);

        // Combine the items using the combineItems method TODO: Combine before or saving?
        shoppingList.setItems(shoppingListItems);

        // Combine the items using the combineItems method
        savedShoppingList.combineItems();

        // Return the combined shopping list as the response
        return ResponseEntity.ok(savedShoppingList);
    }

    @PutMapping("/update/{shoppingListId}")
    public ResponseEntity<ShoppingList> updateShoppingList(@PathVariable Long shoppingListId, @RequestBody List<ShoppingListItem> shoppingListItems) {
        // Check if the shopping list with the given ID exists
        Optional<ShoppingList> optionalShoppingList = shoppingListRepository.findById(shoppingListId);

        if (optionalShoppingList.isPresent()) {
            ShoppingList existingShoppingList = optionalShoppingList.get();

            // Clear the existing items list outside the entity
            existingShoppingList.getItems().clear();

            // Update the properties of the existing ShoppingListItem objects with the new ones
            for (ShoppingListItem newItem : shoppingListItems) {
                // Set the association with the existing ShoppingList. Added to avoid errors (TODO: CHECK ME)
                newItem.setShoppingList(existingShoppingList);
            }

            // Set the list's items field
            existingShoppingList.setItems(shoppingListItems);

            // Combine list items
            existingShoppingList.combineItems();

            // Save the list
            ShoppingList updatedShoppingList = shoppingListRepository.save(existingShoppingList);

            return ResponseEntity.ok(updatedShoppingList);
        } else {
            // TODO: Make this call list creation
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/update/add/{shoppingListId}")
    public ResponseEntity<ShoppingList> addToShoppingList(@PathVariable Long shoppingListId, @RequestBody ShoppingListItem newItem) {
        // Check if the shopping list with the given ID exists
        Optional<ShoppingList> optionalShoppingList = shoppingListRepository.findById(shoppingListId);

        if (optionalShoppingList.isPresent()) {
            ShoppingList existingShoppingList = optionalShoppingList.get();

            // Set association with the existing ShoppingList
            newItem.setShoppingList(existingShoppingList);

            // Add the new item to the existing shopping list's items
            existingShoppingList.getItems().add(newItem);

            // Combine list items
            existingShoppingList.combineItems();

            // Save the updated shopping list to the database
            ShoppingList updatedShoppingList = shoppingListRepository.save(existingShoppingList);

            return ResponseEntity.ok(updatedShoppingList);
        } else {
            // Handle the case where the shopping list with the given ID doesn't exist
            return ResponseEntity.notFound().build();
        }
    }
}