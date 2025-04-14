<script setup>
import ButtomComponentRoute from '@/components/common/ButtomComponentRoute.vue';
import useAuthStore from '@/stores/auth';


const auth = useAuthStore();
const verificarImg = '/uploads/defaults/no_profile_image.png'


const primeiraLetra = auth.user.name?.charAt(0).toUpperCase() || '?';


</script>

<template>
  <main class="d-flex flex-column gap-4">
    <div class="card profile-card p-3 m-2 rounded-4 shadow">
      <div class="d-flex justify-content-center ">
        <div
          class="my-image bg-primary rounded-circle d-flex align-items-center justify-content-center text-white fw-bold shadow-lg m-4"
          style="width: 130px; height: 130px; font-size: 4rem;">

          <template v-if="auth.user.image_path !== verificarImg">
            <img :src="auth.user.image_path" alt="User image" class="w-100 h-100 rounded-circle object-fit-cover" />
          </template>
          <template v-else>
            {{ primeiraLetra }}
          </template>
        </div>
      </div>
      <div class="d-flex justify-content-center mb-1 ">
        <span style="width: 150px;" class="d-flex justify-content-center bg-primary rounded-5 text-white p-1 text-center">
          <i class="bi bi-shield-shaded"></i> <p>{{ auth.user.role }}</p>
        </span>
      </div>
      <div class="user-info">
        <h2 class="mt-2 mb-3 fs-3 text-center">{{ auth.user.name }}</h2>

        <div class="texts-info mb-4">
          <div class="d-flex">
            <p class="col-3 fs-6">Mail:</p>
            <p class="col-9 fs-6">{{ auth.user.email }}</p>
          </div>
          <div class="d-flex">
            <p class="col-3 fs-6">Phone:</p>
            <p class="col-9 fs-6">+55 (42) 9.99237-2960</p>
          </div>
        </div>
      </div>

      <ButtomComponentRoute class="btn-update" :title="'Add Information'" :class="'blue'" />
    </div>
  </main>

</template>

<style scoped>
.object-fit-cover {
  object-fit: cover;
}
</style>
