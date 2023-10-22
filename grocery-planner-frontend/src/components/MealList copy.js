import React, { useEffect, useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Button, Dimmer, Header, Icon, Modal } from 'semantic-ui-react';
import DimmerModal from './DimmerModal'; // Import the DimmerModal component

const MealList = () => {
  const [meals, setMeals] = useState([]); // State to manage meal retrieveal
  const [isModalOpen, setModalOpen] = useState(false); // State to manage modal visibility

  useEffect(() => {
    // Fetch meals from API
    fetch('http://localhost:8080/meals/allmeals')
      .then((response) => response.json())
      .then((data) => setMeals(data))
      .catch((error) => console.error('Error fetching meals:', error));
  }, []);

  return (
    <div className="meal-list-app-screen">
      <h1>Meals</h1>
      <div className="meal-list-container">
        <ul className="meal-list">
          {meals.map((meal) => (
            <li key={meal.id}>
              <div>
                <h3>{meal.name}</h3>
                <p>{meal.description}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="control-buttons">
          <DimmerModal triggerButtonLabel="Add meal" meals={meals}/>
          <Button className="add-button">Add meal</Button>
          <Button className="clear-button">Clear meals</Button>
          <Button className="generate-button">Generate shopping list</Button>
        </div>
      </div>

    </div>
  );
};

export default MealList;