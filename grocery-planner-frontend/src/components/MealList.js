import React, { useEffect, useState } from 'react';

const MealList = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    // Fetch meals from your API
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
                <h2>{meal.name}</h2>
                <p>{meal.description}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="control-buttons">
          <button className="add-button">+</button>
          <button className="clear-button">Clear meals</button>
          <button className="generate-button">Generate shopping list</button>
        </div>
      </div>
    </div>
  );
};

export default MealList;