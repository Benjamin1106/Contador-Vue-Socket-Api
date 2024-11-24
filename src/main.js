import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';

// Configuración de Vue Router
const routes = [{ path: '/', component: Home }]; // Definir rutas 
const router = createRouter({
  history: createWebHistory(), // Se usa el historial para que sea fluido el desplazamiento
  routes,
});

const app = createApp(App);

// Usa Pinia y Router en la aplicación
app.use(createPinia());
app.use(router);
app.mount('#app');
