package com.groceryplanning.groceryplanner.controller;

        import com.groceryplanning.groceryplanner.model.ShoppingList;
        import com.groceryplanning.groceryplanner.repository.ShoppingListItemRepository;
        import com.groceryplanning.groceryplanner.repository.ShoppingListRepository;
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.http.ResponseEntity;
        import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/lists")
public class ShoppingListController {
    @Autowired
    private ShoppingListRepository shoppingListRepository;

    @Autowired
    private ShoppingListItemRepository shoppingListItemRepository;

    @GetMapping("/{id}")
    public ResponseEntity<ShoppingList> getShoppingListById(@PathVariable Long id) {
        ShoppingList shoppingList = shoppingListRepository.findById(id).orElse(null);
        if (shoppingList == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(shoppingList);
        }
    }
}
