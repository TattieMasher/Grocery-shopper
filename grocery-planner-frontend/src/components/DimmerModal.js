import React, { useEffect, useState } from 'react';
import { Button, Dimmer, Header, Icon, Modal, Search } from 'semantic-ui-react';
import MealDetailsModal from './ExistingMealDetailsModal';
import NewMealDetailsModal from './NewMealModal';

const DimmerModal = ({ triggerButtonLabel, setMeals, meals }) => {
  // States
  const [modalOpen, setModalOpen] = useState(false); // for meal visibility
  const [searchQuery, setSearchQuery] = useState(''); // for setting search query
  const [searchResults, setSearchResults] = useState([]); // for returning search results
  const [selectedMeal, setSelectedMeal] = useState(null); // for the selected meal
  const [isMealDetailsModalOpen, setMealDetailsModalOpen] = useState(false); // Define isMealDetailsModalOpen state
  const [isNewMealModalOpen, setNewMealModalOpen] = useState(false); // Define isNewMealModalOpen state

  const handleSearchChange = (e, { value }) => {
    setSearchQuery(value);

    // Filter meals based on searchQuery
    const filteredMeals = meals.filter((meal) => {
      // Avoid case differences between search criteria and results
      const searchLower = value.toLowerCase();
      return (
        meal.name.toLowerCase().includes(searchLower) ||
        meal.description.toLowerCase().includes(searchLower)
      );
    });

    setSearchResults(filteredMeals);
  };

  // Set the selected meal when a result is clicked
  const handleResultSelect = async (e, { result }) => {
    try {
      // Fetch the meal details including ingredients
      const response = await fetch(`http://localhost:8080/meals/details/${result.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch meal details');
      }
      const mealDetails = await response.json();
  
      // Set the selected meal and its ingredients
      setSelectedMeal(mealDetails);
      setNewMealModalOpen(true);
    } catch (error) {
      console.error('Error fetching meal details:', error);
    }
  };

  // Handle the "Create new meal" button click to open the new meal modal
  const handleCreateNewMealClick = () => {
    setNewMealModalOpen(true);
  };

  return (
    <div>
      <Button className="add-button" onClick={() => setModalOpen(true)}>
        {triggerButtonLabel}
      </Button>
      <Modal
        dimmer="blurring"
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        closeOnDimmerClick={false} // TODO: Decide whether or not to keep
      >
        <Dimmer active={modalOpen} id="add-meal-modal">
          <div
            className="meal-search-container"
            style={{ borderRadius: '50px', padding: '20px', width: '70vw' }}
          >
            <Header as="h2" icon inverted>
              <Icon name="food" />
              Add meal
            </Header>
            <Modal.Content>
              <p>Add a meal to your meal list</p>
              <Search
                placeholder="Search for a meal..."
                input={{ icon: 'search', iconPosition: 'right' }}
                onSearchChange={handleSearchChange}
                value={searchQuery}
                results={searchResults}
                onResultSelect={handleResultSelect} // Handle result selection
                // Render search results - TODO: Make pretty!
                resultRenderer={(result) => (
                  <div>
                    <div className="meal-search-result-name">{result.name}</div>
                    <div className="meal-search-result-desc">
                      {result.description}
                    </div>
                  </div>
                )}
              />
            </Modal.Content>
            <Modal.Actions>
              <Button color="green" onClick={handleCreateNewMealClick}>
                <Icon name="plus" /> Create new meal
              </Button>
              <Button color="red" onClick={() => setModalOpen(false)}>
                <Icon name="remove" /> Close
              </Button>
            </Modal.Actions>
          </div>
        </Dimmer>
      </Modal>
      {isNewMealModalOpen && (
        <NewMealDetailsModal
          triggerButtonLabel="Create New Meal"
          meals={meals} 
          setMeals={setMeals}
          selectedMeal={selectedMeal} // Pass the selected meal
          isOpen={isNewMealModalOpen}
          onClose={() => setNewMealModalOpen(false)}
        />
      )}
    </div>
  );
};

export default DimmerModal;