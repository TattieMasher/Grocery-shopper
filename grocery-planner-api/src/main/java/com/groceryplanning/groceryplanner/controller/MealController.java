package com.groceryplanning.groceryplanner.controller;

import com.groceryplanning.groceryplanner.model.Meal;
import com.groceryplanning.groceryplanner.model.MealDTO;
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
    private final MealRepository mealRepository;

    @Autowired
    public MealController(MealRepository mealRepository) {
        this.mealRepository = mealRepository;
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
            mealDTOs.add(MealDTO.convertToDTO(meal, true, true));
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

}