<script setup lang="ts">
import CardsLogin from '@/components/layout/CardsLogin.vue';

</script>

<template>
  <main>
    <RouterLink class="m-2" to="/login">
      <i class="bi bi-arrow-left-short"></i>
    </RouterLink>
    <div>
      <RouterLink to="/editmoderator/categories">
        <CardsLogin :icon="'bi bi-tags'" :title="'Categories'" :text="'See and create itens'" :num="6"
          :btn_txt="'View Categories'" />
      </RouterLink>
    </div>

    <div>
      <RouterLink to="/editmoderator/products">
        <CardsLogin :icon="'bi bi-tags'" :title="'Products'" :text="'See and Create Itens'" :num="6"
        :btn_txt="'View Products'" />
      </RouterLink>

    </div>
  </main>
</template>