-- Sentencia 1: Escribe la sentencia SQL para traer todos los productos con toda su información.
SELECT * FROM Products;
-- Sentencia 2: Escribe la sentencia SQL para traer todos los productos desplegando solo el nombre y el precio unitario.
SELECT ProductName, UnitPrice FROM Products;
-- Sentencia 3: Escribe la sentencia SQL para traer solo los productos descontinuados.
SELECT Discontinued FROM Products
WHERE Discontinued = '1';
-- Sentencia 4: Escribe la sentencia SQL para traer todos los productos ordenados por precio unitario de más caro a más barato.
SELECT * FROM Products
ORDER BY UnitPrice DESC;
-- Sentencia 5: Escribe la sentencia SQL para traer los empleados que viven en 'USA'
SELECT Country FROM Employees
WHERE Country = 'USA';
-- Sentencia 6: Escribe la sentencia SQL para traer al empleado con ID igual a 5
SELECT EmployeeID FROM Employees
Where EmployeeID = 5; 
-- Sentencia 7: Escribe la sentencia SQL para traer todas las órdenes de compra que se hayan hecho en 'France' y 'Belgium'
SELECT * FROM Orders
WHERE ShipCountry IN ('France', 'Belgium');
-- Sentencia 8: Escribe la sentencia SQL para traer el total de clientes que hay para cada 'ContactTitle'
SELECT ContactTitle, COUNT(*) AS TotalClientes
FROM Customers
GROUP BY ContactTitle;