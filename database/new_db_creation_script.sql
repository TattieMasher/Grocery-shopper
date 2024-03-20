CREATE TABLE `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `meal` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255),
  `description` TEXT NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `ingredient` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255),
  PRIMARY KEY (`id`)
);

CREATE TABLE `meal_ingredient` (
  `meal_id` INT NOT NULL,
  `ingredient_id` INT NOT NULL,
  `quantity` DECIMAL(10,2) NOT NULL,
  `quantity_unit` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`meal_id`, `ingredient_id`),
  FOREIGN KEY (`meal_id`) REFERENCES `meal`(`id`),
  FOREIGN KEY (`ingredient_id`) REFERENCES `ingredient`(`id`)
);

CREATE TABLE `shopping_list` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255),
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `user`(`id`)
);

CREATE TABLE `shopping_list_item` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `shopping_list_id` INT NOT NULL,
  `ingredient_id` INT NOT NULL,
  `quantity` DECIMAL(10,2) NOT NULL,
  `quantity_unit` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`shopping_list_id`) REFERENCES `shopping_list`(`id`),
  FOREIGN KEY (`ingredient_id`) REFERENCES `ingredient`(`id`)
);
