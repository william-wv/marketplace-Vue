<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import ButtonComponent from '@/components/common/ButtonComponent.vue'
import { getImageUrl } from '@/services/http';
import { computed } from 'vue';

const auth = useAuthStore()
const verificarImg = '/uploads/defaults/no_profile_image.png'
const primeiraLetra = auth.user.name?.charAt(0).toUpperCase() || '?';
const imageUrl = computed(() => getImageUrl(auth.user.image_path));
const fileInput = ref(null)

function triggerInputFile() {
  fileInput.value.click()
}

function deleteImage() {
  auth.user.image_path = "/uploads/defaults/no_profile_image.png"
}

async function handleChangeImage(event) {
  const file = event.target.files[0]
  if (!file) return

  const formData = new FormData()
  formData.append('image', file)

  await auth.updateImageProfile(formData)
  auth.getUserMe()
}
</script>

<template>
  <section class=" d-flex flex-column align-items-center gap-2" style="width: 300px;">
    <div>
      <div class="p-0 d-flex container-fluid">
        <div class="rounded-circle shadow m-3" style="width: 150px; height: 150px;">
          <span v-if="auth.user.image_path && auth.user.image_path !== verificarImg" class="w-100 h-100">
            <img :src="imageUrl" alt="User image" class="w-100 h-100 object-fit-cover rounded-circle" />
          </span>
          <div v-else class="d-flex justify-content-center align-items-center h-100 text-white bg-primary">
            <h1 class="fs-3 m-0">{{ primeiraLetra }}</h1>
          </div>
        </div>
    
      </div>
    </div>    
    <h1 class="fs-3 d-flex align-items-center">Hello, {{ auth.user.name }}</h1>
    <div>
      <h2 class="text-black fs-5">{{ auth.endereco[0]?.city }} - {{ auth.endereco[0]?.state }}</h2>
      <h2 class="text-black fs-5 text-center mt-2"> <span class="text-primary">role:</span> {{ auth.user.role }}</h2>
    </div>

    <!-- Input escondido -->
    <input type="file" ref="fileInput" class="d-none" @change="handleChangeImage" />
    <div class="d-flex gap-3">
      <!-- Botão para disparar o input -->
      <ButtonComponent :title="'Image'" :class="'blue'" :icon="'bi bi-pen'" @click="triggerInputFile" />

      <ButtonComponent :title="'Image'" :class="'red'" :icon="'bi bi-trash'" @click="deleteImage" />
    </div>
  </section>
</template>