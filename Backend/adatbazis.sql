-- Adatbázis
CREATE DATABASE IF NOT EXISTS Adatbazis;
USE Adatbazis;

-- Felhasználók adatai
CREATE TABLE IF NOT EXISTS Users (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(50) NOT NULL UNIQUE,
    Email VARCHAR(100) NOT NULL UNIQUE,
    PasswordHash VARCHAR(255) NOT NULL,
    CreatedAt TIMESTAMP NOT NULL
);

INSERT INTO Users (Username, Email, PasswordHash, CreatedAt)
VALUES 
('Kovács', 'kovacsbence@example.com', 'hashedpassword6', CURRENT_TIMESTAMP),
('Nagy', 'nagyreka@example.com', 'hashedpassword7', CURRENT_TIMESTAMP),
('Tóth', 'tothlaszlo@example.com', 'hashedpassword8', CURRENT_TIMESTAMP),
('Szabó', 'szaboanna@example.com', 'hashedpassword9', CURRENT_TIMESTAMP),
('Kiss', 'kissistvan@example.com', 'hashedpassword10', CURRENT_TIMESTAMP);

-- Könyvtár
CREATE TABLE IF NOT EXISTS Library (
    LibraryID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- Elemek táblája
CREATE TABLE IF NOT EXISTS Item (
    ItemID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(50) NOT NULL,
    Description VARCHAR(2000) NOT NULL,
    Price DECIMAL(10, 2) NOT NULL,
    Available BOOLEAN NOT NULL
);
