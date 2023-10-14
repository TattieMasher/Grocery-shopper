package com.groceryplanning.groceryplanner.model;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.Set;

@Entity
@Table(name = "ingredients")
public class Ingredient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ingredient_id")
    private Long ingredientId;

    @Column(name = "ingredient_name")
    private String name;

    @Column(name = "ingredient_quantity")
    private BigDecimal ingredientQuantity;

    @Column(name = "ingredient_quantity_unit")
    private String ingredientQuantityUnit;

    public Long getIngredientId() {
        return ingredientId;
    }

    public void setIngredientId(Long ingredientId) {
        this.ingredientId = ingredientId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getIngredientQuantity() {
        return ingredientQuantity;
    }

    public void setIngredientQuantity(BigDecimal ingredientQuantity) {
        this.ingredientQuantity = ingredientQuantity;
    }

    public String getIngredientQuantityUnit() {
        return ingredientQuantityUnit;
    }

    public void setIngredientQuantityUnit(String ingredientQuantityUnit) {
        this.ingredientQuantityUnit = ingredientQuantityUnit;
    }
}