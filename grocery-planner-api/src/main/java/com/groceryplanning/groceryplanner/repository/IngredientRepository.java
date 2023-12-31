package com.groceryplanning.groceryplanner.repository;

import com.groceryplanning.groceryplanner.model.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IngredientRepository extends JpaRepository<Ingredient, Long> {
    @Query("SELECT i FROM Ingredient i WHERE i.ingredientName = :name")
    Optional<Ingredient> findByName(@Param("name") String name);
}
