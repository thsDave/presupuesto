
$(document).ready(function () {

	// declaración de datos predeterminados para botones principales

	$('#label_in').addClass('active');
	$('#get_in').attr( 'checked', true );

	// declaración de datos predeterminados para botones de registros

	$('#label_register_in').addClass('active');
	$('#register_in').attr( 'checked', true );

	// declaración de datos predeterminados para tablas de registros
	$('#data_ingresos').show();
	$('#data_egresos').hide();

	//Cargamos los datos de las tablas
	table_in();

	table_out();

});

// Cambios de clases y atributos para presentación de estilos -------------------------------------

$('#get_in').click(()=>{
	$('#label_out').removeClass('active');
	$('#get_out').attr( 'checked', false );

	$('#label_in').addClass('active');
	$('#get_in').attr( 'checked', true );
});

$('#get_out').click(()=>{
	$('#label_in').removeClass('active');
	$('#get_in').attr( 'checked', false );

	$('#label_out').addClass('active');
	$('#get_out').attr( 'checked', true );
});

// -------------------------------------------

$('#register_in').click(()=>{
	$('#label_register_out').removeClass('active');
	$('#register_out').attr( 'checked', false );
	$('#data_egresos').hide();

	$('#label_register_in').addClass('active');
	$('#register_in').attr( 'checked', true );
	$('#data_ingresos').show();
});

$('#register_out').click(()=>{
	$('#label_register_in').removeClass('active');
	$('#register_in').attr( 'checked', false );
	$('#data_ingresos').hide();

	$('#label_register_out').addClass('active');
	$('#register_out').attr( 'checked', true );
	$('#data_egresos').show();
});

// Creando fecha actual ----------------------------------------------------------------------------

const d = new Date();

const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

$('#fecha').html(meses[d.getMonth()] + ' ' + d.getFullYear());

// Declarando valores ------------------------------------------------------------------------------

if (!localStorage.getItem('transaccion'))
	localStorage.setItem('transaccion', 'ingresos');

if (!localStorage.getItem('registros')) {
	var data = {
		'ingresos': {
			'desc': [],
			'montos': []
		},
		egresos: {
			'desc': [],
			'montos': []
		}
	}

	localStorage.setItem('registros', JSON.stringify(data));
}else {
	var data = JSON.parse(localStorage.getItem('registros'));
}

var opcion = localStorage.getItem('transaccion');

// Declarando funciones ----------------------------------------------------------------------------

function seleccionar(val) {
	localStorage.setItem('transaccion', val);
	opcion = localStorage.getItem('transaccion');
	console.log("seleccionaste: ", opcion);
}

function guardar() {

	switch (opcion) {

		case 'ingresos':
			data.ingresos.desc.push($('#desc').val());
			data.ingresos.montos.push($('#amount').val());
			localStorage.setItem('registros', JSON.stringify(data));
		break;

		case 'egresos':
			data.egresos.desc.push($('#desc').val());
			data.egresos.montos.push($('#amount').val());
			localStorage.setItem('registros', JSON.stringify(data));
		break;

		default:
			console.log("sin acciones");
		break;

	}

	form = document.getElementById('register-form');

	form.reset();

	table_in();

	table_out();
}

// Dibujando tablas ----------------------------------------------------------------------------

// Tabla de ingresos

function table_in() {
	let i = 1;

	let table = '';

	data.ingresos.desc.forEach(function(val, index) {
		table += '<tr>';
		table += '<td>' + i + '</td>';
		table += '<td>' + val + '</td>';
		table += '<td>$' + data.ingresos.montos[index] + '</td>';
		table += '</tr>';
	  i++;
	});

	$('#data_ingresos_content').html(table);
}

// Tabla de egresos

function table_out() {
	let i = 1;

	let table = '';

	data.egresos.desc.forEach(function(val, index) {
		table += '<tr>';
		table += '<td>' + i + '</td>';
		table += '<td>' + val + '</td>';
		table += '<td>$' + data.egresos.montos[index] + '</td>';
		table += '</tr>';
	  i++;
	});

	$('#data_egresos_content').html(table);
}
