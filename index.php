<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulario de Cliente</title>
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container mt-5">
        <h2>Formulario de Cliente</h2>
        <form id="clienteForm" novalidate>
            <div class="form-group">
                <label for="rut">RUT</label>
                <input type="text" class="form-control" id="rut" name="rut" required>
                <div class="invalid-feedback">Por favor, ingrese un RUT válido.</div>
            </div>
            <div class="form-group">
                <label for="nombre">Nombre</label>
                <input type="text" class="form-control" id="nombre" name="nombre" required>
                <div class="invalid-feedback">Por favor, ingrese un nombre.</div>
            </div>
            <div class="form-group">
                <label>Sexo</label><br>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="sexo" id="sexoM" value="M" required>
                    <label class="form-check-label" for="sexoM">Masculino</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="sexo" id="sexoF" value="F" required>
                    <label class="form-check-label" for="sexoF">Femenino</label>
                </div>
                <div class="invalid-feedback">Por favor, seleccione su sexo.</div>
            </div>
            <div class="form-group">
                <label for="tipoCliente">Tipo Cliente</label>
                <select class="form-control" id="tipoCliente" name="tipoCliente" required>
                    <option value="">Seleccionar...</option>
                    <option value="Regular">Regular</option>
                    <option value="Medio">Medio</option>
                    <option value="Bajo">Bajo</option>
                </select>
                <div class="invalid-feedback">Por favor, seleccione un tipo de cliente.</div>
            </div>
            <div class="form-group">
                <label for="fechaNacimiento">Fecha de Nacimiento</label>
                <input type="date" class="form-control" id="fechaNacimiento" name="fechaNacimiento" required>
                <div class="invalid-feedback">Por favor, ingrese su fecha de nacimiento.</div>
            </div>
            <button type="submit" class="btn btn-primary">Enviar</button>
        </form>

        <h2 class="mt-5">Lista de Clientes</h2>
        <table class="table table-striped" id="clientesTable">
            <thead>
                <tr>
                    <th>RUT</th>
                    <th>Nombre</th>
                    <th>Sexo</th>
                    <th>Tipo Cliente</th>
                    <th>Fecha de Nacimiento</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>

    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.bundle.min.js"></script>
    <script src="script.js"></script>
</body>
</html>
