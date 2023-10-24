package com.groceryplanning.groceryplanner.controller;

import com.groceryplanning.groceryplanner.model.*;
import com.groceryplanning.groceryplanner.repository.IngredientRepository;
import com.groceryplanning.groceryplanner.repository.MealIngredientRepository;
import com.groceryplanning.groceryplanner.repository.MealRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000") // TODO: Check me! Added to get React working.
@RequestMapping("/meals")
public class MealController {
    @Autowired
    private final MealRepository mealRepository;
    @Autowired
    private final IngredientRepository ingredientRepository;
    @Autowired
    private final MealIngredientRepository mealIngredientRepository;

    @Autowired
    public MealController(MealRepository mealRepository, IngredientRepository ingredientRepository, MealIngredientRepository mealIngredientRepository) {
        this.mealRepository = mealRepository;
        this.ingredientRepository = ingredientRepository;
        this.mealIngredientRepository = mealIngredientRepository;
    }

    @GetMapping("/{id}")
    public ResponseEntity<MealDTO> getMealOverviewById(@PathVariable Long id) {
        Meal meal = mealRepository.findById(id).orElse(null);
        MealDTO dto = MealDTO.convertToDTO(meal, false, false);
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/allmeals")
    public ResponseEntity<List<MealDTO>> getAllMealOverviews() {
        List<Meal> meals = mealRepository.findAll();
        List<MealDTO> mealDTOs = new ArrayList<>();
        for(Meal meal : meals) {
            mealDTOs.add(MealDTO.convertToDTO(meal, false, false));
        }
        return ResponseEntity.ok(mealDTOs);
    }

    @GetMapping("/details/{id}")
    public ResponseEntity<MealDTO> getMealDetails(@PathVariable Long id) {
        Meal meal = mealRepository.findById(id).orElse(null);
        MealDTO dto = MealDTO.convertToDTO(meal, true, true);
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/details/allmeals")
    public ResponseEntity<List<MealDTO>> getAllMealDetails() {
        List<Meal> meals = mealRepository.findAll();
        List<MealDTO> mealDTOs = new ArrayList<>();
        for(Meal meal : meals) {
            mealDTOs.add(MealDTO.convertToDTO(meal, true, true));
        }
        return ResponseEntity.ok(mealDTOs);
    }

    @PostMapping("")
    public ResponseEntity<MealDTO> createOrUpdateMeal(@RequestBody MealDTO mealDTO) {
        // Declare an array list of ingredient entities
        List<Ingredient> ingredientEntities = new ArrayList<>();
        // Iterate all specified ingredients in meal parameter
        for (IngredientDetails details : mealDTO.getIngredients()) {
            // Declare ingredient entity from db, if it can be found
            Ingredient ingredient = ingredientRepository.findByName(details.getIngredientName()).orElse(null);

            // If it can't be found, create and save it!
            if (ingredient == null) {
                ingredient = new Ingredient();
                ingredient.setName(details.getIngredientName());
                ingredient = ingredientRepository.save(ingredient);
            }
            // Add entity to arraylist
            ingredientEntities.add(ingredient);
        }

        // Create or update the meal
        Meal meal;
        if (mealDTO.getId() != null) {
            meal = mealRepository.findById(mealDTO.getId()).orElse(new Meal());
        } else {
            meal = new Meal();
        }

        meal.setName(mealDTO.getName());
        meal.setDescription(mealDTO.getDescription());
        meal = mealRepository.save(meal);  // Save meal to db to get the ID
        mealDTO.setId(meal.getId());    // Add the ID to the DTO to be returned

        // Iterate all ingredients and associate with the meal
        List<MealIngredient> mealIngredients = new ArrayList<>();
        for (int i = 0; i < ingredientEntities.size(); i++) {
            MealIngredient link = new MealIngredient();
            link.setId(new MealIngredientId(meal.getId(), ingredientEntities.get(i).getIngredientId())); // TODO: simplify this? Method breaks unless done this way, due to composite key in meal_ingredients_link table
            link.setMeal(meal);
            link.setIngredient(ingredientEntities.get(i));
            link.setQuantity(mealDTO.getIngredients().get(i).getQuantity());
            link.setQuantityUnit(mealDTO.getIngredients().get(i).getQuantityUnit());
            mealIngredients.add(link);
        }
        mealIngredientRepository.saveAll(mealIngredients);

        return ResponseEntity.ok(mealDTO);
    }
}