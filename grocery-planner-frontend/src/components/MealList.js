import React, { useEffect, useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Button, Dimmer, Header, Icon, Modal } from 'semantic-ui-react';
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
    if (shoppingList.shoppingListId != null) {
      // Updating an existing list
      const requestBody = userSelectedMeals.flatMap((meal) =>
        meal.ingredients.map((ingredient) => ({
          ingredient: {
            ingredientId: ingredient.ingredientId,
            ingredientName: ingredient.ingredientName,
          },
          itemQuantity: ingredient.quantity,
          itemQuantityUnit: ingredient.quantityUnit,
        }))
      );
    
      console.log('Updating shopping list with: ', requestBody);
  
      try {
        const response = await fetch(`http://localhost:8080/lists/update/${shoppingList.shoppingListId}`, {
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
      if (userSelectedMeals.length > 0) {
        let requestBody = userSelectedMeals.flatMap((meal) =>
          meal.ingredients.map((ingredient) => ({
            ingredient: {
              ingredientId: ingredient.ingredientId,
              ingredientName: ingredient.ingredientName,
            },
            itemQuantity: ingredient.quantity,
            itemQuantityUnit: ingredient.quantityUnit,
          }))
        );

        console.log('Creating shopping list with: ', requestBody);
  
        try {
          const response = await fetch('http://localhost:8080/lists/create', {
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
      } else {
        // If creating shopping list with to meals selected
        console.error('Add meals before trying to generate a list');
      }
    }
  };

  return (
    <div className="meal-list-app-screen">
      <h1>Meals</h1>
      <div className="meal-list-container">
        <ul className="meal-list">
          {userSelectedMeals.map((meal) => (
            <li key={meal.id} className="meal-item">
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