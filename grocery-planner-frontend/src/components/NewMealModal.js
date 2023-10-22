import React, { useState } from 'react';
import { Button, Dimmer, Header, Icon, Modal, Search } from 'semantic-ui-react';
import { List } from 'semantic-ui-react';

const NewMealDetailsModal = ({ triggerButtonLabel, name, isOpen, onClose }) => {
    const [modalOpen, setMealMakerModalOpen] = useState(false); // for meal visibility

  return (
    <div>
        <Button color="green" onClick={() => setMealMakerModalOpen(true)}>
            <Icon name="plus" /> Create new meal
        </Button>
        <Modal dimmer="blurring" open={isOpen} onClose={onClose}>
        <Modal.Header>Meal Details</Modal.Header>
        <Modal.Content>
            <Modal.Description>
            <Header>{name}</Header>
            
            </Modal.Description>
        </Modal.Content>
        </Modal>
    </div>
  );
};

export default NewMealDetailsModal;