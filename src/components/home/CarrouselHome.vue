<!-- Carrossel.vue -->
<script setup>
import PagesComponent from './PagesComponent.vue';
</script>

<template>
  <div id="carouselExampleDark" class="carousel carousel-dark slide h-100">
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active"
        aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>

    <div class="carousel-inner h-100">
      <div class="carousel-item active h-100" data-bs-interval="10000">
        <PagesComponent title="New Arrivals"
          subtitle="Discover the latest products in our collection. Be the first to explore!"
          image="/src/assets/img/big-sale-retail-with-presents-card-removebg-preview.png" />
      </div>

      <div class="carousel-item h-100" data-bs-interval="2000">
        <PagesComponent title="Limited Edition"
          subtitle="Exclusive items just for you. Once they're gone, they're gone!"
          image="/src/assets/img/lasminute.png" />
      </div>

      <div class="carousel-item h-100">
        <PagesComponent title="Sustainable Collection"
          subtitle="Shop eco-friendly products designed to make a positive impact on the planet."
          image="/src/assets/img/sustainableCollection.png" />

      </div>
    </div>
  </div>
</template>

<style scoped>
.h-100 {
  height: 80svh !important;
}

.carousel-item {
  height: 100%;
}
</style>
