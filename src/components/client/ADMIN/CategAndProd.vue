<script setup>
import ButtomComponentRoute from '@/components/common/ButtomComponentRoute.vue';
import useAuthStore from '@/stores/auth';

const auth = useAuthStore()


const props = defineProps({
  title: String,
  icon: String,
  rota: String
})


</script>

<template>


  <h1 class="page-title m-4">
    Product Management
    <small class="subtitle">Manage your products and categories</small>
  </h1>

  <div class="d-flex justify-content-around">
    <div class="d-flex - gap-3">
      <div v-if="auth.user.role === 'ADMIN'">
<ButtomComponentRoute  :rota="'/dashboard/edit/categories/create'" :icon="'bi bi-plus-lg'"
        :title="'Create Category'" :style="'blue'" />
      </div>
    
      <ButtomComponentRoute :rota="'/dashboard/edit/products/create'" :icon="'bi bi-plus-lg'"
        :title="'Create Product'" :style="'blue'" />
    </div>

  </div>

  <div class="d-flex align-items-center justify-content-center p-4">
    <section class="contain p-0 rounded-5 ">
      <div class="d-flex sticky-top  nav-tabs-custom">
        <RouterLink to="/dashboard/edit/admin/products" class="col-6 p-0">
          <div class=" bg-secondary bg-gradient divizor1 p-3 text-white text-center">
            <span>Produtos</span>
          </div>
        </RouterLink>

        <RouterLink to="/dashboard/edit/admin/categories" class="col-6 p-0" v-if="auth.user.role === 'ADMIN'">
          <div  class=" bg-secondary bg-gradient divizor2 p-3  text-white text-center">
            <span>Categorias</span>
          </div>
        </RouterLink>
      </div>
      <div class="larg">
        <RouterView />
      </div>
    </section>
  </div>
</template>

<style scoped>
.larg {
  width: 70vw;
}

.page-title {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.subtitle {
  display: block;
  font-size: 1rem;
  font-weight: normal;
  color: #555;
}

.contain {
  height: 100%;
  box-shadow: 1px 3px 5px 7px rgba(0, 0, 0, 0.2) !important;
  display: flex;
  flex-direction: column;

}

.nav-tabs-custom {
  top: 0;
  height: 56px !important;
  overflow: hidden;
  background-color: #6c757d;
  z-index: 1000;
}


.router-link-active .divizor1,
.router-link-exact-active .divizor1,
.router-link-active .divizor2,
.router-link-exact-active .divizor2 {
  background-color: var(--Blue-500) !important;
  color: white;
}

.divizor1,
.divizor2 {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}


@media (min-width:1024px) {
}
</style>
