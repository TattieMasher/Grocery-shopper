import React, { useState, useEffect } from 'react';
import { Button, Input, Header, Icon, Modal, List, Dropdown, Label } from 'semantic-ui-react';
import IngredientItem from './IngredientItem';

const NewMealDetailsModal = ({ setMeals, meals, name, isOpen, onClose, selectedMeal, userSelectedMeals, setUserSelectedMeals }) => {
  const [modalOpen, setMealMakerModalOpen] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState('');
  const [ingredientOptions, setIngredientOptions] = useState([]);
  const [quantity, setQuantity] = useState('');
  const [quantityUnit, setQuantityUnit] = useState('');
  const [mealId, setMealId] = useState('');
  const [mealName, setMealName] = useState('');
  const [mealDescription, setMealDescription] = useState('');
  const quantityUnitOptions = ['grams', 'milliliters', 'pieces'];

  useEffect(() => {
    if (selectedMeal) {
      setMealId(selectedMeal.id || '');
      setMealName(selectedMeal.name || '');
      setMealDescription(selectedMeal.description || '');
  
      // Fetch the list of ingredients for the selected meal
      fetch(`https://grocery.alexs-apis.xyz/meals/details/${selectedMeal.id}`)
        .then((response) => response.json())
        .then((mealDetails) => {
          // Extract the ingredients from mealDetails and populate the ingredients state
          const mealIngredients = mealDetails.ingredients || [];
          setIngredients(mealIngredients);
        })
        .catch((error) => {
          console.error('Error fetching meal ingredients:', error);
        });
    }
  }, [selectedMeal]);

  useEffect(() => {
    console.log("Updated selected meals: ", userSelectedMeals);
  }, [userSelectedMeals]);
  

  const addIngredient = () => {
    if (selectedIngredient.trim() !== '' && quantityUnit !== '') {
      const newIngredient = {
        ingredientName: selectedIngredient.trim(),
        quantity: quantity,
        quantityUnit: quantityUnit,
      };
      setIngredients([...ingredients, newIngredient]);
      setSelectedIngredient(''); // Clear the selected ingredient details
      setQuantity('');
      setQuantityUnit('');
    }
  };

  const handleSaveMealClick = () => {
    // Validate the meal data as non-empty
    if (
      mealName.trim() === '' ||        
      mealDescription.trim() === '' || 
      ingredients.length === 0 ||      
      ingredients.some((ingredient) => (
        ingredient.ingredientName.trim() === '' ||
        ingredient.quantity === '' ||
        ingredient.quantityUnit === ''
      ))
    ) {
      console.error('Validation failed. Meal detail fields must be filled and ingredients must be added.');
    } else {
      // Create a meal data object without the id
      const mealData = {
        name: mealName,
        description: mealDescription,
        ingredients: ingredients.map((ingredient) => ({
          ingredientName: ingredient.ingredientName,
          quantity: ingredient.quantity,
          quantityUnit: ingredient.quantityUnit,
        })),
      };

    // Add the meal ID, if it exists (i.e, if the meal is being EDITED)
    if (mealId) {
      mealData.id = mealId;
    }
    
      console.log("Saving meal: ", mealData);
  
      saveMeal(mealData);
    }
  };
  
  const saveMeal = (mealData) => {
    fetch('https://grocery.alexs-apis.xyz/meals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mealData),
    })
      .then((response) => response.json())
      .then((savedMeal) => {
        console.log('Meal saved to db:', savedMeal);
  
        // Find the index of the meal with matching id to saved meal, 
        const existingMealIndex = userSelectedMeals.findIndex((meal) => meal.id === savedMeal.id);
  
        let updatedMeals;
        if (existingMealIndex !== -1) {
          // If the saved meal is found in array (exists), replace it
          updatedMeals = [...userSelectedMeals];
          updatedMeals[existingMealIndex] = savedMeal;
        } else {
          // If the saved meal doesn't exist (new meal), add it to our array
          updatedMeals = [...userSelectedMeals, savedMeal];
        }
  
        setUserSelectedMeals(updatedMeals);
        onClose(); // Close the modal
      })
      .catch((error) => {
        console.error('Error saving meal:', error);
      });
  };

  return (
    <div>
      <Button className="add-button" color="green" onClick={() => setMealMakerModalOpen(true)}>
        <Icon name="plus" /> Create new meal
      </Button>
      <Modal
        className="create-meal-modal"
        dimmer="blurring"
        open={isOpen}
        onClose={onClose}
        closeOnDimmerClick={false}
      >
        <Modal.Header>
          <div style={{ textAlign: 'center' }}>
            <Header>Add Meal</Header>
          </div>
          <Label className="meal-details-label">Meal Name:</Label>
          <Input
            className="meal-details-input"
            value={mealName}
            onChange={(e) => setMealName(e.target.value)}
          />
          <Label className="meal-details-label">Meal Description:</Label>
          <Input
            className="meal-details-input"
            value={mealDescription}
            onChange={(e) => setMealDescription(e.target.value)}
          />
        </Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Header>Ingredients</Header>
            <List divided relaxed>
              {ingredients.map((ingredient, index) => (
                <IngredientItem
                  key={index}
                  ingredient={ingredient}
                  onRemove={(ingredientToRemove) => {
                    const updatedIngredients = ingredients.filter(
                      (ing) => ing !== ingredientToRemove
                    );
                    setIngredients(updatedIngredients);
                  }}
                />
              ))}
            </List>
            <div className="ingredient-adder">
              <Label className="ingredient-details-label">Ingredient Name:</Label>
              <Input
                placeholder="Enter ingredient name..."
                value={selectedIngredient}
                onChange={(e) => setSelectedIngredient(e.target.value)}
              />
              <Label className="ingredient-details-label">Quantity:</Label>
              <Input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <Label className="ingredient-details-label">Quantity Unit:</Label>
              <Dropdown
                placeholder="Select unit..."
                fluid
                selection
                options={quantityUnitOptions.map((unit) => ({
                  key: unit,
                  text: unit,
                  value: unit,
                }))}
                value={quantityUnit}
                onChange={(e, { value }) => setQuantityUnit(value)}
              />
              <div className="control-buttons">
                <Button color="green" onClick={addIngredient}>
                  <Icon name="plus" /> Add Ingredient
                </Button>
                <Button color="teal" onClick={handleSaveMealClick}>
                  <Icon name="check" /> Save meal to list
                </Button>
                <Button color="red" onClick={onClose}>
                  <Icon name="remove" /> Cancel
                </Button>
              </div>
            </div>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default NewMealDetailsModal;