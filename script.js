$(document).ready(function() {
    $('#rut').on('input', function() {
        this.value = formatearRUT(this.value);
    });

    $('#clienteForm').on('submit', function(event) {
        event.preventDefault();
        
        // Valida el formulario antes de enviarlo
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
            url: 'insertar_cliente.php',
            type: 'POST',
            data: formData,
            success: function(response) {
                alert('Cliente insertado correctamente');
                $('#clienteForm')[0].reset();
                $('#clienteForm').removeClass('was-validated');
                $('#rut').removeClass('is-valid is-invalid');
            },
            error: function() {
                alert('Error al insertar el cliente');
            }
        });
    });
});

function validarRUT(rut) {
    // Elimina los puntos y guion
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
