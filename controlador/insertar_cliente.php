<?php
require 'db_conexion.php';

$conn = get_db_connection();

$rut = $_POST['rut'];
$nombre = $_POST['nombre'];
$sexo = $_POST['sexo'];
$tipoCliente = $_POST['tipoCliente'];
$fechaNacimiento = $_POST['fechaNacimiento'];

$stmt = $conn->prepare("INSERT INTO clientes (rut, nombre, sexo, tipoCliente, fechaNacimiento) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sssss", $rut, $nombre, $sexo, $tipoCliente, $fechaNacimiento);

if ($stmt->execute()) {
    $response = array();

    $result = $conn->query("SELECT * FROM clientes");
    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $response[] = $row;
        }
        echo json_encode($response);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Error al obtener los clientes después de insertar"]);
    }
} else {
    http_response_code(500);
    echo json_encode(["error" => "Error al insertar el cliente"]);
}

$stmt->close();
$conn->close();
?>
