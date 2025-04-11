<script setup>
import CardsLogin from '../layout/CardsLogin.vue';


</script>

<template>
  <RouterLink class="m-2" to="/editModerator">
    <i class="bi bi-arrow-left-short"></i>
  </RouterLink>

  <main>
    <div class="box-cards">
      <RouterLink to="/editmoderator/viewProducts">
        <CardsLogin :icon="'bi bi-tags'" :title="'View'" :text="'See itens'" :num="4" :btn_txt="'View products'" />
      </RouterLink>

      <RouterLink to="/editmoderator/createProducts">
        <CardsLogin :icon="'bi bi-file-earmark-plus'" :title="'Create'" :text="'See and create itens'" :num="6"
          :btn_txt="'Create products'" />
      </RouterLink>

      <RouterLink to="/editmoderator/deleteProducts">
        <CardsLogin :icon="'bi bi-trash'" :title="'Delete'" :text="'Delete itens'" :num="6"
          :btn_txt="'Delete products'" />
      </RouterLink>
    </div>

  </main>
</template>

<style scoped>
@media (min-width:100px) {
  .box-cards {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
  }
}
</style>