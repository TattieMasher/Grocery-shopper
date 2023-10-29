import React from 'react';
import { List, Icon, Button } from 'semantic-ui-react';

const ShoppingListItem = ({ item, onRemove }) => {
  const handleRemoveClick = () => {
    onRemove(); // Call the onRemove function passed from the parent
  };

  return (
    <li className="shopping-item">
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
        >
          <Icon name="pencil" />
        </Button>
        <Button
          icon
          className="delete-button"
        >
          <Icon name="trash" />
        </Button>
      </div>
    </li>
  );
};

export default ShoppingListItem;