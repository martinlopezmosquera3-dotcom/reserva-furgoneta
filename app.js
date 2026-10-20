const SUPABASE_URL = 'https://ttykupmecaniqtkaslce.supabase.co/rest/v1/';
const SUPABASE_ANON_KEY = 'TUS_DATOS_DE_SUPABASE_ANON_KEY';

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

document.addEventListener('DOMContentLoaded', async function() {
  const calendarEl = document.getElementById('calendar');

  // 1. Obtener las reservas de Supabase
  const { data: reservas, error } = await supabase
    .from('reservas')
    .select('*');

  if (error) {
    console.error('Error al cargar reservas:', error);
    return;
  }

  // 2. Transformar los datos de Supabase al formato que pide FullCalendar
  // FullCalendar necesita objetos con 'title', 'start' y 'end'
  const eventosFormateados = reservas.map(reserva => {
    return {
      title: `Ocupada (${reserva.nombre_socio})`,
      start: reserva.fecha_inicio,
      end: reserva.fecha_fin,
      color: '#e74c3c' // Rojo para indicar que está ocupado
    };
  });

  // 3. Inicializar el calendario
  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth', // Vista mensual por defecto
    locale: 'es', // Idioma español
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek'
    },
    events: eventosFormateados // Aquí cargamos las reservas de Supabase
  });

  calendar.render();
});