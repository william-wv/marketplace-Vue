<script setup>
import CardsLogin from '../layout/CardsLogin.vue';
import CreateProducts from './CreateProducts.vue';
import DeleteProducts from './DeleteProducts.vue';
import ViewProdutes from './ViewProdutes.vue';


</script>

<template>
  <main>
    <div class="box-cards">
      <!-- 
      <RouterLink to="/editmoderator/viewProducts">
        <CardsLogin :icon="'bi bi-tags'" :title="'View'" :text="'See itens'" :num="4" :btn_txt="'View products'" />
      </RouterLink> 
      -->
      <ViewProdutes />
      <!-- 
      <RouterLink to="/editmoderator/createProducts">
        <CardsLogin :icon="'bi bi-file-earmark-plus'" :title="'Create'" :text="'See and create itens'" :num="6"
        :btn_txt="'Create products'" />
      </RouterLink> -->
      <CreateProducts />
      <!-- 
      <RouterLink to="/editmoderator/deleteProducts">
        <CardsLogin :icon="'bi bi-trash'" :title="'Delete'" :text="'Delete itens'" :num="6"
        :btn_txt="'Delete products'" />
      </RouterLink>
    -->
      <DeleteProducts />
    </div>
  </main>
</template>

<style scoped>
@media (min-width:1000px) {
  .box-cards {
    display: flex;
    justify-content: center;
    align-items: center;

  }
}
</style>