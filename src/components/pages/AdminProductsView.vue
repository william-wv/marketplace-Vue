<script setup>
import CardProdCat from '../layout/CardProdCat.vue';


</script>


<template>
  <RouterLink class="m-2" to="/editmoderator/products">
    <i class="bi bi-arrow-left-short"></i>
  </RouterLink>

  <main class="produtos-container">
  <div class="div-h1">
    <h1 class="text-center">Produtos</h1>
  </div>
  <div class="">
     <!-- tenis -->
 
      <CardProdCat
      :category="'Sneakers'"
      :id="'20'"
      />  
     
      <!-- roupas -->
      <CardProdCat
      :category="'Clothing'"
      :id="'21'"
      />
      <!-- calças -->
      <!-- <CardProdCat
      :category="''"
      :id="''"
      /> -->
  </div>
   
  </main>

</template>


<style scoped>
li {
  color: #000 !important;
}

h1 {
  background-color: var(--Blue-500) !important;
  padding: 1px !important;
  color: white !important;
  margin: 0 !important;
  font-weight: 600 !important;
 width: 300px;  border-radius: 30px !important;
}

.div-h1{
  display: flex;
  justify-content: center;

}

</style>
