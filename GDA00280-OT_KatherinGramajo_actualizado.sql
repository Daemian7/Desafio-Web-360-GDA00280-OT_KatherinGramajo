--crear base de datos 
CREATE DATABASE Tienda_GDA00280_OT_KatherinGramajo;
GO

use Tienda_GDA00280_OT_KatherinGramajo;


--crear las tablas 
CREATE TABLE estados (
idestados INT PRIMARY KEY,
nombre VARCHAR(45) NOT NULL
);

CREATE TABLE rol (
idrol INT PRIMARY KEY,
nombre VARCHAR(45) not null
);

CREATE TABLE Clientes (
idClientes INT PRIMARY KEY,
razon_social VARCHAR(245) not null,
nombre_comercial VARCHAR(345) not null,
direccion_entrega VARCHAR(45),
telefono VARCHAR(45),
email VARCHAR(45)
);

CREATE TABLE usuarios (
idusuarios INT PRIMARY KEY,
rol_idrol INT not null,
estados_idestados INT not null,
correo_electronico VARCHAR(45) not null,
nombre_completo VARCHAR(45) not null,
password VARCHAR(45) not null,
telefono VARCHAR(45),
fecha_nacimiento DATE,
fecha_creacion DATETIME NOT NULL,
Clientes_idClientes INT,
foreign key (rol_idrol) references rol(idrol),
foreign key (estados_idestados) references estados(idestados),
foreign key (Clientes_idClientes) references Clientes(idClientes)
);

CREATE TABLE CategoriaProductos (
idCategoriaProductos INT PRIMARY KEY,
usuarios_idusuarios INT NOT NULL,
nombre VARCHAR(45) NOT NULL,
estados_idestados INT NOT NULL,
fecha_creacion DATETIME NOT NULL,
FOREIGN KEY (usuarios_idusuarios) REFERENCES usuarios(idusuarios),
FOREIGN KEY (estados_idestados) REFERENCES estados(idestados)
);

CREATE TABLE Productos (
idProductos INT PRIMARY KEY,
CategoriaProductos_idCategoriaProductos INT NOT NULL,
usuarios_idusuarios INT NOT NULL,
nombre VARCHAR(45) NOT NULL,
marca VARCHAR(45),
codigo VARCHAR(45),
stock FLOAT NOT NULL,
estados_idestados INT NOT NULL,
precio FLOAT NOT NULL,
fecha_creacion DATETIME NOT NULL,
foto VARBINARY(MAX),
FOREIGN KEY (CategoriaProductos_idCategoriaProductos) REFERENCES CategoriaProductos(idCategoriaProductos),
FOREIGN KEY (usuarios_idusuarios) REFERENCES usuarios(idusuarios),
FOREIGN KEY (estados_idestados) REFERENCES estados(idestados)
);

CREATE TABLE Orden (
idOrden INT PRIMARY KEY,
usuarios_idusuarios INT NOT NULL,
estados_idestados INT NOT NULL,
fecha_creacion DATETIME NOT NULL,
nombre_completo VARCHAR(45),
direccion VARCHAR(545),
telefono VARCHAR(45),
correo_electronico VARCHAR(45),
fecha_entrega DATE,
total_orden FLOAT NOT NULL,
FOREIGN KEY (usuarios_idusuarios) REFERENCES usuarios(idusuarios),
FOREIGN KEY (estados_idestados) REFERENCES estados(idestados)
);

CREATE TABLE OrdenDetalles (
idOrdenDetalles INT PRIMARY KEY,
Orden_idOrden INT NOT NULL,
Productos_idProductos INT NOT NULL,
cantidad INT NOT NULL,
precio FLOAT NOT NULL,
subtotal FLOAT NOT NULL,
FOREIGN KEY (Orden_idOrden) REFERENCES Orden(idOrden),
FOREIGN KEY (Productos_idProductos) REFERENCES Productos(idProductos)
);


--procedimientos almacenados 
CREATE PROCEDURE InsertarUsuario
    @idusuarios INT,
    @rol_idrol INT,
    @estados_idestados INT,
    @correo_electronico VARCHAR(45),
    @nombre_completo VARCHAR(100),
    @password VARCHAR(255),
    @telefono VARCHAR(45),
    @fecha_nacimiento DATE,
    @fecha_creacion DATETIME,
    @Clientes_idClientes INT
AS
BEGIN
    INSERT INTO usuarios (
        idusuarios, 
        rol_idrol, 
        estados_idestados, 
        correo_electronico, 
        nombre_completo, 
        password, 
        telefono, 
        fecha_nacimiento, 
        fecha_creacion, 
        Clientes_idClientes
    )
    VALUES (
        @idusuarios, 
        @rol_idrol, 
        @estados_idestados, 
        @correo_electronico, 
        @nombre_completo, 
        @password, 
        @telefono, 
        @fecha_nacimiento, 
        @fecha_creacion, 
        @Clientes_idClientes
    );
END;




CREATE PROCEDURE InactivarProducto
@idProducto INT,
@idEstado INT
AS
BEGIN
UPDATE Productos
SET estados_idestados = @idEstado
WHERE idProductos = @idProducto;
END;






CREATE PROCEDURE ActualizarCliente
@idCliente INT,
@razon_social VARCHAR(245),
@nombre_comercial VARCHAR(345),
@direccion_entrega VARCHAR(45),
@telefono VARCHAR(45),
@email VARCHAR(45)
AS
BEGIN
UPDATE Clientes
SET razon_social = @razon_social,
nombre_comercial = @nombre_comercial,
direccion_entrega = @direccion_entrega,
telefono = @telefono,
email = @email
WHERE idClientes = @idCliente;
END;
GO






CREATE PROCEDURE InsertarEstado
@idestados INT,
@nombre VARCHAR(45)
AS
BEGIN
INSERT INTO estados (idestados, nombre)
VALUES (@idestados, @nombre);
END;


EXEC InsertarEstado @idestados = 1, @nombre = 'Activo';
EXEC InsertarEstado @idestados = 2, @nombre = 'Inactivo';


CREATE PROCEDURE InsertarRol
@idrol INT,
@nombre VARCHAR(45)
AS
BEGIN
INSERT INTO rol (idrol, nombre)
VALUES (@idrol, @nombre);
END;



EXEC InsertarRol @idrol = 1, @nombre = 'Opertivo';
EXEC InsertarRol @idrol = 2, @nombre = 'Cliente';

select * from estados

CREATE PROCEDURE InsertarCliente
@idClientes INT,
@razon_social VARCHAR(245),
@nombre_comercial VARCHAR(245),
@direccion_entrega VARCHAR(45),
@telefono VARCHAR(45),
@email VARCHAR(45)
AS
BEGIN
INSERT INTO clientes (idClientes, razon_social, nombre_comercial, direccion_entrega, telefono, email)
VALUES (@idClientes, @razon_social, @nombre_comercial, @direccion_entrega, @telefono, @email);
END;




EXEC InsertarCliente 
@idClientes = 1, 
@razon_social = 'Empresa JayJay S.A.', 
@nombre_comercial = 'JayJay Comercial', 
@direccion_entrega = 'Calle Principal, Ciudad de Guatemala', 
@telefono = '12345678', 
@email = 'jaybguate@jayjay.com';

EXEC InsertarCliente 
    @idClientes = 2, 
    @razon_social = 'Tech Innovadores', 
    @nombre_comercial = 'Tech Innova', 
    @direccion_entrega = 'Avenida 10, Zona 1, Quetzaltenango', 
    @telefono = '87654321', 
    @email = 'info@techinnova.com';





CREATE PROCEDURE InsertarProducto
    @idProductos INT,
    @CategoriaProductos_idCategoriaProductos INT,
    @usuarios_idusuarios INT,
    @nombre VARCHAR(45),
    @marca VARCHAR(45),
    @codigo VARCHAR(45),
    @stock FLOAT,
    @estados_idestados INT,
    @precio FLOAT,
    @fecha_creacion DATETIME,
    @foto VARBINARY(MAX)
AS
BEGIN
    INSERT INTO Productos (
        idProductos, 
        CategoriaProductos_idCategoriaProductos, 
        usuarios_idusuarios, 
        nombre, 
        marca, 
        codigo, 
        stock, 
        estados_idestados, 
        precio, 
        fecha_creacion, 
        foto
    )
    VALUES (
        @idProductos, 
        @CategoriaProductos_idCategoriaProductos, 
        @usuarios_idusuarios, 
        @nombre, 
        @marca, 
        @codigo, 
        @stock, 
        @estados_idestados, 
        @precio, 
        @fecha_creacion, 
        @foto
    );
END;



EXEC InsertarProducto 
    @idProductos = 5, 
    @CategoriaProductos_idCategoriaProductos = 2, 
    @usuarios_idusuarios = 1, 
    @nombre = 'Tablet Lenovo', 
    @marca = 'Lenovo', 
    @codigo = 'TL-2024', 
    @stock = 20, 
    @estados_idestados = 1, 
    @precio = 4500.75, 
    @fecha_creacion = '2024-12-01', 
    @foto = NULL;


	EXEC InsertarProducto 
    @idProductos = 6, 
    @CategoriaProductos_idCategoriaProductos = 2, 
    @usuarios_idusuarios = 1, 
    @nombre = 'Yogurt de fresa', 
    @marca = 'Lala', 
    @codigo = 'YL-001', 
    @stock = 20, 
    @estados_idestados = 1, 
    @precio = 4.75, 
    @fecha_creacion = '2024-12-01', 
    @foto = NULL;



INSERT INTO CategoriaProductos (idCategoriaProductos, usuarios_idusuarios, nombre, estados_idestados, fecha_creacion)
VALUES 
(1, 1, 'Electrónica', 1, '2024-12-04'),
(2, 1, 'Ropa', 1, '2024-12-04');
(3, 1, 'Lacteos', 1, '2024-12-04');



EXEC InsertarUsuario 
    @idusuarios = 1,
    @rol_idrol = 1,
    @estados_idestados = 1,
    @correo_electronico = 'usuario1@ejemplo.com',
    @nombre_completo = 'Juan Pérez',
    @password = 'password123',
    @telefono = '5551234567',
    @fecha_nacimiento = '1990-05-15',
    @fecha_creacion = '2024-12-04',
    @Clientes_idClientes = NULL; 


	EXEC InsertarUsuario 
    @idusuarios = 2,
    @rol_idrol = 2,
    @estados_idestados = 1,
    @correo_electronico = 'usuario2@ejemplo.com',
    @nombre_completo = 'Ana López',
    @password = 'securePass2024',
    @telefono = '5559876543',
    @fecha_nacimiento = '1985-07-20',
    @fecha_creacion = '2024-12-04',
    @Clientes_idClientes = 1; 


	CREATE PROCEDURE InsertarOrden
    @idOrden INT,
    @usuarios_idusuarios INT,
    @estados_idestados INT,
    @fecha_creacion DATETIME,
    @direccion VARCHAR(545),
    @telefono VARCHAR(45),
    @correo_electronico VARCHAR(45),
    @fecha_entrega DATE,
    @total_orden FLOAT
AS
BEGIN
    INSERT INTO orden (idOrden, usuarios_idusuarios, estados_idestados, fecha_creacion, direccion, telefono, correo_electronico, fecha_entrega, total_orden)
    VALUES (@idOrden, @usuarios_idusuarios, @estados_idestados, @fecha_creacion, @direccion, @telefono, @correo_electronico, @fecha_entrega, @total_orden);
END;




EXEC InsertarOrden 
    @idOrden = 1, 
    @usuarios_idusuarios = 2, 
    @estados_idestados = 1, 
    @fecha_creacion = '2024-12-3', 
    @direccion = 'Zona 1, Ciudad de Guatemala', 
    @telefono = '23223458', 
    @correo_electronico = 'cliente1@gmail.com', 
    @fecha_entrega = '2024-12-8', 
    @total_orden = 30.50;




CREATE PROCEDURE InsertarOrdenDetalle
    @idOrdenDetalles INT,
    @Orden_idOrden INT,
    @Productos_idProductos INT,
    @cantidad INT,
    @precio FLOAT,
    @subtotal FLOAT
AS
BEGIN
    INSERT INTO OrdenDetalles (idOrdenDetalles, Orden_idOrden, Productos_idProductos, cantidad, precio, subtotal)
    VALUES (@idOrdenDetalles, @Orden_idOrden, @Productos_idProductos, @cantidad, @precio, @subtotal);
END;



EXEC InsertarOrdenDetalle 
    @idOrdenDetalles = 1, 
    @Orden_idOrden = 1, 
    @Productos_idProductos = 6, 
    @cantidad = 1, 
    @precio = 30.50, 
    @subtotal = 30.50;

EXEC InsertarOrdenDetalle 
    @idOrdenDetalles = 2, 
    @Orden_idOrden = 1, 
    @Productos_idProductos = 6, 
    @cantidad = 1, 
    @precio = 15.00, 
    @subtotal = 15.00;


select * from Productos
select * from usuarios
select * from Clientes
select * from CategoriaProductos
select * from Orden
select * from OrdenDetalles
select * from rol
select * from estados


CREATE PROCEDURE ActualizarProducto
@idProductos INT, -- Identificador del producto que se desea actualizar
@CategoriaProductos_idCategoriaProductos INT = NULL, -- Nuevo valor o NULL si no se desea cambiar
@usuarios_idusuarios INT = NULL,
@nombre VARCHAR(45) = NULL,
@marca VARCHAR(45) = NULL,
@codigo VARCHAR(45) = NULL,
@stock FLOAT = NULL,
@estados_idestados INT = NULL,
@precio FLOAT = NULL,
@fecha_creacion DATETIME = NULL,
@foto VARBINARY(MAX) = NULL
AS
BEGIN
UPDATE Productos
SET 
CategoriaProductos_idCategoriaProductos = ISNULL(@CategoriaProductos_idCategoriaProductos, CategoriaProductos_idCategoriaProductos),
usuarios_idusuarios = ISNULL(@usuarios_idusuarios, usuarios_idusuarios),
nombre = ISNULL(@nombre, nombre),
marca = ISNULL(@marca, marca),
codigo = ISNULL(@codigo, codigo),
stock = ISNULL(@stock, stock),
estados_idestados = ISNULL(@estados_idestados, estados_idestados),
precio = ISNULL(@precio, precio),
fecha_creacion = ISNULL(@fecha_creacion, fecha_creacion),
foto = ISNULL(@foto, foto)
WHERE idProductos = @idProductos;
END;


EXEC ActualizarProducto 
    @idProductos = 5,
    @nombre = 'Cafe Instantaneo',
    @precio = 13.50,
	@marca = 'Nescafe';


EXEC ActualizarProducto 
 @idProductos = 6,
 @estados_idestados = 2;




 EXEC ActualizarCliente
    @idCliente = 2,
    @razon_social = 'Comercializadora Global S.A.',
    @nombre_comercial = 'Global Trade',
    @direccion_entrega = 'Zona 1, Ciudad de Guatemala',
    @telefono = '5551234567',
    @email = 'contacto@globaltrade.com';





alter PROCEDURE InsertarProducto
    @idProductos INT,
    @CategoriaProductos_idCategoriaProductos INT,
    @usuarios_idusuarios INT,
    @nombre VARCHAR(45),
    @marca VARCHAR(45),
    @codigo VARCHAR(45),
    @stock FLOAT,
    @estados_idestados INT,
    @precio FLOAT,
    @fecha_creacion DATETIME,
    @foto VARBINARY(MAX) = NULL -- Asignar valor NULL por defecto
AS
BEGIN
    INSERT INTO Productos (
        idProductos, 
        CategoriaProductos_idCategoriaProductos, 
        usuarios_idusuarios, 
        nombre, 
        marca, 
        codigo, 
        stock, 
        estados_idestados, 
        precio, 
        fecha_creacion, 
        foto
    )
    VALUES (
        @idProductos, 
        @CategoriaProductos_idCategoriaProductos, 
        @usuarios_idusuarios, 
        @nombre, 
        @marca, 
        @codigo, 
        @stock, 
        @estados_idestados, 
        @precio, 
        @fecha_creacion, 
        COALESCE(@foto, NULL) -- Usar COALESCE para garantizar que si foto es NULL se inserte como NULL
    );
END;


ALTER TABLE usuarios
ALTER COLUMN password VARCHAR(255);


CREATE PROCEDURE ActualizarUsuario
    @idusuarios INT,
    @rol_idrol INT,
    @estados_idestados INT,
    @correo_electronico VARCHAR(45),
    @nombre_completo VARCHAR(100),
    @password VARCHAR(255), -- Este campo es para la contraseña encriptada
    @telefono VARCHAR(45),
    @fecha_nacimiento DATE,
    @fecha_creacion DATETIME,
    @Clientes_idClientes INT
AS
BEGIN
    UPDATE usuarios
    SET 
        rol_idrol = @rol_idrol,
        estados_idestados = @estados_idestados,
        correo_electronico = @correo_electronico,
        nombre_completo = @nombre_completo,
        password = @password, -- Asegúrate de pasar la contraseña ya encriptada
        telefono = @telefono,
        fecha_nacimiento = @fecha_nacimiento,
        fecha_creacion = @fecha_creacion,
        Clientes_idClientes = @Clientes_idClientes
    WHERE idusuarios = @idusuarios;
END;


CREATE PROCEDURE ActualizarOrden
    @idOrden INT,  -- ID de la orden a actualizar
    @usuarios_idusuarios INT,  -- ID del usuario asociado a la orden
    @estados_idestados INT,  -- Estado de la orden
    @fecha_creacion DATETIME,  -- Fecha de creación de la orden
    @direccion VARCHAR(545),  -- Dirección de entrega
    @telefono VARCHAR(45),  -- Teléfono de contacto
    @correo_electronico VARCHAR(45),  -- Correo electrónico de contacto
    @fecha_entrega DATE,  -- Fecha de entrega
    @total_orden FLOAT  -- Total de la orden
AS
BEGIN
    UPDATE orden
    SET 
        usuarios_idusuarios = @usuarios_idusuarios,
        estados_idestados = @estados_idestados,
        fecha_creacion = @fecha_creacion,
        direccion = @direccion,
        telefono = @telefono,
        correo_electronico = @correo_electronico,
        fecha_entrega = @fecha_entrega,
        total_orden = @total_orden
    WHERE idOrden = @idOrden;
END;


CREATE PROCEDURE ObtenerOrdenes
AS
BEGIN
    SELECT * FROM orden;
END;

CREATE PROCEDURE ObtenerOrdenPorId
    @idOrden INT
AS
BEGIN
    SELECT * FROM orden WHERE idOrden = @idOrden;
END;


select * from Orden


CREATE PROCEDURE InsertarCategoriaProducto
    @idCategoriaProductos INT,
    @usuarios_idusuarios INT,
    @nombre VARCHAR(100),
    @estados_idestados INT,
    @fecha_creacion DATETIME
AS
BEGIN
    INSERT INTO CategoriaProductos (
        idCategoriaProductos, 
        usuarios_idusuarios, 
        nombre, 
        estados_idestados, 
        fecha_creacion
    )
    VALUES (
        @idCategoriaProductos, 
        @usuarios_idusuarios, 
        @nombre, 
        @estados_idestados, 
        @fecha_creacion
    );
END;


CREATE PROCEDURE ObtenerCategoriasProductos
AS
BEGIN
    SELECT * 
    FROM CategoriaProductos;
END;


CREATE PROCEDURE ObtenerCategoriaProductoPorId
    @idCategoriaProductos INT
AS
BEGIN
    SELECT *
    FROM CategoriaProductos
    WHERE idCategoriaProductos = @idCategoriaProductos;
END;


CREATE PROCEDURE ActualizarCategoriaProducto
    @idCategoriaProductos INT,
    @usuarios_idusuarios INT,
    @nombre VARCHAR(100),
    @estados_idestados INT,
    @fecha_creacion DATETIME
AS
BEGIN
    UPDATE CategoriaProductos
    SET 
        usuarios_idusuarios = @usuarios_idusuarios,
        nombre = @nombre,
        estados_idestados = @estados_idestados,
        fecha_creacion = @fecha_creacion
    WHERE 
        idCategoriaProductos = @idCategoriaProductos;
END;


CREATE PROCEDURE ObtenerEstados
AS
BEGIN
    SELECT idestados, nombre
    FROM estados;
END;

CREATE PROCEDURE ObtenerEstadoPorId
    @idestados INT
AS
BEGIN
    SELECT idestados, nombre
    FROM estados
    WHERE idestados = @idestados;
END;


CREATE PROCEDURE ActualizarEstado
    @idestados INT,
    @nombre VARCHAR(45)
AS
BEGIN
    UPDATE estados
    SET nombre = @nombre
    WHERE idestados = @idestados;
END;


CREATE PROCEDURE ObtenerOrdenDetalles
AS
BEGIN
    SELECT idOrdenDetalles, Orden_idOrden, Productos_idProductos, cantidad, precio, subtotal
    FROM OrdenDetalles;
END;


CREATE PROCEDURE ObtenerOrdenDetallePorId
    @idOrdenDetalles INT
AS
BEGIN
    SELECT idOrdenDetalles, Orden_idOrden, Productos_idProductos, cantidad, precio, subtotal
    FROM OrdenDetalles
    WHERE idOrdenDetalles = @idOrdenDetalles;
END;


CREATE PROCEDURE ActualizarOrdenDetalle
    @idOrdenDetalles INT,
    @Orden_idOrden INT,
    @Productos_idProductos INT,
    @cantidad INT,
    @precio FLOAT,
    @subtotal FLOAT
AS
BEGIN
    UPDATE OrdenDetalles
    SET 
        Orden_idOrden = @Orden_idOrden,
        Productos_idProductos = @Productos_idProductos,
        cantidad = @cantidad,
        precio = @precio,
        subtotal = @subtotal
    WHERE idOrdenDetalles = @idOrdenDetalles;
END;




	--vistas finales para las tablas 

CREATE VIEW TotalProductosActivosConStock AS
SELECT COUNT(*) AS TotalProductos
FROM Productos
WHERE estados_idestados = 1 AND stock > 0;


SELECT * FROM TotalProductosActivosConStock;


CREATE VIEW TotalQuetzalesEnAgosto2024 AS
SELECT SUM(o.total_orden) AS TotalQuetzales
FROM Orden o
WHERE MONTH(o.fecha_creacion) = 8 AND YEAR(o.fecha_creacion) = 2024;

SELECT * FROM TotalQuetzalesEnAgosto2024;


CREATE VIEW Top10ClientesMayorConsumo AS
SELECT 
    c.idClientes,
    c.razon_social,
    c.nombre_comercial,
    SUM(o.total_orden) AS TotalConsumo
FROM Clientes c
INNER JOIN Orden o ON c.idClientes = o.usuarios_idusuarios
GROUP BY c.idClientes, c.razon_social, c.nombre_comercial
ORDER BY TotalConsumo DESC
OFFSET 0 ROWS FETCH NEXT 10 ROWS ONLY;


SELECT * FROM Top10ClientesMayorConsumo;


CREATE VIEW Top10ProductosMasVendidos AS
SELECT 
    p.idProductos,
    p.nombre,
    SUM(od.cantidad) AS TotalVendidos
FROM Productos p
INNER JOIN OrdenDetalles od ON p.idProductos = od.Productos_idProductos
GROUP BY p.idProductos, p.nombre
ORDER BY TotalVendidos ASC
OFFSET 0 ROWS FETCH NEXT 10 ROWS ONLY;


SELECT * FROM Top10ProductosMasVendidos;



