<script setup>
import CardsLogin from '../layout/CardsLogin.vue';


</script>

<template>
  <RouterLink class="m-2" to="/editModerator">
    <i class="bi bi-arrow-left-short"></i>
  </RouterLink>

  <main>
    <RouterLink to="/editmoderator/viewProducts">
      <CardsLogin :icon="'bi bi-tags'" :title="'View'" :text="'See and create itens'" :num="4"
        :btn_txt="'View products'" />
    </RouterLink>
    <RouterLink to="/editmoderator/createProducts">
      <CardsLogin :icon="'bi bi-tags'" :title="'Create'" :text="'See and create itens'" :num="6"
        :btn_txt="'Create products'" />
    </RouterLink>
  </main>
</template>