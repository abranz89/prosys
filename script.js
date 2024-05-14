$(document).ready(function() {
    // Formatear el RUT mientras se escribe
    $('#rut').on('input', function() {
        this.value = formatearRUT(this.value);
    });

    // Cargar la lista de clientes al cargar la página
    cargarClientes();

    // Manejar el envío del formulario
    $('#clienteForm').on('submit', function(event) {
        event.preventDefault();

        var rutValido = validarRUT($('#rut').val());
        var form = this;

        if (form.checkValidity() === false || !rutValido) {
            event.stopPropagation();
            $(form).addClass('was-validated');

            if (!rutValido) {
                $('#rut').addClass('is-invalid');
                $('#rut').removeClass('is-valid');
            } else {
                $('#rut').removeClass('is-invalid');
                $('#rut').addClass('is-valid');
            }

            return;
        } else {
            $('#rut').addClass('is-valid');
            $('#rut').removeClass('is-invalid');
        }

        var formData = {
            rut: $('#rut').val(),
            nombre: $('#nombre').val(),
            sexo: $('input[name="sexo"]:checked').val(),
            tipoCliente: $('#tipoCliente').val(),
            fechaNacimiento: $('#fechaNacimiento').val()
        };

        $.ajax({
            url: 'controlador/insertar_cliente.php',
            type: 'POST',
            data: formData,
            success: function(response) {
                alert('Cliente insertado correctamente');
                $('#clienteForm')[0].reset();
                $('#clienteForm').removeClass('was-validated');
                $('#rut').removeClass('is-valid is-invalid');

                actualizarTablaClientes(JSON.parse(response));
            },
            error: function() {
                alert('Error al insertar el cliente');
            }
        });
    });
});

function cargarClientes() {
    $.ajax({
        url: 'controlador/obtener_clientes.php',
        type: 'GET',
        success: function(response) {
            actualizarTablaClientes(JSON.parse(response));
        },
        error: function() {
            alert('Error al cargar los clientes');
        }
    });
}

function validarRUT(rut) {
    rut = rut.replace(/\./g, '').replace(/-/g, '');
    if (!/^[0-9]+[0-9kK]{1}$/.test(rut)) {
        return false;
    }

    const cuerpo = rut.slice(0, -1);
    const dv = rut.slice(-1).toLowerCase();
    let suma = 0;
    let multiplo = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += parseInt(cuerpo[i]) * multiplo;
        multiplo = multiplo == 7 ? 2 : multiplo + 1;
    }

    const dvEsperado = 11 - (suma % 11);
    const dvCalculado = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'k' : dvEsperado.toString();

    return dv === dvCalculado;
}

function formatearRUT(rut) {
    rut = rut.replace(/\./g, '').replace(/-/g, '');
    if (rut.length <= 1) return rut;

    const cuerpo = rut.slice(0, -1).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const dv = rut.slice(-1);

    return `${cuerpo}-${dv}`;
}

function actualizarTablaClientes(clientes) {
    const tbody = $('#clientesTable tbody');
    tbody.empty();

    clientes.forEach(cliente => {
        const row = `
            <tr>
                <td>${cliente.rut}</td>
                <td>${cliente.nombre}</td>
                <td>${cliente.sexo}</td>
                <td>${cliente.tipoCliente}</td>
                <td>${cliente.fechaNacimiento}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="modificarCliente('${cliente.rut}')">Modificar</button>
                    <button class="btn btn-danger btn-sm" onclick="eliminarCliente('${cliente.rut}')">Eliminar</button>
                </td>
            </tr>`;
        tbody.append(row);
    });
}

function eliminarCliente(rut) {
    if(confirm("¿Estás seguro de querer eliminar este cliente?")) {
        $.ajax({
            url: 'controlador/eliminar_cliente.php',
            type: 'POST',
            data: { rut: rut },
            success: function(response) {
                alert('Cliente eliminado correctamente');
                cargarClientes(); // Recargar lista de clientes
            },
            error: function() {
                alert('Error al eliminar el cliente');
            }
        });
    }
}
