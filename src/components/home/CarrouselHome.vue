<!-- Carrossel.vue -->
<script setup lang="ts">

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
        <PagesComponent 
          title="Primeiro Slide"
          subtitle="Subtítulo 1"
          image="https://via.placeholder.com/400x300"
          desc="Imagem 1"
        />
      </div>

      <div class="carousel-item h-100" data-bs-interval="2000">
        <PagesComponent 
          title="Segundo Slide"
          subtitle="Subtítulo 2"
          image="https://via.placeholder.com/400x300"
          desc="Imagem 2"
        />
      </div>

      <div class="carousel-item h-100">
        <PagesComponent 
          title="Terceiro Slide"
          subtitle="Subtítulo 3"
          image="https://via.placeholder.com/400x300"
          desc="Imagem 3"
        />
      </div>
    </div>

    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>

<style scoped>
.h-100 {
  height: 100svh;
}
.carousel-item {
  height: 100%;
}
</style>
