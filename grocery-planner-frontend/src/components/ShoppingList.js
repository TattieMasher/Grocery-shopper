import React from 'react';
import { List, Button } from 'semantic-ui-react';
import ShoppingListItem from './ShoppingListItem';

const ShoppingList = ({ shoppingList, toggleShowMealList, setShoppingList }) => {
  const removeItem = (itemToRemove) => {
    const updatedItems = shoppingList.items.filter((item) => item !== itemToRemove);

    // Update the shopping list with the new items after removal
    const updatedShoppingList = {
      ...shoppingList,
      items: updatedItems,
    };

    // Use setShoppingList to update the shopping list
    setShoppingList(updatedShoppingList);
  };

  return (
    <div className="shopping-list-container">
      <h1>Shopping List</h1>
      <p>id: {shoppingList.shoppingListId}</p>
      <List divided relaxed className="shopping-list">
        {shoppingList.items.map((item, index) => (
          <ShoppingListItem
            key={index}
            item={item}
            onRemove={() => removeItem(item)}
          />
        ))}
      </List>
      <Button onClick={toggleShowMealList}>Go back to Meals</Button>
    </div>
  );
};

export default ShoppingList;