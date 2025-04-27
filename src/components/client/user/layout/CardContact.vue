<script setup>
import useAuthStore from '@/stores/auth'

const auth = useAuthStore()
</script>

<template>
  <section class="p-3">
    <!-- Contact Info Section -->
    <div class="d-flex flex-column justify-content-center align-items-center">
      <h1 class="text-warning fs-2 mb-3 text-uppercase logo texto-contornado  ">Contact Info</h1>

      <div class="d-flex align-items-center mb-3">
        <i class="text-primary px-2 bi bi-envelope-at"></i>
        <h2 class="fs-6 mb-0">{{ auth.user.email }}</h2>
      </div>

      <div class="d-flex align-items-center mb-3">
        <i class="text-primary px-2 bi bi-phone"></i>
        <h2 class="fs-6 mb-0">47 999 237-2960</h2>
      </div>

      <div class="d-flex align-items-center mb-3">
        <i class="text-primary px-2 bi bi-calendar-day"></i>
        <h2 class="fs-6 mb-0">Entered in Apr '25</h2>
      </div>
    </div>
  </section>
</template>

<style scoped>

.texto-contornado {
  font-size: 3rem; /* Ajuste o tamanho do texto */
  color: white; /* Cor do texto */
  text-shadow: 
    -1px -1px 0 #000000a6,  
    1px -1px 0 #000000a6,  
    -1px 1px 0 #000000a6,  
    1px 1px 0 #000000a6; /* Contorno preto */
}
</style>