# Prueba tecnica PHP

## Instrucciones

### 1. Crear la base de datos

```sql
CREATE DATABASE IF NOT EXISTS prosys_db;
USE prosys_db;

CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    rut VARCHAR(12) NOT NULL UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    sexo ENUM('M', 'F') NOT NULL,
    tipoCliente ENUM('Regular', 'Medio', 'Bajo') NOT NULL,
    fechaNacimiento DATE NOT NULL
);
```
### 2. Configura la base de datos:
    - Abre el archivo `db_conexion.php` en el directorio `controlador/`.
    - Modifica las variables `$servername`, `$username`, `$password` y `$dbname` con los datos de tu servidor de base de datos.