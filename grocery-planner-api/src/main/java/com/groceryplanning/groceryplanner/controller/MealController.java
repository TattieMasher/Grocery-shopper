package com.groceryplanning.groceryplanner.controller;

import com.groceryplanning.groceryplanner.model.Ingredient;
import com.groceryplanning.groceryplanner.model.Meal;
import com.groceryplanning.groceryplanner.repository.MealRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import java.util.Set;

@RestController
@RequestMapping("/meals")
public class MealController {
    private final MealRepository mealRepository;

    @Autowired
    public MealController(MealRepository mealRepository) {
        this.mealRepository = mealRepository;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Meal> getMealById(@PathVariable Long id) {
        Meal meal = mealRepository.findById(id).orElse(null);
        if (meal == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(meal);
        }
    }

    @GetMapping("/allmeals")
    public ResponseEntity<List<Meal>> getAllMeals() {
        List<Meal> meals = mealRepository.findAll();
        return ResponseEntity.ok(meals);
    }
}