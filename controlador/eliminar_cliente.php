<?php
require 'db_conexion.php';

$conn = get_db_connection();

// Se espera recibir el RUT del cliente a través del método POST
$rut = isset($_POST['rut']) ? $_POST['rut'] : null;

$response = array();

if ($rut) {
    // Preparar la consulta SQL para eliminar el cliente
    $stmt = $conn->prepare("DELETE FROM clientes WHERE rut = ?");
    $stmt->bind_param("s", $rut);

    // Ejecutar la consulta
    if ($stmt->execute()) {
        // Verificar si la eliminación afectó alguna fila
        if ($stmt->affected_rows > 0) {
            $response['success'] = "Cliente eliminado correctamente.";
        } else {
            $response['error'] = "No se encontró el cliente con el RUT especificado.";
        }
    } else {
        http_response_code(500);
        $response['error'] = "Error al eliminar el cliente.";
    }

    $stmt->close();
} else {
    http_response_code(400);
    $response['error'] = "No se proporcionó un RUT válido.";
}

$conn->close();

echo json_encode($response);
?>
