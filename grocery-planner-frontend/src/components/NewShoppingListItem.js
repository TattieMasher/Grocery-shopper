import React, { useState } from 'react';
import { Modal, Header, Button, Icon, List, Label, Input, Dropdown } from 'semantic-ui-react';

const NewListItem = () => {
  const [isOpen, setIsOpen] = useState(false);
  const quantityUnitOptions = ['grams', 'milliliters', 'pieces'];

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div> 
      <Button className="add-button shopping-button" onClick={openModal}>
        <Icon name="plus" /> Add item to list
      </Button>
      <Modal dimmer="blurring" className="lol-test"
      open={isOpen}
      onClose={closeModal}>
        <Modal.Header>New Shopping List Item</Modal.Header>
        <Modal.Content>
          <Modal.Description>
              <List>
                <List.Item>
                  <Label className="meal-details-label">Ingredient name:</Label>
                  <Input
                    className="meal-details-input"
                  />
                </List.Item>
                <List.Item>
                  <Label className="meal-details-label">Meal Name:</Label>
                  <Input
                    className="meal-details-input"
                  />
                </List.Item>
                <List.Item>
                  <Label className="meal-details-label">Quantity:</Label>
                  <Input
                    className="meal-details-input"
                    type="number"
                    min="1"
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
                    />
                </List.Item>
              </List>
              <div className="control-buttons">
                <Button color="green">
                  <Icon name="plus" /> Add Ingredient to shopping list
                </Button>
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