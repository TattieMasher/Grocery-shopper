package com.groceryplanning.groceryplanner.repository;

import com.groceryplanning.groceryplanner.model.Meal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MealRepository extends JpaRepository<Meal, Long> {
}
