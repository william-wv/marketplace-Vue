<script setup>
import ButtomComponentRoute from '@/components/common/ButtomComponentRoute.vue';
import useAuthStore from '@/stores/auth';


const auth = useAuthStore();
const verificarImg = '/uploads/defaults/no_profile_image.png'


const primeiraLetra = auth.user.name?.charAt(0).toUpperCase() || '?';


</script>

<template>
  <main class="d-flex">
    <div class="d-flex justify-content-between align-items-center card profile-card p-3 m-2 rounded-4 shadow">
      <div class="d-flex justify-content-center flex-column align-items-center">
        <div
          class="my-image bg-primary rounded-circle d-flex align-items-center justify-content-center text-white fw-bold shadow-lg  m-4"
          style="width: 130px; height: 130px; font-size: 4rem;">

          <template v-if="auth.user.image_path !== verificarImg">
            <img :src="auth.user.image_path" alt="User image" class="object-fit-cover" />
          </template>
          <template v-else>
            {{ primeiraLetra }}
          </template>
        </div>
        <div class="mb-1 ">
          <span style="width: 200px;"
            class="d-flex justify-content-center bg-primary rounded-5 text-white p-1 text-center">
            <i class="bi bi-shield-shaded"></i>
            <p>{{ auth.user.role }}</p>
          </span>
        </div>
      </div>
      <div class="user-info">
        <h2 class="mt-2 mb-3 fs-5 text-center">{{ auth.user.name }}</h2>
        <div class="mb-4 ">
          <div class="d-flex justify-content-center">
            <p class="fs-6"><b>Mail:</b></p>
            <p class="fs-6">{{ auth.user.email }}</p>
          </div>
          <div class="d-flex justify-content-center">
            <p class="fs-6"><b>Phone:</b></p>
            <p class="fs-6">+55 (42) 9.99237-2960</p>
          </div>
          <div class="d-flex justify-content-center">
            <p class="fs-6"><b>Id:</b></p>
            <p class="fs-6">{{ auth.user.id }}</p>
          </div>
        </div>
      </div>
      <div class="d-flex flex-column  gap-4">
        <ButtomComponentRoute class="btn-update" :title="'Add Information'" :class="'blue'" />
        <ButtomComponentRoute :rota="'/update'" :title="'Add New Address'" class="btn-add blue" />
      </div>
    </div>
  </main>

</template>

<style scoped>
.object-fit-cover {
  object-fit: cover;
}

.card {
  height: auto;
  width: 100svw;
}

@media (min-width:992px) {
  main {
    width: 60svw;
    position: fixed;
  }

  .card {
    height: 95svh;
    width: 20svw !important;
  }
}
</style>
