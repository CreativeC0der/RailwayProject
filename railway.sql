-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 15, 2023 at 09:07 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `railway`
--

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `booking_id` int(11) NOT NULL,
  `train_number` int(11) DEFAULT NULL,
  `journey_date` date DEFAULT NULL,
  `fare` float DEFAULT NULL,
  `acc_num` int(11) DEFAULT NULL,
  `seat_type` varchar(20) NOT NULL,
  `no_of_seats` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cancellation`
--

CREATE TABLE `cancellation` (
  `cancellation_charge` int(11) DEFAULT NULL,
  `cancellation_date` int(11) DEFAULT NULL,
  `booking_id` int(11) DEFAULT NULL,
  `cancellation_id` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `passenger`
--

CREATE TABLE `passenger` (
  `name` varchar(100) DEFAULT NULL,
  `acc_num` int(20) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `phone` int(12) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `passenger`
--

INSERT INTO `passenger` (`name`, `acc_num`, `email`, `phone`, `address`) VALUES
('admin', 0, 'admin@gmail.com', 12345678, 'admin r bari'),
('sumon', 3, '011sumon@gmail.com', 2147483647, 'bokkhali'),
('shrijon', 4, 'shirjon0133@gmail.com', 2147483647, 'behala'),
('tuhin', 5, 'tuhin301201@gmail.com', 2147483647, 'canning');

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `payment_mode` varchar(10) DEFAULT NULL,
  `payment_id` int(11) NOT NULL,
  `amount` float DEFAULT NULL,
  `payment_status` varchar(10) DEFAULT NULL,
  `booking_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `seat_inventory`
--

CREATE TABLE `seat_inventory` (
  `fare` float DEFAULT NULL,
  `available_seats` int(20) NOT NULL,
  `seat_type` varchar(20) NOT NULL,
  `train_number` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `seat_inventory`
--

INSERT INTO `seat_inventory` (`fare`, `available_seats`, `seat_type`, `train_number`) VALUES
(800, 43, '3A', 6969),
(500, 96, 'SL', 6969),
(200, 100, 'ECONOMY', 11111),
(2000, 93, '1A', 12345),
(1500, 75, '2A', 12345),
(3, 100, 'BLABLA', 12345),
(9000, 5, 'Elite', 13456),
(3, 100, 'ECONOMY', 22222);

-- --------------------------------------------------------

--
-- Table structure for table `station`
--

CREATE TABLE `station` (
  `station_code` varchar(20) NOT NULL,
  `station_name` varchar(30) DEFAULT NULL,
  `location` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `station`
--

INSERT INTO `station` (`station_code`, `station_name`, `location`) VALUES
('A', 'A', 'A'),
('B', 'B', 'B'),
('BGB', 'Budge Budge', 'Budge Budge Junction'),
('BLY', 'Ballygunge', 'Ballygunge Junction'),
('C', 'C', 'C'),
('CANG', 'Canning', 'Canning District'),
('D', 'D', 'D'),
('SDH', 'Sealdah', 'Sealdah Junction');

-- --------------------------------------------------------

--
-- Table structure for table `train`
--

CREATE TABLE `train` (
  `destination` varchar(30) DEFAULT NULL,
  `origin` varchar(30) DEFAULT NULL,
  `train_name` varchar(30) DEFAULT NULL,
  `train_number` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `train`
--

INSERT INTO `train` (`destination`, `origin`, `train_name`, `train_number`) VALUES
('CANG', 'SDH', 'canning local', 6969),
('SDH', 'CANG', 'canning-local-2', 7979),
('B', 'A', 'A-B', 11111),
('SDH', 'BGB', 'budge-budge local', 12345),
('SDH', 'BLY', 'Ballygunge-Sealdah Local', 13456),
('A', 'B', 'B-A', 22222),
('D', 'C', 'C-D', 333333);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`booking_id`),
  ADD KEY `fk_booking` (`acc_num`),
  ADD KEY `fk_booking_train` (`train_number`);

--
-- Indexes for table `cancellation`
--
ALTER TABLE `cancellation`
  ADD PRIMARY KEY (`cancellation_id`),
  ADD KEY `fk_cancellation` (`booking_id`);

--
-- Indexes for table `passenger`
--
ALTER TABLE `passenger`
  ADD PRIMARY KEY (`acc_num`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`payment_id`),
  ADD KEY `fk_payment` (`booking_id`);

--
-- Indexes for table `seat_inventory`
--
ALTER TABLE `seat_inventory`
  ADD PRIMARY KEY (`train_number`,`seat_type`),
  ADD KEY `fk_train` (`train_number`) USING BTREE;

--
-- Indexes for table `station`
--
ALTER TABLE `station`
  ADD PRIMARY KEY (`station_code`);

--
-- Indexes for table `train`
--
ALTER TABLE `train`
  ADD PRIMARY KEY (`train_number`),
  ADD KEY `fk_dest` (`destination`),
  ADD KEY `fk_origin` (`origin`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `booking`
--
ALTER TABLE `booking`
  ADD CONSTRAINT `fk_booking` FOREIGN KEY (`acc_num`) REFERENCES `passenger` (`acc_num`),
  ADD CONSTRAINT `fk_booking_train` FOREIGN KEY (`train_number`) REFERENCES `train` (`train_number`);

--
-- Constraints for table `cancellation`
--
ALTER TABLE `cancellation`
  ADD CONSTRAINT `fk_cancellation` FOREIGN KEY (`booking_id`) REFERENCES `booking` (`booking_id`);

--
-- Constraints for table `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `fk_payment` FOREIGN KEY (`booking_id`) REFERENCES `booking` (`booking_id`) ON DELETE CASCADE;

--
-- Constraints for table `seat_inventory`
--
ALTER TABLE `seat_inventory`
  ADD CONSTRAINT `fk_seat_inventory` FOREIGN KEY (`train_number`) REFERENCES `train` (`train_number`);

--
-- Constraints for table `train`
--
ALTER TABLE `train`
  ADD CONSTRAINT `fk_dest` FOREIGN KEY (`destination`) REFERENCES `station` (`station_code`),
  ADD CONSTRAINT `fk_origin` FOREIGN KEY (`origin`) REFERENCES `station` (`station_code`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
