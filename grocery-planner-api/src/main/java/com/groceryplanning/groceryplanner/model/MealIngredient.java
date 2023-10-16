package com.groceryplanning.groceryplanner.model;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "meal_ingredients_link")
public class MealIngredient {

    @EmbeddedId
    private MealIngredientId id;

    @MapsId("mealId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "meal_id", nullable = false, updatable = false, insertable = false)
    private Meal meal;

    @MapsId("ingredientId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ingredient_id", nullable = false, updatable = false, insertable = false)
    private Ingredient ingredient;

    @Column(name = "ingredient_quantity")
    private BigDecimal quantity;

    @Column(name = "ingredient_quantity_unit")
    private String quantityUnit;

    public MealIngredientId getId() {
        return id;
    }

    public void setId(MealIngredientId id) {
        this.id = id;
    }

    public Meal getMeal() {
        return meal;
    }

    public void setMeal(Meal meal) {
        this.meal = meal;
    }

    public Ingredient getIngredient() {
        return ingredient;
    }

    public void setIngredient(Ingredient ingredient) {
        this.ingredient = ingredient;
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