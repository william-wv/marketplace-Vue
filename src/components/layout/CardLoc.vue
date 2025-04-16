<script setup>
import { getAddress } from '@/services/http'
import { defineEmits, onMounted, ref } from 'vue'
import ButtonComponent from '../common/ButtonComponent.vue'
import InputRadio from '../common/InputRadio.vue'

const emit = defineEmits(['selecionar-endereco'])

function selecionarEndereco(id) {
  emit('selecionar-endereco', id)
}

const enderecos = ref([])


async function getAdd() {
  const responde = await getAddress()
  enderecos.value = responde
  console.log(enderecos.value)
}

onMounted(() => {
  getAdd()
})

</script>

<template>
  <span class="bg-primary-subtle" style="width: 300px;">
    <h1 class="mt-4 text-center ">Meus endereços</h1>
  </span>
  <div v-for="endereco in enderecos" :key="endereco.id" class="">
    <div class="d-flex ">
      <InputRadio :zip="endereco.zip" @click="() => selecionarEndereco(endereco.id)" />
    </div>

    <!-- <ButtonComponent @click="selecionarEndereco(endereco.id)"
      :title="'Select Address'"
      :icon="'bi bi-select'"
      :class="'blue'"
    /> -->
  </div>
</template>
