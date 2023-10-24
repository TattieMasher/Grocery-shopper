package com.groceryplanning.groceryplanner.repository;

import com.groceryplanning.groceryplanner.model.ShoppingListItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShoppingListItemRepository extends JpaRepository<ShoppingListItem, Long> {
}