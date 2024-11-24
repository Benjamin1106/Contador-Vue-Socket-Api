import axios from 'axios';

// Configuración general de Axios
const API_BASE_URL = 'https://ikcount.com/iklab';
const ACCESS_TOKEN =
  'YmVuamFtaW4uc2FsYXMuZXNjb2Jhci5ic2U6QVBJX0tFWUBjNjUzYjg0ZjQxOTM2MTcxNzVlNWJhNGVlZjRiOTg4MTlhMWEwZGIwNDcyNWNhNDEzODVjYjlkZWYyNDI0MTRkNTYwYmI2YTBiNzY4NjY5NzEwMjZhMGMwYjJiMTRkNzE4Nzg0YTU2MWQzOTI3ZTJmMTBmZDFkYzQ0ZDMxMmMzMjpJS0xBQjAwNQ==';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Envía un comando al contador manual (sumar o restar).
 * @param {string} type - Tipo de comando ('manual-add' o 'manual-sub').
 * @param {number} quantity - Cantidad que se va a modificar.
 * @returns {Promise<object>} Respuesta del servidor.
 */
export const sendCommand = async (type, quantity) => {
  const payload = {
    type,
    quantity,
    client: 'DEMO001', // Cliente definido por el API
    location: 'DEMO001A1L1', // Ubicación específica
    mac_address: 'DEMO001A1L1Z1MC3', // Identificador del dispositivo
  };

  try {
    const response = await apiClient.post(
      `/ikcount/api/counting/command?atoken=${ACCESS_TOKEN}`,
      payload
    );
    console.log('Comando enviado exitosamente:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al enviar el comando:', error.message);
    throw error;
  }
};