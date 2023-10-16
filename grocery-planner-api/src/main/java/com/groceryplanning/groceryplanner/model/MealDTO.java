package com.groceryplanning.groceryplanner.model;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class MealDTO {
    private Long id;
    private String name;
    private String description;
    private List<IngredientDetails> ingredients = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<IngredientDetails> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<IngredientDetails> ingredients) {
        this.ingredients = ingredients;
    }

    public static MealDTO convertToDTO(Meal meal) {
        MealDTO dto = new MealDTO();
        dto.setId(meal.getId());
        dto.setName(meal.getName());
        dto.setDescription(meal.getDescription());

        for (MealIngredient link : meal.getMealIngredients()) {
            IngredientDetails details = new IngredientDetails();
            details.setIngredientId(link.getIngredient().getIngredientId());
            details.setIngredientName(link.getIngredient().getName());
            details.setQuantity(link.getQuantity());
            details.setQuantityUnit(link.getQuantityUnit());

            dto.getIngredients().add(details);
        }

        return dto;
    }
}

class IngredientDetails {
    private Long ingredientId;
    private String ingredientName;
    private BigDecimal quantity;
    private String quantityUnit;

    public Long getIngredientId() {
        return ingredientId;
    }

    public void setIngredientId(Long ingredientId) {
        this.ingredientId = ingredientId;
    }

    public String getIngredientName() {
        return ingredientName;
    }

    public void setIngredientName(String ingredientName) {
        this.ingredientName = ingredientName;
    }

    public BigDecimal getQuantity() {
        return quantity;
    }

    public void setQuantity(BigDecimal quantity) {
        this.quantity = quantity;
    }

    public String getQuantityUnit() {
        return quantityUnit;
    }

    public void setQuantityUnit(String quantityUnit) {
        this.quantityUnit = quantityUnit;
    }
}

