CREATE TABLE `users` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`user_name` varchar(255) NOT NULL,
	`user_email` varchar(255) NOT NULL UNIQUE,
	`password_hash` varchar(255) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `meals` (
	`meal_id` INT NOT NULL AUTO_INCREMENT,
	`meal_name` varchar(255),
	`meal_description` TEXT NOT NULL,
	PRIMARY KEY (`meal_id`)
);

CREATE TABLE `ingredients` (
	`ingredient_id` INT NOT NULL AUTO_INCREMENT,
	`ingredient_name` varchar(255),
	PRIMARY KEY (`ingredient_id`)
);

CREATE TABLE `meal_ingredients_link` (
	`meal_id` INT NOT NULL,
	`ingredient_id` INT NOT NULL,
	`ingredient_quantity` DECIMAL(10,2) NOT NULL,
	`ingredient_quantity_unit` INT NOT NULL,
	PRIMARY KEY (`meal_id`,`ingredient_id`)
);

CREATE TABLE `shopping_lists` (
	`shopping_list_id` INT NOT NULL AUTO_INCREMENT,
	`list_name` varchar(255) NOT NULL,
	`user_id` INT NOT NULL,
	PRIMARY KEY (`shopping_list_id`)
);

CREATE TABLE `shopping_list_items` (
	`item_id` INT NOT NULL AUTO_INCREMENT,
	`shopping_list_id` INT NOT NULL,
	`ingredient_id` INT NOT NULL,
	`item_quantity` DECIMAL(10,2) NOT NULL,
	`item_quantity_unit` varchar(20) NOT NULL,
	PRIMARY KEY (`item_id`)
);

ALTER TABLE `meal_ingredients_link` ADD CONSTRAINT `meal_ingredients_link_fk0` FOREIGN KEY (`meal_id`) REFERENCES `meals`(`meal_id`);

ALTER TABLE `meal_ingredients_link` ADD CONSTRAINT `meal_ingredients_link_fk1` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients`(`ingredient_id`);

ALTER TABLE `shopping_lists` ADD CONSTRAINT `shopping_lists_fk0` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`);

ALTER TABLE `shopping_list_items` ADD CONSTRAINT `shopping_list_items_fk0` FOREIGN KEY (`shopping_list_id`) REFERENCES `shopping_lists`(`shopping_list_id`);

ALTER TABLE `shopping_list_items` ADD CONSTRAINT `shopping_list_items_fk1` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients`(`ingredient_id`);
