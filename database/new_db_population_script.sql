-- Sample Meals
INSERT INTO meal (name, description) VALUES
  ('Chicken Fajitas', 'Delicious chicken fajitas with spices and sautéed vegetables'),
  ('Spaghetti Bolognese', 'Classic Bolognese with a rich tomato sauce and ground beef');

-- Sample Ingredients
INSERT INTO ingredient (name) VALUES
  ('Chicken Breast'),
  ('Bell Peppers'),
  ('Onions'),
  ('Spaghetti'),
  ('Beef Mince'),
  ('Chopped Tomatoes'),
  ('Passata'),
  ('Courgette');

-- Sample Meal-Ingredients Link with Quantity and Units
INSERT INTO meal_ingredient (meal_id, ingredient_id, quantity, quantity_unit) VALUES
  (1, 1, 300.00, 'grams'),   -- Chicken Fajitas with 300g of Chicken Breast
  (1, 2, 2, 'pieces'),       -- Chicken Fajitas with 2 Bell Peppers
  (1, 3, 2, 'pieces'),       -- Chicken Fajitas with 2 Onions
  (1, 8, 1, 'pieces'),       -- Chicken Fajitas with 1 Courgette
  (2, 4, 400.00, 'grams'),   -- Spaghetti Bolognese with 400g of Spaghetti
  (2, 5, 250.00, 'grams'),   -- Spaghetti Bolognese with 250g of Beef Mince
  (2, 6, 300.00, 'grams'),   -- Spaghetti Bolognese with 300g of Chopped Tomatoes
  (2, 7, 500.00, 'ml');      -- Spaghetti Bolognese with 500ml of Passata

INSERT INTO user (username, email, password_hash) VALUES
  ('Alex', 'alex@example.com', 'password123');

-- Sample Shopping List
INSERT INTO shopping_list (name, user_id) VALUES
  ('Sample Shopping List', 1);

-- Sample Shopping List Items
INSERT INTO shopping_list_item (shopping_list_id, ingredient_id, quantity, quantity_unit) VALUES
  (1, 1, 500, 'grams'),  -- Chicken
  (1, 2, 3, 'units'),    -- Bell Peppers
  (1, 3, 2, 'units');    -- Onions
