package com.groceryplanning.groceryplanner.model;

import jakarta.persistence.*;

import java.io.Serializable;

@Embeddable
public class MealIngredientId implements Serializable {
    @Column(name = "meal_id")
    private Long mealId;

    @Column(name = "ingredient_id")
    private Long ingredientId;

    // Constructor, getters, setters, equals, and hashCode

    public Long getMealId() {
        return mealId;
    }

    public void setMealId(Long mealId) {
        this.mealId = mealId;
    }

    public Long getIngredientId() {
        return ingredientId;
    }

    public void setIngredientId(Long ingredientId) {
        this.ingredientId = ingredientId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        MealIngredientId that = (MealIngredientId) o;

        if (mealId != null ? !mealId.equals(that.mealId) : that.mealId != null) return false;
        return ingredientId != null ? ingredientId.equals(that.ingredientId) : that.ingredientId == null;
    }

    @Override
    public int hashCode() {
        int result = mealId != null ? mealId.hashCode() : 0;
        result = 31 * result + (ingredientId != null ? ingredientId.hashCode() : 0);
        return result;
    }

}

