import React from 'react';
import { Icon, Button, Checkbox } from 'semantic-ui-react';

const ShoppingListItem = ({ item, onRemove, onToggle }) => {
  const handleRemoveClick = () => {
    onRemove(); // Call the onRemove function passed from the parent
  };

  const handleToggle = () => {
    // Toggle the item's inactive property
    const updatedItem = {
      ...item,
      inactive: !item.inactive,
    };

    console.log(item);

    onToggle(updatedItem); // Call the onToggle function passed from the parent with the updated item
  };

  return (
    <li className="shopping-item">
      <div className="shopping-actions">
        <Checkbox
          className="shopping-checkbox"
          checked={item.inactive} // Use item.inactive to determine the checked state
          onChange={handleToggle} // Handle checkbox change
        />
      </div>
      <div className="shopping-details">
        <div>
          <h3>{item.ingredient.ingredientName}</h3>
          <p>{item.itemQuantity} {item.itemQuantityUnit}</p>
        </div>
      </div>
      <div className="shopping-actions">
        <Button
          icon
          className="edit-button"
          onClick={handleRemoveClick}
        >
          <Icon name="pencil" />
        </Button>
      </div>
    </li>
  );
};

export default ShoppingListItem;