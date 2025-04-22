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
  <div class="container py-4">
    <div class="bg-light rounded p-4 shadow-sm">
      <h1 class="text-center text-primary mb-4">Meus endereços</h1>

      <div v-for="endereco in enderecos" :key="endereco.id" class="card mb-3">
        <div class="card-body d-flex justify-content-between align-items-center">
          <div>
            <h5 class="card-title mb-0">
              <i class="bi bi-geo-alt-fill me-2 text-primary"></i>CEP: {{ endereco.zip }}
            </h5>
          </div>
          <InputRadio :zip="endereco.zip" @click="() => selecionarEndereco(endereco.id)" />
        </div>
      </div>
    </div>
  </div>
</template>
