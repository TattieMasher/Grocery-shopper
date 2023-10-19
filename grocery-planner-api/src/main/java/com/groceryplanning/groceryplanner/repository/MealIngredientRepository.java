package com.groceryplanning.groceryplanner.repository;

import com.groceryplanning.groceryplanner.model.Ingredient;
import com.groceryplanning.groceryplanner.model.MealIngredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MealIngredientRepository extends JpaRepository<MealIngredient, Long> {
}
