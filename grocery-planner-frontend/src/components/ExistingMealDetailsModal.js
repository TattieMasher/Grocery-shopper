import React from 'react';
import { Modal, Header, List } from 'semantic-ui-react';

const ExistingMealDetailsModal = ({ meal, isOpen, onClose }) => {
  return (
    <Modal dimmer="blurring" open={isOpen} onClose={onClose}>
      <Modal.Header>Meal Details</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Header>{meal ? meal.name : ''}</Header>
          {meal && (
            <List>
              <List.Item>
                <strong>Description:</strong> {meal.description}
              </List.Item>
              <List.Item>
                <strong>ID:</strong> {meal.id}
              </List.Item>
            </List>
          )}
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default ExistingMealDetailsModal;