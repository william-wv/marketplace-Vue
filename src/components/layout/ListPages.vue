<script setup>
import { useRoute } from "vue-router";


const route = useRoute();


</script>

<template>
  <section>
    <nav class="contain">
      <ul class="p-0 d-flex justify-content-evenly">
        <RouterLink to="/">
          <li :class="{ active: route.path === '/' }">Home</li>
        </RouterLink>
        <RouterLink to="/categories">
          <li :class="{ active: route.path === '/categories' }">Categories</li>
        </RouterLink>
        <RouterLink to="/discounts">
          <li :class="{ active: route.path === '/discounts' }">Discounts</li>
        </RouterLink>
        <RouterLink to="/coupons">
          <li :class="{ active: route.path === '/coupons' }">Coupons</li>
        </RouterLink>
      </ul>
    </nav>
  </section>
</template>

<style scoped>
li {
  color: var(--Gray-900);
  padding: 5px 25px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

li.active {
  background-color: var(--Blue-700);
  color: var(--White-050);
  font-weight: bold;
}
</style>
