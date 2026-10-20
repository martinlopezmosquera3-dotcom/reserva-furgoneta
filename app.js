const SUPABASE_URL = 'https://ttykupmecaniqtkaslce.supabase.co/rest/v1/';
const SUPABASE_ANON_KEY = 'sb_publishable_02_uj3SO3i4p0xYRMUVi8w_ucVIb-PE';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

//Mostrar las reservas
async function cargarReservas() {
  const { data, error } = await supabase
    .from('reservas')
    .select('*')
    .order('fecha_inicio', { ascending: true });

  if (error) {
    console.error('Error al cargar reservas:', error);
    return;
  }

  // Aquí procesas los datos `data` para pintarlos en una tabla o lista HTML
  console.log('Reservas actuales:', data);
}

//Registrar una nueva reserva

async function crearReserva(evento) {
  evento.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const fechaInicio = document.getElementById('fechaInicio').value;
  const fechaFin = document.getElementById('fechaFin').value;

  const { data, error } = await supabase
    .from('reservas')
    .insert([
      { nombre_socio: nombre, fecha_inicio: fechaInicio, fecha_fin: fechaFin }
    ]);

  if (error) {
    alert('Hubo un error al hacer la reserva');
    console.error(error);
  } else {
    alert('¡Reserva realizada con éxito!');
    window.location.href = 'index.html'; // Volver al inicio
  }
}


//Calendar

const calendar = new FullCalendar.Calendar(calendarEl, {
  initialView: 'dayGridMonth',
  locale: 'es',
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth' // Quitamos la vista semanal por horas si no la necesitas
  },
  events: eventosFormateados
});

const eventosFormateados = reservas.map(reserva => {
  // Cortamos la cadena para quedarnos solo con los primeros 10 caracteres (YYYY-MM-DD)
  const fechaInicioLimpia = reserva.fecha_inicio.split('T')[0];
  
  // Nota: FullCalendar, para eventos de varios días (allDay), 
  // a veces requiere que la fecha de fin sea el día *siguiente* para que pinte bien la celda final.
  // Si quieres que pinte el día exacto, puedes usar la misma fecha o ajustarla si es necesario.
  const fechaFinLimpia = reserva.fecha_fin ? reserva.fecha_fin.split('T')[0] : fechaInicioLimpia;

  return {
    title: `Furgoneta reservada: ${reserva.nombre_socio}`,
    start: fechaInicioLimpia,
    end: fechaFinLimpia,
    allDay: true, // Esto fuerza a que ocupe la celda del día entero sin mostrar horas
    color: '#e74c3c'
  };
});