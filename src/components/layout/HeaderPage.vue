<script setup>
import navitems from '@/data/iconsHeaderBottom.json'
</script>

<template>
  <header class="p-4 d-flex justify-content-around align-items-center text-white bg-primary">
    <div>
      <RouterLink class="text-white" to="/"><h1 class="logo fs-2">COMPRE+</h1></RouterLink>
    </div>
    <nav>
      <ul class="d-flex">
        <li v-for="item in navitems" :key="item.name">
          <RouterLink :to="item.route" class="text-white ">
            <span :class="item.class"></span>
              {{ item.name }}
          </RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
.d-flex {
  display: flex;
  gap: 1rem;
  list-style: none;
}

.bg-primary {
  background-color: var(--Blue-700) !important;
}
</style>
