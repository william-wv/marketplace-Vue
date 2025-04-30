<script setup>
import { ref, computed } from 'vue'
import useAuthStore from '@/stores/auth'
import ButtonComponent from '@/components/common/ButtonComponent.vue'
import InputImage from '../common/InputImage.vue'
import { getImageUrl } from '@/services/http'
import { push } from 'notivue'

const auth = useAuthStore()

const nomeCompleto = ref(auth.user.name || 'Usuário')
const inicial = computed(() => nomeCompleto.value.charAt(0).toUpperCase())

async function onImageChange(file) {
  try {
    await auth.putUserimage(file)
    push.success('Image Update')
  } catch (error) {
    push.error('Image Fail')

    console.error(error)
  }
}
const verificarImagem = '/uploads/defaults/no_profile_image.png'

async function deletePhoto() {
  await auth.putUserimage(verificarImagem)
}
</script>
<template>
  <div class="card border p-3 rounded-lg  shadow-sm">
    <h1 class="font-bold fs-2 mb-4">Perfil</h1>
    <div class="d-flex flex-column  align-items-center">
      <div class="rounded-circle bg-primary d-flex align-items-center justify-content-center"
        style="width: 100px; height: 100px;">
        <span v-if="!verificarImagem" class="text-white fs-1 fw-bold">{{ inicial }}</span>
        <span v-else > <img :src="getImageUrl(auth.user.image_path)"   style="width: 100px !important; height: 100px !important; object-fit: cover;"></span>
      </div>

      <h2 class="text-lg font-semibold mt-4">{{ auth.user.name }}</h2>
      <p class="text-gray-500">{{ auth.user.email }}</p>

      <span class="inline-block mt-2 px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">{{ auth.user.role
        }}</span>
      <p class="text-sm text-gray-400 mt-1">Membro desde Janeiro 2023</p>
    </div>
    
    <InputImage :class="' w-full border rounded-md py-2 blue'" :title="'Editar foto'"  @change="onImageChange"/>
    <ButtonComponent :class="'w-full border rounded-md py-2 red'" :title="'Delete foto'"  @click="deletePhoto"/>
  </div>
</template>