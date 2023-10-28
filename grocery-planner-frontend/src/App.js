import React, { useState } from 'react';
import './App.css';
import MealList from './components/MealList';
import ShoppingList from './components/ShoppingList'; // Import the component for displaying the shopping list

function App() {
  const [shoppingList, setShoppingList] = useState([]); // to store shopping list data
  const [showMealList, setShowMealList] = useState(true); // to toggle between MealList and ShoppingList
  const [userSelectedMeals, setUserSelectedMeals] = useState([]); // to store user-selected meals

  // Function to toggle between MealList and ShoppingList
  const toggleShowMealList = () => {
    setShowMealList(!showMealList);
  };

  return (
    <div className="App">
      {showMealList ? ( // Conditional rendering based on showMealList state
        <MealList
          shoppingList={shoppingList}
          setShoppingList={setShoppingList}
          toggleShowMealList={toggleShowMealList}
        />
      ) : (
        <ShoppingList
          shoppingList={shoppingList}
          toggleShowMealList={toggleShowMealList}
        />
      )}
    </div>
  );
}

export default App;