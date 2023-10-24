-- Sample Meals
INSERT INTO meals (meal_name, meal_description) VALUES
  ('Chicken Fajitas', 'Delicious chicken fajitas'),
  ('Spaghetti Bolognese', 'Classic Bolognese with a rich tomato sauce ');
  
  -- Make Laksa

-- Sample Ingredients
INSERT INTO ingredients (ingredient_name) VALUES
  ('Chicken Breast'),
  ('Bell Peppers'),
  ('Onions'),
  ('Spaghetti'),
  ('Beef Mince'),
  ('Chopped Tomatoes'),
  ('Passata'),
  ('Courgette');

-- Sample Meal-Ingredients Link with Quantity and Units
INSERT INTO meal_ingredients_link (meal_id, ingredient_id, ingredient_quantity, ingredient_quantity_unit) VALUES
  (1, 1, 300.00, 'grams'),	-- Chicken Fajitas with 300g of Chicken Breast
  (1, 2, 2, 'pieces'),		-- Chicken Fajitas with 2 Bell Peppers
  (1, 3, 2, 'pieces'),		-- Chicken Fajitas with 2 Onions
  (1, 8, 1, 'pieces'),		-- Chicken Fajitas with 1 Courgette
  (2, 4, 400.00, 'grams'), 	-- Spaghetti Bolognese with 400g of Spaghetti
  (2, 5, 250.00, 'grams'), 	-- Spaghetti Bolognese with 250g of Beef Mince
  (2, 6, 300.00, 'grams'), 	-- Spaghetti Bolognese with 400g of Chopped Tomatoes
  (2, 8, 500.00, 'grams'); 	-- Spaghetti Bolognese with 400g of Passata
