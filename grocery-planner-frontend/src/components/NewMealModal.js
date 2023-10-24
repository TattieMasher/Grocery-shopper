import React, { useState, useEffect } from 'react';
import { Button, Input, Header, Icon, Modal, List, Dropdown } from 'semantic-ui-react';
import IngredientItem from './IngredientItem';

const NewMealDetailsModal = ({ triggerButtonLabel, name, isOpen, onClose }) => {
  const [modalOpen, setMealMakerModalOpen] = useState(false); // for meal visibility
  const [ingredients, setIngredients] = useState([]); // for storing ingredients
  const [selectedIngredient, setSelectedIngredient] = useState(null); // for selected ingredient
  const [ingredientOptions, setIngredientOptions] = useState([]); // for ingredient dropdown options
  const [quantity, setQuantity] = useState(''); // for numerical quantity
  const [quantityUnit, setQuantityUnit] = useState(''); // for quantity unit
  const [mealName, setMealName] = useState(''); // for meal name
  const [mealDescription, setMealDescription] = useState(''); // for meal description
  const quantityUnitOptions = ['grams', 'milliliters', 'pieces']; // define quantity unit options

  // Function to add an ingredient to the list
  const addIngredient = () => {
    if (selectedIngredient && quantityUnit !== '') {
      const newIngredient = {
        ingredientName: selectedIngredient,
        quantity: quantity,
        quantityUnit: quantityUnit,
      };
      setIngredients([...ingredients, newIngredient]);
      setSelectedIngredient(null); // Clear the selected ingredient
      setQuantity(''); // Clear the quantity input
      setQuantityUnit(''); // Clear the quantity unit input
    }
  };

  const handleSaveMealClick = () => {
    // Gather meal data including name, description, and ingredients
    const mealData = {
      name: mealName,
      description: mealDescription,
      ingredients: ingredients.map((ingredient) => ({
        ingredientName: ingredient.ingredientName, // Use the updated field name
        quantity: ingredient.quantity,
        quantityUnit: ingredient.quantityUnit,
      })),

      // TODO: Close this Modal (and maybe DimmerModal)
    };
  
    console.log("Saving meal: ", mealData);
  
    // Call the saveMeal function to save the meal
    saveMeal(mealData);
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
        // Handle the response if needed (e.g., update your meals array)
        console.log('Meal saved:', data);
      })
      .catch((error) => {
        console.error('Error saving meal:', error);
      });
  };

  useEffect(() => {
    // Fetch ingredient data from REST API
    fetch('http://localhost:8080/ingredients/all')
      .then((response) => response.json())
      .then((data) => {
        // Transform API data into options for the dropdown
        const ingredientOptions = data.map((ingredient) => ({
          key: ingredient.ingredientId,
          text: ingredient.name,
          value: ingredient.name, // Use the ingredient name as the value
        }));
        setIngredientOptions(ingredientOptions);
      })
      .catch((error) => {
        console.error('Error fetching ingredient data:', error);
      });
  }, []); // Run this effect only once when the component mounts

  return (
    <div>
      <Button color="green" onClick={() => setMealMakerModalOpen(true)}>
        <Icon name="plus" /> Create new meal
      </Button>
      <Modal dimmer="blurring"
      open={isOpen}
      onClose={onClose}
      closeOnDimmerClick={false} // TODO: Decide whether or not to keep
      >
        <Modal.Header>
          <div style={{ textAlign: 'center' }}>
              <Header>Create Meal</Header>
          </div>
          <Input className="meal-header-label" label="Meal name: " value={mealName} onChange={(e) => setMealName(e.target.value)} />
          <Input label="Description:" value={mealDescription} onChange={(e) => setMealName(e.target.value)} />
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
                        // Filter out the ingredient to remove from the list
                        const updatedIngredients = ingredients.filter(
                        (ing) => ing !== ingredientToRemove
                        );
                        setIngredients(updatedIngredients);
                    }}
                    />
                ))}
            </List>
            <div className="ingredient-adder">
              <Dropdown
                placeholder="Search for an ingredient..."
                fluid
                search
                selection
                options={ingredientOptions}
                value={selectedIngredient}
                onChange={(e, { value }) => setSelectedIngredient(value)}
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