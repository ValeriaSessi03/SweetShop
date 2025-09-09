-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 09, 2025 at 07:44 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `biscotti_shop`
--

-- --------------------------------------------------------

--
-- Table structure for table `favorites`
--

CREATE TABLE `favorites` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `image`) VALUES
(1, 'Biscotti al cioccolato', 'Deliziosi biscotti artigianali', 3.99, 'cioccolato.jpg'),
(2, 'Biscotti al burro', 'Classici e friabili', 2.99, 'burro.jpg'),
(3, 'Biscotti con gocce al cioccolato', 'Un delizioso biscotto ripieno di irresistibili pezzi di cioccolato fondente', 4.99, 'chocolate_chip.jpg'),
(4, 'Biscotto alle fragole', 'Un caldo biscotto farcito con la nostra marmellata di fragole, una leggera glassa di fragole e fragole fresche a dadini.', 5.99, 'strawberry.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `comment` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `user_id`, `product_id`, `rating`, `comment`, `created_at`) VALUES
(1, 5, 4, 5, 'Molto buoni', '2025-08-27 09:33:57'),
(2, 7, 4, 3, 'Così così\n', '2025-08-27 09:40:18');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`) VALUES
(1, 'Valeria', 'sessivaleria03@gmail.com', '$2b$10$q12I11mafDqPrtHBcaXdtOQ.lFNNaIXLHYPwcE4OcJzv2fu6sHFeK'),
(3, 'Olga', 'olga@gmail.com', '$2b$10$08Ypgr1csx1pJU06XO1SQO4zE..EHEryDUj95pstimGX/DXjU3xqm'),
(5, 'valeria', 'valeria@gmail.com', '$2b$10$JzOJeWaGro6gKS2Xd21S9OuZNYyWj42Hm5PtyKXm4rHR0AbOKAhkC'),
(6, 'Ricardo', 'ricardo@gmail.com', '$2b$10$v90u1PPxsJ3KKVbsWLlLMecKt/uUh7M14e.BcJAcKNX2CiDbBeHpK'),
(7, 'Francesca', 'francesca@gmail.com', '$2b$10$XAmGDVR.zvrNItkaxvX/kOdHBCpRq4ECnxoZPgUGDGm/FdqBEI496'),
(8, 'ida', 'ida@gmail.com', '$2b$10$O2w.18C8D/t1/87R2hQ81.Wogj83S8hXgDgW/M9TWVx5j/W5Aml/2'),
(9, 'gino', 'gino@gmail.com', '$2b$10$9tf7d7Y7nmAytjRgvR7H1en6u98ZAfh5MsN2FVicJVJ4Moh5OLfmq'),
(10, 'Nina', 'nina@gmail.com', '$2b$10$zyMDcB5yX0IXqEMZyqES7OM6C2fKwytzarTU18NPoSr37M7Hs.q.a'),
(11, 'Veronica', 'veronica@gmail.com', '$2b$10$nEjjFzTzh5Meaz/rATfV9el0owDlaiA68oJqLc8eIVUNbAMxju8VW'),
(17, 'Nav', 'nav@gmail.com', '$2b$10$IFNazaj3FFioCF./94/za.44zM8tmbUOJa.Ij8rghSNaEMNNWgbYK');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `favorites`
--
ALTER TABLE `favorites`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `favorites_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `favorites_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
