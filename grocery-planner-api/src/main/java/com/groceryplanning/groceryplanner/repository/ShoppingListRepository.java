package com.groceryplanning.groceryplanner.repository;

import com.groceryplanning.groceryplanner.model.ShoppingList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShoppingListRepository extends JpaRepository<ShoppingList, Long> {
}
