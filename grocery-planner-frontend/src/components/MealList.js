import React, { useEffect, useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Button, Label, Header, Icon, Modal } from 'semantic-ui-react';
import DimmerModal from './DimmerModal';
import NewMealDetailsModal from './NewMealModal';

const MealList = ({
  shoppingList,
  setShoppingList,
  toggleShowMealList,
  userSelectedMeals,
  setUserSelectedMeals
}) => {
  const [meals, setMeals] = useState([]);
  const [selectedMealForEdit, setSelectedMealForEdit] = useState(null);
  const [showErrorLabel, setShowErrorLabel] = useState(false);

  const incrementMealQuantity = (meal) => {
    console.log('Meal before increment:', meal);
    // Increment mealQuantity (or set to 1 if it doesn't exist)
    const updatedMeal = { ...meal, mealQuantity: (meal.mealQuantity || 0) + 1 };
    updateMeal(updatedMeal);
    console.log('Meal after increment:', updatedMeal);
  };

  const decrementMealQuantity = (meal) => {
    console.log('Meal before decrement:', meal);
    // If mealQuantity exists and is greater than 1 before decrementing
    if (meal.mealQuantity && meal.mealQuantity > 1) {
      // Decrement meal's mealQuantity
      const updatedMeal = { ...meal, mealQuantity: meal.mealQuantity - 1 };
      updateMeal(updatedMeal);
      console.log('Meal after decrement:', updatedMeal);
    }
  };

  const updateMeal = (updatedMeal) => {
    const updatedMeals = userSelectedMeals.map((meal) =>
      meal.id === updatedMeal.id ? updatedMeal : meal
    );
    setUserSelectedMeals(updatedMeals);
  };

  const editMeal = (meal) => {
    setSelectedMealForEdit(meal);
  };

  const handleDeleteMeal = (mealId) => {
    const updatedMeals = userSelectedMeals.filter((meal) => meal.id !== mealId);
    setUserSelectedMeals(updatedMeals);
  };

  const handleClearMeals = () => {
    setUserSelectedMeals([]);
  }

  const generateShoppingList = async () => {
    console.log('Shopping List ID:', shoppingList.shoppingListId);
    console.log('List: ', shoppingList);
    if (userSelectedMeals.length > 0) {
      if (shoppingList.shoppingListId != null) {
        // Updating an existing list
        const requestBody = userSelectedMeals.flatMap((meal) =>
          meal.ingredients.map((ingredient) => ({
            ingredient: {
              ingredientId: ingredient.ingredientId,
              ingredientName: ingredient.ingredientName,
            },
            itemQuantity: ingredient.quantity * (meal.mealQuantity || 1), // multiply the ingredient amount by how many entries of that meal there are, or 1, if no copies
            itemQuantityUnit: ingredient.quantityUnit,
          }))
        );
      
        console.log('Updating shopping list with: ', requestBody);
    
        try {
          const response = await fetch(`https://grocery.alexs-apis.xyz/lists/update/${shoppingList.shoppingListId}`, {
            method: 'PUT', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
          });        
      
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
      
          const responseData = await response.json();
          console.log('Shopping list updated:', responseData);
      
          // Update shopping list in the master container
          setShoppingList(responseData);
      
          toggleShowMealList();
        } catch (error) {
          console.error('Error updating shopping list:', error);
        }
      } else {
        // Creating a new list
        let requestBody = userSelectedMeals.flatMap((meal) =>
          meal.ingredients.map((ingredient) => ({
            ingredient: {
              ingredientId: ingredient.ingredientId,
              ingredientName: ingredient.ingredientName,
            },
            itemQuantity: ingredient.quantity * (meal.mealQuantity || 1), // multiply the ingredient amount by how many entries of that meal there are, or 1, if no copies
            itemQuantityUnit: ingredient.quantityUnit,
          }))
        );

        console.log('Creating shopping list with: ', requestBody);

        try {
          const response = await fetch('https://grocery.alexs-apis.xyz/lists/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const responseData = await response.json();
          console.log('Shopping list created:', responseData);

          // Update shopping list in the master container
          setShoppingList(responseData);

          toggleShowMealList();
        } catch (error) {
          console.error('Error creating shopping list:', error);
        }
      }
    } else {
      // If saving a meal without the required fields filled
      setShowErrorLabel(true); // Show the error label
      setTimeout(() => {
        setShowErrorLabel(false); // Hide the error label after 2.5 seconds
      }, 2500);
      console.error('Add meals before trying to generate a list');
    }
  };

  return (
    <div className="meal-list-app-screen">
      <h1>Meals</h1>
      <div className="meal-list-container">
        <ul className="meal-list">
          {userSelectedMeals.map((meal) => (
            <li key={meal.id} className="meal-item">
              <div className="meal-actions">
              <Button
                icon
                className="edit-button"
                onClick={() => incrementMealQuantity(meal)} // Call increment function
              >
                <Icon name="plus" />
              </Button>
              <Button
                icon
                className="edit-button"
                onClick={() => decrementMealQuantity(meal)} // Call decrement function
              >
                <Icon name="minus" />
              </Button>
              </div>
              <div>
                <h3>{meal.mealQuantity || 1}</h3> {/* Display mealQuantity, if it exists. If not, show 1. */}
              </div>
              <div className="meal-details">
                <div>
                  <h3>{meal.name}</h3>
                  <p>{meal.description}</p>
                </div>
              </div>
              <div className="meal-actions">
                <Button
                  icon
                  className="edit-button"
                  onClick={() => editMeal(meal)}
                >
                  <Icon name="pencil" />
                </Button>
                <Button
                  icon
                  className="delete-button"
                  onClick={() => handleDeleteMeal(meal.id)}
                >
                  <Icon name="trash" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
        <div className="control-buttons">
          <DimmerModal 
            triggerButtonLabel="Add meal"
            setMeals={setMeals}
            meals={meals}
            userSelectedMeals={userSelectedMeals}
            setUserSelectedMeals={setUserSelectedMeals}  
          />
          <Button className="clear-button" onClick={handleClearMeals}>Clear all meals</Button>
          <Button className="generate-button" onClick={generateShoppingList}>Generate shopping list</Button>
          {/* Conditional rendering of the error label */}
          {showErrorLabel && (
            <Label color="red" pointing="above" className="error-label">
              Please add meals before generating a shopping list.
            </Label>
          )}
        </div>
      </div>
      {selectedMealForEdit && (
        <NewMealDetailsModal
          triggerButtonLabel="Edit Meal"
          setMeals={setMeals}
          meals={meals}
          selectedMeal={selectedMealForEdit}
          userSelectedMeals={userSelectedMeals}
          setUserSelectedMeals={setUserSelectedMeals}
          isOpen={true}
          onClose={() => setSelectedMealForEdit(null)}
        />
      )}
    </div>
  );
};

export default MealList;