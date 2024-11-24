<template>
    <div class="p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 class="text-2xl font-bold mb-4">Contador Manual</h1>
      <p class="mb-4">
        <span :class="isConnected ? 'text-green-600' : 'text-red-600'">
          Estado del socket: {{ isConnected ? 'Conectado' : 'Desconectado' }}
        </span>
      </p>
      <div class="flex items-center gap-4">
        <button @click="decrement" class="px-4 py-2 bg-red-500 text-white rounded-lg">
          Restar
        </button>
        <span class="text-xl font-bold">{{ count }}</span>
        <button @click="increment" class="px-4 py-2 bg-green-500 text-white rounded-lg">
          Sumar
        </button>
      </div>
      <p v-if="countData" class="mt-4">
        <strong>Actualización en tiempo real:</strong> {{ countData }}
      </p>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, onUnmounted } from 'vue';
  import { sendCommand } from '@/services/api';
  import { createSocketConnection } from '@/services/socket';
  
  export default {
    name: 'Home',
  
    setup() {
      const count = ref(0); // Contador manual
      const isConnected = ref(false); // Estado del socket
      const countData = ref(null); // Datos en tiempo real
  
      let socket; // Instancia del socket
  
      // Incrementar el contador manual
      const increment = async () => {
        await sendCommand('manual-add', 1); // Llama a la API para sumar
        count.value++;
      };
  
      // Decrementar el contador manual
      const decrement = async () => {
        await sendCommand('manual-sub', 1); // Llama a la API para restar
        count.value--;
      };
  
      // Conectar el socket al montar el componente
      onMounted(() => {
        socket = createSocketConnection((data) => {
          countData.value = data; // Actualiza los datos en tiempo real
        });
  
        socket.on('connect', () => {
          isConnected.value = true; // Cambia el estado a conectado
        });
  
        socket.on('disconnect', () => {
          isConnected.value = false; // Cambia el estado a desconectado
        });
      });
  
      // Desconectar el socket al desmontar el componente
      onUnmounted(() => {
        if (socket) socket.disconnect();
      });
  
      return {
        count,
        increment,
        decrement,
        isConnected,
        countData,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Opcional: agrega estilos aquí */
  </style>
  