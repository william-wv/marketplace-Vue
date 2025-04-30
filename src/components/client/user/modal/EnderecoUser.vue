<script setup>
import { ref, defineEmits } from 'vue'

const emit = defineEmits(['fechar', 'salvar'])
import { buscarCep } from '@/services/address'

const endereco = ref({
  zip: '',
  street: '',
  number: '',
  city: '',
  state: '',
  country: ''
})

function fecharModal() {
  emit('fechar')
}

function salvarEndereco() {
  emit('salvar', endereco.value)
  fecharModal()
}

async function preencherEndereco() {
  try {
    const cepData = await buscarCep(endereco.value.zip)
    endereco.value.street = cepData.logradouro
    endereco.value.city = cepData.localidade
    endereco.value.state = cepData.uf
  } catch (error) {
    console.error(error)
    alert('Erro ao buscar CEP')
  }
}
</script>

<template>
  <div v-if="endereco.zip" class="modal-backdrop">
    <div class="modal-content">
      <div class="modal-header">
        <h5>Novo Endereço</h5>
        <button class="btn-close" @click="fecharModal">&times;</button>
      </div>

      <form @submit.prevent="salvarEndereco">
        <div class="mb-2">
          <label>CEP:</label>
          <input v-model="endereco.zip" class="form-control" @blur="preencherEndereco" />
        </div>

        <div class="mb-2">
          <label>Rua:</label>
          <input v-model="endereco.street" class="form-control" />
        </div>
        <div class="mb-2">
          <label>Número:</label>
          <input v-model="endereco.number" class="form-control" />
        </div>
        <div class="mb-2">
          <label>Cidade:</label>
          <input v-model="endereco.city" class="form-control" />
        </div>
        <div class="mb-2">
          <label>Estado:</label>
          <input v-model="endereco.state" class="form-control" />
        </div>
        <div class="mb-2">
          <label>País:</label>
          <input v-model="endereco.country" class="form-control" />
        </div>

        <div class="d-flex justify-content-end mt-3">
          <button class="btn btn-secondary me-2" @click.prevent="fecharModal">Cancelar</button>
          <button class="btn btn-primary" type="submit">Salvar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  width: 400px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.btn-close {
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

button {
  cursor: pointer;
}
</style>
