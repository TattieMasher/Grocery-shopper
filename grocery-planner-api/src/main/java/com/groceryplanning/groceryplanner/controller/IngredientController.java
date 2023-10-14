package com.groceryplanning.groceryplanner.controller;

import com.groceryplanning.groceryplanner.model.Ingredient;
import com.groceryplanning.groceryplanner.repository.IngredientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ingredients")
public class IngredientController {
    private final IngredientRepository ingredientRepository;

    @Autowired
    public IngredientController(IngredientRepository ingredientRepository) {
        this.ingredientRepository = ingredientRepository;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ingredient> getIngredientById(@PathVariable Long id) {
        Ingredient ingredient = ingredientRepository.findById(id).orElse(null);
        if (ingredient == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(ingredient);
        }
    }
}
