import React, { useEffect, useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Button, Dimmer, Header, Icon, Modal } from 'semantic-ui-react';
import DimmerModal from './DimmerModal';
import NewMealDetailsModal from './NewMealModal';

const MealList = () => {
  const [meals, setMeals] = useState([]);
  const [selectedMealForEdit, setSelectedMealForEdit] = useState(null); // Define the state

  useEffect(() => {
    // Fetch meals from API
    fetch('http://localhost:8080/meals/allmeals')
      .then((response) => response.json())
      .then((data) => setMeals(data))
      .catch((error) => console.error('Error fetching meals:', error));
  }, []);

  const editMeal = (meal) => {
    setSelectedMealForEdit(meal);
  };

  const handleDeleteMeal = (mealId) => {
    const updatedMeals = meals.filter((meal) => meal.id !== mealId);
    setMeals(updatedMeals);
  };

  return (
    <div className="meal-list-app-screen">
      <h1>Meals</h1>
      <div className="meal-list-container">
        <ul className="meal-list">
          {meals.map((meal) => (
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
          <DimmerModal triggerButtonLabel="Add meal" setMeals={setMeals} meals={meals} />
          <Button className="clear-button">Clear meals</Button>
          <Button className="generate-button">Generate shopping list</Button>
        </div>
      </div>
      {selectedMealForEdit && (
        <NewMealDetailsModal
          triggerButtonLabel="Edit Meal"
          setMeals={setMeals}
          meals={meals}
          selectedMeal={selectedMealForEdit}
          isOpen={true}
          onClose={() => setSelectedMealForEdit(null)}
        />
      )}
    </div>
  );
};

export default MealList;