import React, { useEffect, useState } from 'react';
import AddMealForm from './AddMealForm copy'; // Import the modal component
import 'semantic-ui-css/semantic.min.css';
import { Button, Dimmer, Header, Icon, Modal } from 'semantic-ui-react';

const MealList = () => {
  const [meals, setMeals] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false); // State to manage modal visibility

  useEffect(() => {
    // Fetch meals from API
    fetch('http://localhost:8080/meals/allmeals')
      .then((response) => response.json())
      .then((data) => setMeals(data))
      .catch((error) => console.error('Error fetching meals:', error));
  }, []);

  // Function to open the modal
  const openModal = () => {
    setModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="meal-list-app-screen">
      <h1>Meals</h1>
      <div className="meal-list-container">
        <ul className="meal-list">
          {meals.map((meal) => (
            <li key={meal.id}>
              <div>
                <h2>{meal.name}</h2>
                <p>{meal.description}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="control-buttons">
          <button className="add-button">
            +
          </button>
          <button className="clear-button">Clear meals</button>
          <button className="generate-button">Generate shopping list</button>
        </div>
      </div>

      {/* Render the modal conditionally */}
      <AddMealForm isOpen={isModalOpen} onClose={closeModal} meals={meals} />
    </div>
  );
};

export default MealList;