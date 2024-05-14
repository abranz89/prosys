<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "prosys_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

function get_db_connection() {
    global $conn;
    return $conn;
}
?>
