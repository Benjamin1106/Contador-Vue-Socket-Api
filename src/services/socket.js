import { io } from 'socket.io-client';

const SOCKET_URL = 'https://ikcount.com';
const ACCESS_TOKEN =
  'YmVuamFtaW4uc2FsYXMuZXNjb2Jhci5ic2U6QVBJX0tFWUBjNjUzYjg0ZjQxOTM2MTcxNzVlNWJhNGVlZjRiOTg4MTlhMWEwZGIwNDcyNWNhNDEzODVjYjlkZWYyNDI0MTRkNTYwYmI2YTBiNzY4NjY5NzEwMjZhMGMwYjJiMTRkNzE4Nzg0YTU2MWQzOTI3ZTJmMTBmZDFkYzQ0ZDMxMmMzMjpJS0xBQjAwNQ==';

/**
 * Crea una conexión al servidor Socket.IO.
 * @param {function} onUpdate - Callback para manejar actualizaciones en tiempo real y ver si esta o no conectado
 * @returns {object} La instancia del socket.
 */
export const createSocketConnection = (onUpdate) => {
  const socket = io(`${SOCKET_URL}/live`, {
    query: { atoken: ACCESS_TOKEN },
    transports: ['websocket', 'polling'], //Conexion directa y plan de contingencia por si la primera no funciona
  });

  // Escucha cuando la conexión se establece
  socket.on('connect', () => {
    console.log('Socket conectado'); //Lo veremos primero en la consola despues a ver si hago unos estados
  });

  // Escucha cuando se cierra la conexión
  socket.on('disconnect', () => {
    console.log('Socket desconectado');
  });

  // Escucha eventos personalizados, como "SUMMARY"
  socket.on('SUMMARY', (data) => {
    console.log('Actualización recibida:', data);
    if (onUpdate) onUpdate(data); // Ejecuta el callback con los datos recibidos
  });

  // Manejo de errores
  socket.on('connect_error', (error) => {
    console.error('Error de conexión:', error.message); //Aviso de mala conexion por si se cae
  });

  return socket;
};
