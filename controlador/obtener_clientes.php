<?php
require 'db_conexion.php';

$conn = get_db_connection();

$response = array();

$result = $conn->query("SELECT * FROM clientes");
if ($result) {
    while ($row = $result->fetch_assoc()) {
        $response[] = $row;
    }
    echo json_encode($response);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Error al obtener los clientes"]);
}

$conn->close();
?>
