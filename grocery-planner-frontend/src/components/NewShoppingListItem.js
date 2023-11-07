import React, { useState } from 'react';
import { Modal, Header, Button, Icon, List, Label, Input, Dropdown } from 'semantic-ui-react';

const NewListItem = ({ shoppingList, setShoppingList }) => {
  const [isOpen, setIsOpen] = useState(false);
  const quantityUnitOptions = ['grams', 'milliliters', 'pieces'];
  const [ingredientName, setIngredientName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [quantityUnit, setQuantityUnit] = useState('');
  const [showErrorLabel, setShowErrorLabel] = useState(false); // Define showErrorLabel state

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIngredientName('');
    setQuantity('');
    setQuantityUnit('');
    setIsOpen(false);
  };

  const saveIngredient = (ingredientToSave) => {
    return fetch('https://grocery.alexs-apis.xyz/ingredients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ingredientToSave),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok when saving ingredient');
        }
        return response.json();
      });
  };

  const saveIngredientToList = (savedIngredient, quantity, quantityUnit) => {
    const ingredientToList = {
      ingredient: {
        ingredientId: savedIngredient.ingredientId,
        ingredientName: savedIngredient.ingredientName
      },
      itemQuantity: parseFloat(quantity),
      itemQuantityUnit: quantityUnit
    };

    console.log("Saving: ", ingredientToList);

    fetch(`https://grocery.alexs-apis.xyz/lists/update/add/${shoppingList.shoppingListId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ingredientToList),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok when adding ingredient to list');
        }
        return response.json();
      })
      .then(updatedShoppingList => {
        console.log("Ingredient added to list:", updatedShoppingList);
        // Save over shopping list after making API calls
        setShoppingList(updatedShoppingList);
        closeModal(); // Close the modal after updating shopping list
      })
      .catch(error => {
        console.error('Error adding ingredient to list:', error);
      });
  };

  const addIngredient = () => {
    if (ingredientName.trim() !== '' && quantity !== '' && quantityUnit !== '') {
      const ingredientToSave = {
        ingredientName: ingredientName.trim()
      };

      saveIngredient(ingredientToSave)
        .then(savedIngredient => {
          console.log("Saved ingredient to db:", savedIngredient);
          saveIngredientToList(savedIngredient, quantity, quantityUnit);
          setIngredientName('');
          setQuantity('');
          setQuantityUnit('');
        })
        .catch(error => {
          console.error('Error saving ingredient:', error);
        });
    } else {
      // If adding an ingredient to the shopping list without the required fields filled
      setShowErrorLabel(true); // Show the error label
      setTimeout(() => {
        setShowErrorLabel(false); // Hide the error label after 2.5 seconds
      }, 2500);
      console.error('Add meals before trying to generate a list');
      console.log("Shopping list item details not filled");
    }
  };

  return (
    <div>
      <Button className="add-button shopping-button" onClick={openModal}>
        <Icon name="plus" /> Add item to list
      </Button>
      <Modal dimmer="blurring"
        open={isOpen}
        onClose={closeModal}>
        <Modal.Header>New Shopping List Item</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <List>
              <List.Item>
                <Label className="ingredient-details-label">Ingredient name:</Label>
                <Input
                  className="meal-details-input"
                  value={ingredientName}
                  onChange={(e) => setIngredientName(e.target.value)}
                />
              </List.Item>
              <List.Item>
                <Label className="ingredient-details-label">Quantity:</Label>
                <Input
                  className="meal-details-input"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </List.Item>
              <List.Item>
                <Label className="ingredient-details-label">Quantity Unit:</Label>
                <Dropdown
                  className="ingredient-adder-unit"
                  placeholder="Select unit..."
                  fluid
                  selection
                  options={quantityUnitOptions.map((unit) => ({
                    key: unit,
                    text: unit,
                    value: unit,
                  }))}
                  value={quantityUnit}
                  onChange={(e, { value }) => setQuantityUnit(value)}
                />
              </List.Item>
            </List>
            <div className="control-buttons">
              <Button color="green" onClick={addIngredient}>
                <Icon name="plus" /> Add Ingredient to shopping list
              </Button>
              {/* Conditional rendering of the error label */}
              {showErrorLabel && (
                <Label color="red" pointing="above" className="error-label">
                  Please fille in the above fields before adding to your shopping list.
                </Label>
              )}
              <Button color="red" onClick={closeModal}>
                <Icon name="remove" /> Cancel
              </Button>
            </div>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default NewListItem;