<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import UserSection from '../UserSection.vue'
import ButtonComponent from '@/components/common/ButtonComponent.vue'

const auth = useAuthStore()
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
  <section class="card d-flex flex-column align-items-center gap-2" style="width: 300px;">
    <div>
      <UserSection />
    </div>
    <div>
      <h2 class="text-black fs-5">{{ auth.endereco[0]?.city }} - {{ auth.endereco[0]?.state }}</h2>
      <h2 class="text-black fs-5 text-center mt-2"> <span class="text-primary">role:</span> {{ auth.user.role }}</h2>
    </div>

    <!-- Input escondido -->
    <input type="file" ref="fileInput" class="d-none" @change="handleChangeImage" />
    <div class="d-flex gap-4" >
      <!-- Botão para disparar o input -->
      <ButtonComponent :title="'Image'" :class="'blue'" :icon="'bi bi-pen'"
        @click="triggerInputFile" />

      <ButtonComponent :title="'Image'" :class="'red'" :icon="'bi bi-trash'" @click="deleteImage" />
    </div>
  </section>
</template>
