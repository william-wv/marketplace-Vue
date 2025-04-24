<script setup>

import { getImageUrl } from '@/services/http';
import useAuthStore from '@/stores/auth';
import { computed } from 'vue';

const auth = useAuthStore();
const verificarImg = '/uploads/defaults/no_profile_image.png'
const primeiraLetra = auth.user.name?.charAt(0).toUpperCase() || '?';
const imageUrl = computed(() => getImageUrl(auth.user.image_path));

</script>

<template>
  <div class="p-0 d-flex container-fluid">
    <div
      class="rounded-circle shadow m-3"
      style="width: 50px; height: 50px;">
      <span v-if="auth.user.image_path && auth.user.image_path !== verificarImg" class="w-100 h-100">
        <img :src="imageUrl" alt="User image" class="w-100 h-100 object-fit-cover rounded-circle" />
      </span>
      <div v-else
        class="bg-primary rounded-circle d-flex align-items-center justify-content-center text-white fw-bold shadow m-3">
        <h1 class="fs-3 m-0">{{ primeiraLetra }}</h1>
      </div>
    </div>
    <h1 class="fs-6 d-flex align-items-center">Hello, <br> {{ auth.user.name }}</h1>
  </div>
  
</template>

<style scoped>

</style>
