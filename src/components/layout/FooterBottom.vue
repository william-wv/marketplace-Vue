<script setup>
import { ref } from "vue";
import dataCategories from "@/data/txtCategoriesFooter.json"

const categories = ref(dataCategories)

</script>
<template>

  <section class="container__bottom-footer d-flex">
    
    <div class="container-box-infos">
      <div class="logo">
        <h1>Compre+</h1>
      </div>
      <div class="texts-footer">
        <div class="number-call">
          <h3>Costumer Supports:</h3>
          <h2>(629) 555-0129</h2>
        </div>
        <div class="locate">
          <h3>4517 Washington Ave. Manchester, Kentucky 39495</h3>
        </div>
        <div class="email">
          <h3>info@compremais.com</h3>
        </div>
      </div>
    </div>
    <div class="containter-box-category">
      <ul class="ul-category">
        <li v-for="category in categories" class="li-category">
        {{ category.name }}
        </li>
      </ul>
    </div>
  </section>





  <section class="container-footer-msg">
    <p>Kinbo - eCommerce Template © 2021. Design by Templatecookie</p>
  </section>

</template>

<style scoped>
.container__bottom-footer {
  background-color: var(--Gray-900);
  justify-content: space-around;
  color: var(--White-000);
}

.container-footer-msg {
  background-color: var(--Gray-900);
  & p {
    color: var(--White-050);
    text-align: center;
    padding: 5px 0;
  }
}
</style>