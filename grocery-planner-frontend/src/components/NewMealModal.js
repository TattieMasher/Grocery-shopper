import React, { useState, useEffect } from 'react';
import { Button, Input, Header, Icon, Modal, List, Dropdown } from 'semantic-ui-react';
import IngredientItem from './IngredientItem';

const NewMealDetailsModal = ({ triggerButtonLabel, setMeals, meals, name, isOpen, onClose, selectedMeal }) => {
  const [modalOpen, setMealMakerModalOpen] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState(''); // Use a string to store the ingredient name
  const [ingredientOptions, setIngredientOptions] = useState([]);
  const [quantity, setQuantity] = useState('');
  const [quantityUnit, setQuantityUnit] = useState('');
  const [mealName, setMealName] = useState('');
  const [mealDescription, setMealDescription] = useState('');
  const quantityUnitOptions = ['grams', 'milliliters', 'pieces'];

  useEffect(() => {
    if (selectedMeal) {
      setMealName(selectedMeal.name || '');
      setMealDescription(selectedMeal.description || '');
  
      // Fetch the list of ingredients for the selected meal
      fetch(`http://localhost:8080/meals/details/${selectedMeal.id}`)
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
      console.error('Validation failed. Not all required fields filled.');
    } else {
      // Save the meal
      const mealData = {
        name: mealName,
        description: mealDescription,
        ingredients: ingredients.map((ingredient) => ({
          ingredientName: ingredient.ingredientName,
          quantity: ingredient.quantity,
          quantityUnit: ingredient.quantityUnit,
        })),
      };
    
      console.log("Saving meal: ", mealData);
  
      saveMeal(mealData);
    }
  };
  
  const saveMeal = (mealData) => {
    fetch('http://localhost:8080/meals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mealData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Meal saved:', data);
  
        // Update meals state with meal returned from the API
        setMeals([...meals, data]);
  
        // Close the modal or perform other actions as needed
        onClose();
      })
      .catch((error) => {
        console.error('Error saving meal:', error);
      });
  };

  return (
    <div>
      <Button color="green" onClick={() => setMealMakerModalOpen(true)}>
        <Icon name="plus" /> Create new meal
      </Button>
      <Modal
        dimmer="blurring"
        open={isOpen}
        onClose={onClose}
        closeOnDimmerClick={false}
      >
        <Modal.Header>
          <div style={{ textAlign: 'center' }}>
            <Header>Create Meal</Header>
          </div>
          <Input
            className="meal-details-input"
            label="Meal name: "
            value={mealName}
            onChange={(e) => setMealName(e.target.value)}
          />
          <Input
            className="meal-details-input"
            label="Description:"
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
              <Input
                label="Ingredient"
                placeholder="Enter ingredient name..."
                value={selectedIngredient}
                onChange={(e) => setSelectedIngredient(e.target.value)}
              />
              <Input
                label="Quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
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
                  <Icon name="check" /> Save meal
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