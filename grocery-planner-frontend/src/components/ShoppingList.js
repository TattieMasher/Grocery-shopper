import React, { useState } from 'react';
import { List, Button } from 'semantic-ui-react';
import ShoppingListItem from './ShoppingListItem';
import NewListItem from './NewShoppingListItem'

const ShoppingList = ({ shoppingList, toggleShowMealList, setShoppingList }) => {
  const [inactiveItems, setInactiveItems] = useState({ items: [] }); // to store clicked items
  const [isNewListItemModalOpen, setIsNewListItemModalOpen] = useState(false); // to control the new list item modal

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

  const toggleItem = (itemToToggle) => {
    // Check if the item is already in inactiveItems
    const isInInactiveItems = inactiveItems.items.includes(itemToToggle);
  
    if (isInInactiveItems) {
      // Remove from inactiveItems
      const updatedInactiveItems = {
        ...inactiveItems,
        items: inactiveItems.items.filter((item) => item !== itemToToggle),
      };
  
      // Set the inactive property to false for the item being added back to shoppingList
      const updatedItem = {
        ...itemToToggle,
        inactive: false,
      };
  
      // Add to shoppingList with the updated item
      const updatedShoppingList = {
        ...shoppingList,
        items: [...shoppingList.items, updatedItem],
      };
  
      setInactiveItems(updatedInactiveItems);
      setShoppingList(updatedShoppingList);
    } else {
      // Remove from shoppingList
      const updatedShoppingList = {
        ...shoppingList,
        items: shoppingList.items.filter((item) => item !== itemToToggle),
      };
  
      // Set the inactive property to true for the item being added to inactiveItems
      const updatedItem = {
        ...itemToToggle,
        inactive: true,
      };
  
      // Add to inactiveItems with the updated item
      const updatedInactiveItems = {
        ...inactiveItems,
        items: [...inactiveItems.items, updatedItem],
      };
  
      setShoppingList(updatedShoppingList);
      setInactiveItems(updatedInactiveItems);
    }
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
            onToggle={() => toggleItem(item)}
            inactiveItems={inactiveItems}
          />
        ))}
      </List>
      {/* Render the inactiveItems list similarly */}
      <List divided relaxed className="shopping-list-inactive">
        {inactiveItems.items.map((item, index) => (
          <ShoppingListItem
            key={index}
            item={item}
            onRemove={() => removeItem(item)}
            onToggle={() => toggleItem(item)}
            inactiveItems={inactiveItems}
          />
        ))}
      </List>
      <NewListItem />
      <Button onClick={toggleShowMealList}>Go back to Meals</Button>
    </div>
  );
};

export default ShoppingList;