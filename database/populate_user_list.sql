INSERT INTO users (user_name, user_email, password_hash) VALUES
  ('Alex', 'alex@example.com', 'password123');
  
  -- Sample data for the `shopping_lists` table
INSERT INTO shopping_lists (list_name, user_id) VALUES
  ('Sample Shopping List', 1);

-- Sample data for the `shopping_list_items` table
-- Ingredients for Chicken Fajitas
INSERT INTO shopping_list_items (shopping_list_id, ingredient_id, item_quantity, item_quantity_unit) VALUES
  (1, 1, 500, 'grams'), -- Chicken
  (1, 2, 2, 'units'), -- Bell Peppers
  (1, 3, 1, 'units'); -- Onions

-- Ingredients for Spaghetti Bolognese
INSERT INTO shopping_list_items (shopping_list_id, ingredient_id, item_quantity, item_quantity_unit) VALUES
  (1, 4, 200, 'grams'), -- Spaghetti
  (1, 5, 500, 'grams'), -- Beef Mince
  (1, 6, 500, 'grams'); -- Chopped Tomatoes
