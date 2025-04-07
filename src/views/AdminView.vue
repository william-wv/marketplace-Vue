<script setup lang="ts">
import CardsLogin from '@/components/layout/CardsLogin.vue';

</script>

<template>
  <main>
    <RouterLink class="m-2" to="/login">
      <i class="bi bi-arrow-left-short"></i>
    </RouterLink>
    <h1 class="mb-4 text-center">MODERATOR SETUP</h1>

    <div class="divs-mod">

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
    </div>
  </main>
</template>

<style scoped>


h1 {
  padding: 10px 0;
  border-top: 1px solid var(--White-200);
  border-bottom: 1px solid var(--White-200);
}

@media (min-width:1000px) {
  .divs-mod{
    height: 75vh;
    display: flex;justify-items: center;
    align-items: center;
    justify-content: center;
  }
}



</style>