import React from 'react';
import { List, Button } from 'semantic-ui-react';

const ShoppingList = ({ shoppingList, toggleShowMealList }) => {
  return (
    <div>
      <h1>Shopping List</h1>
      <p>id: {shoppingList.shoppingListId}</p>
      <List divided relaxed>
        {shoppingList.items.map((item, index) => (
          <List.Item key={index}>
            <List.Header>{item.ingredient.ingredientName}</List.Header>
            <List.Content>
              {item.itemQuantity} {item.itemQuantityUnit}
            </List.Content>
          </List.Item>
        ))}
      </List>
      <Button onClick={toggleShowMealList}>Go back to Meals</Button>
    </div>
  );
};

export default ShoppingList;