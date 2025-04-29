<script setup>

import Json from '@/data/IconsHomeComp.json';
import ButtonComponent from '../common/ButtonComponent.vue';
import ButtomComponentRoute from '../common/ButtomComponentRoute.vue';
</script>

<template>
  <main class="mt-5 d-flex align-items-center justify-content-center">
    <section class="hero-section text-white  container ">
      <div class="">
        <div class="row align-items-center">
          <div class="col-lg-6 div-txts">
            <h1 class="display-4 fw-bold mb-4">Your best purchases only here</h1>
            <p class="lead mb-4">
              Discover unbeatable deals and top-quality products all in one place. Shop with confidence and find everything you need right here!
            </p>
            <div class="d-flex flex-column flex-sm-row gap-2 p-1">
              <ButtomComponentRoute  :rota="'/categories'" class="btn btn-outline-light" :title="'See categorias'" />
              <ButtonComponent :class="'orange'" :title="'Entre em contato'" />
            </div>
          </div>

          <div class="section-cards p-5 col-lg-6 mt-5 mt-lg-0 d-flex justify-content-center">
            <div class="rounded shadow-lg cards-container">
              <div class="cards">
                <div v-for="card in Json" class="card-i" :key="card.id">
                  <i :class=card.i></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>


<style scoped>
i {
  font-size: 2rem !important;
}

.hero-section {
  border-radius: 30px;
  background-color: var(--Blue-700);
}


.cards-container {
  padding: 50px 150px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  backdrop-filter: blur(10px);
}


.cards {
  display: grid;
  gap: 2.5rem;
  grid-template-columns: repeat(2, 1fr);
  padding: 10px;
}

.card-i {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 100px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  box-shadow: 2px 4px 6px 4px rgba(0, 0, 0, 0.1);
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
}

</style>
