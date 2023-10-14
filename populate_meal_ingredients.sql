-- Sample Meals
INSERT INTO meals (meal_name, meal_description) VALUES
  ('Chicken Fajitas', 'Delicious chicken fajitas with peppers and onions'),
  ('Spaghetti Bolognese', 'Classic spaghetti with a rich meat sauce'),
  ('Caesar Salad', 'Fresh Caesar salad with grilled chicken');

-- Sample Ingredients
INSERT INTO ingredients (ingredient_name) VALUES
  ('Chicken'),
  ('Bell Peppers'),
  ('Onions'),
  ('Spaghetti'),
  ('Beef Mince'),
  ('Tomato Sauce'),
  ('Lettuce'),
  ('Croutons');

-- Sample Meal-Ingredients Link with Quantity and Units
INSERT INTO meal_ingredients_link (meal_id, ingredient_id, ingredient_quantity, ingredient_quantity_unit) VALUES
  (1, 1, 300.00, 1), -- Chicken Fajitas with 300g of Chicken
  (1, 2, 200.00, 1), -- Chicken Fajitas with 200g of Bell Peppers
  (1, 3, 150.00, 1), -- Chicken Fajitas with 150g of Onions
  (2, 4, 400.00, 1), -- Spaghetti Bolognese with 400g of Spaghetti
  (2, 5, 250.00, 1), -- Spaghetti Bolognese with 250g of Beef Mince
  (2, 6, 300.00, 1), -- Spaghetti Bolognese with 300g of Tomato Sauce
  (3, 1, 350.00, 1), -- Caesar Salad with 350g of Chicken
  (3, 7, 100.00, 1), -- Caesar Salad with 100g of Lettuce
  (3, 8, 50.00, 1);  -- Caesar Salad with 50g of Croutons
