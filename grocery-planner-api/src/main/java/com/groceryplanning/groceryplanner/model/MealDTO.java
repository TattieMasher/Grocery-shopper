package com.groceryplanning.groceryplanner.model;

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

    public static MealDTO convertToDTO(Meal meal, boolean includeIngredients, boolean includeQuantities) {
        MealDTO dto = new MealDTO();
        dto.setId(meal.getId());
        dto.setName(meal.getName());
        dto.setDescription(meal.getDescription());

        if(includeIngredients) {
            for (MealIngredient link : meal.getMealIngredients()) {
                IngredientDetails details = new IngredientDetails();
                details.setIngredientId(link.getIngredient().getIngredientId());
                details.setIngredientName(link.getIngredient().getIngredientName());

                if(includeQuantities) {
                    details.setQuantity(link.getQuantity());
                    details.setQuantityUnit(link.getQuantityUnit());
                }

                dto.getIngredients().add(details);
            }
        }
        return dto;
    }
}