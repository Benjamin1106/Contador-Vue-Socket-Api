<template>
  <div>
    <h1>Mi Aplicación Vue</h1>
    <Home />
  </div>
</template>

<script>
import Home from "@/components/Home.vue"; // Importa el componente desde su ruta

export default {
  name: "App",
  components: {
    Home, 
  },
};
</script>

<style scoped>
</style>
