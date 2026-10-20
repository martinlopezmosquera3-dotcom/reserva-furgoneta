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
