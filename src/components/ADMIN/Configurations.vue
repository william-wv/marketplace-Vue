<script setup>
import { useRoute } from 'vue-router'
import CardsConfig from '../layout/CardsConfig.vue';

const route = useRoute()
</script>

<template>
  <div class="d-flex flex-wrap justify-content-center align-items-center vh-100" v-if="route.path === '/dashboard/edit'">
    <RouterLink to="/dashboard/edit/admin/categories" class="card-wrapper p-2">
        <CardsConfig icon="bi bi-boxes" title="Categories and Products"
          subtitle="You can Create, Read, Update and Delete" />
    </RouterLink>

    <RouterLink to="/dashboard/edit/admin/stock" class="card-wrapper p-2">
      <CardsConfig icon="bi bi-diagram-3" title="Stock" subtitle="You can Update your products stocks" />
    </RouterLink>

    <RouterLink to="/dashboard/edit/admin/" class="card-wrapper p-2">
      <CardsConfig icon="bi bi-people" title="Manage Users"
        subtitle="Easily manage users through registration, editing, deletion, and data viewing." />
    </RouterLink>

    <RouterLink to="/dashboard/edit/admin/" class="card-wrapper p-2">
      <CardsConfig icon="bi bi-bag" title="Orders" subtitle="You can Update" />
    </RouterLink>
  </div>

  <RouterView />
</template>
