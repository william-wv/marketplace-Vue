<script setup>
import CardApps from '../layout/CardApps.vue';

</script>

<template>
  <div class="divider w-100 text-center mb-3 mt-3">
    <span>
      <p>Or continue with</p>
    </span>
  </div>

  <div class="container-cards-form d-flex">
    <CardApps class="cardApps justify-content-center align-items-center text-center"
      :image="'/src/assets/img/google.png'" :app="'Google'" :desc="'logo google'" />
    <CardApps class="cardApps justify-content-center align-items-center text-center" :image="'/src/assets/img/face.png'"
      :app="'Facebook'" :desc="'logo facebook'" />
  </div>

  
</template>

<style scoped>

.divider {
  display: flex;
  align-items: center;
  text-align: center;
  color: #aaa;
  font-size: 12px;
  text-transform: uppercase;
  margin: 20px 0;
}

.divider::before,
.divider::after {
  content: "";
  flex: 1;
  border-bottom: 1px solid #555;
  margin: 0 10px;
}

.container-cards-form {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;

  & .cardApps:hover {
    background-color: var(--shadow);
  }
}
</style>