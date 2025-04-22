<script setup>
import CardHomeServices from '../layout/CardHomeServices.vue';


</script>
<template>
  <main class="pt-5">
    <div class="d-flex flex-column align-items-center justify-content-center text-center">
      <div>
        <h2 style="color: var(--primary);" class="text-service">
          Nossos serviços
        </h2>
      </div>

      <div class="pt-3 d-flex flex-column align-items-center justify-content-center">
        <h1 style="font-weight: bold;" class="text-h1">
          Soluções Web que geram resultados
        </h1>
        <h2 style="color: var(--txt-h2);" class="text-h2">
          Oferecemos uma gama abrangente de serviços de desenvolvimento web para ajudar sua empresa a ter sucesso
          online.
        </h2>
      </div>
    </div>

    <div class="cards">
      <CardHomeServices
      :icon="'bi bi-code'"
      :title="'Website Development'"
      :subtitle="'Custom websites built with modern technologies that are fast, secure, and scalable.'"
      />
      <CardHomeServices
      :icon="'bi bi-code'"
      :title="'Website Development'"
      :subtitle="'Custom websites built with modern technologies that are fast, secure, and scalable.'"
      />
      <CardHomeServices
      :icon="'bi bi-code'"
      :title="'Website Development'"
      :subtitle="'Custom websites built with modern technologies that are fast, secure, and scalable.'"
      />
      <CardHomeServices
      :icon="'bi bi-code'"
      :title="'Website Development'"
      :subtitle="'Custom websites built with modern technologies that are fast, secure, and scalable.'"
      />
    </div>
  </main>
</template>

<style scoped>
.text-service {
  max-width: 300px;
  padding: 10px;
  background-color: var(--secundary) !important;
  border-radius: 20px;
  font-size: 1.4rem;
}

.text-h1 {
  font-size: 2.8rem;
  margin-bottom: 20px;
  max-width: 400px !important;
}

.text-h2 {
  font-size: 1.2rem;
  max-width: 600px !important;
}

.cards {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
}

@media (min-width:1000px) {
  .cards {
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
}
}
</style>