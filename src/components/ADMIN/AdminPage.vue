<script setup>
import useAuthStore from '@/stores/auth';
const auth = useAuthStore();
</script>

<template>
  <main class="m-5 contain">
    <h1 class="text-center mb-5 mt-4">
      Dashboard de {{ auth.user.name }} - {{ auth.user.role }}
    </h1>
    
    <div class="d-flex shadow">
      <RouterLink to="/dashboard/editAdmin/categories" class="col-6 p-0">
        <div class="bg-secondary bg-gradient divizor1 text-white text-center">
          Produtos
        </div>
      </RouterLink>
      
      <RouterLink to="/dashboard/editAdmin/products" class="col-6 p-0">
        <div class="bg-secondary bg-gradient divizor2 text-white text-center">
          Categorias
        </div>
      </RouterLink>
    </div>


    <!-- O conteúdo das rotas filhas aparece AQUI -->
    <div class="">
      <RouterView />
    </div>
  </main>
</template>

<style scoped>
.router-link-active .divizor1,
.router-link-exact-active .divizor1,
.router-link-active .divizor2,
.router-link-exact-active .divizor2 {
  background-color: var(--Blue-500) !important;
  color: white;
}

.divizor1 {
  padding: 10px;
  border-radius: 40px 0 0 0 !important;
}

.divizor2 {
  padding: 10px;
  border-radius: 0 40px 0 0 !important;
}

.shadow{
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2) !important;

}
</style>
