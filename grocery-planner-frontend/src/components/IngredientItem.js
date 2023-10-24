import React from 'react';
import { List, Icon } from 'semantic-ui-react';

const IngredientItem = ({ ingredient, onRemove }) => {
  const handleRemoveClick = () => {
    onRemove(ingredient);
  };

  return (
    <List.Item>
      <List.Content floated="right">
        <Icon name="trash alternate" color="red" onClick={handleRemoveClick} />
      </List.Content>
      <List.Content>
        {ingredient.ingredientName} - {ingredient.quantity} {ingredient.quantityUnit}
      </List.Content>
    </List.Item>
  );
};

export default IngredientItem;
