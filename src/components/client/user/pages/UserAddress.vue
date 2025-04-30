<script setup>
import { ref, onMounted } from 'vue'
import ButtonComponent from '@/components/common/ButtonComponent.vue'
import { getAddress, criarEndereco } from '@/services/http'
import { buscarCep } from '@/services/address'
import useAuthStore from '@/stores/auth'

const auth = useAuthStore()

const addresses = ref([])
const mostrarModal = ref(false)
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

// Novo endereço
const endereco = ref({
  street: '',
  number: '',
  zip: '',
  city: '',
  state: '',
  country: 'Brasil'
})

async function getAdd() {
  const responde = await getAddress()
  addresses.value = responde
  console.log(addresses.value)
}

function addAddress() {
  mostrarModal.value = true
}

function fecharModal() {
  mostrarModal.value = false
}

async function salvarEndereco() {
  try {
    const enderecoSalvo = await criarEndereco(endereco.value)

    mostrarModal.value = false

    // Limpar os campos do formulário
    endereco.value = {
      street: '',
      number: '',
      zip: '',
      city: '',
      state: '',
      country: 'Brasil'
    }
    await getAdd()
  } catch (error) {
    console.error('Erro ao salvar endereço:', error)
    alert('Erro ao salvar endereço.')
  }
}

onMounted(() => {
  getAdd()
})
</script>


<template>
  <main class="d-flex flex-column align-items-center w-100 gap-5 h-100">
    <h2 class="title mt-5">Meus Endereços</h2>
    <div class="addresses-container">
      <!-- Lista de endereços -->
      <div v-for="addr in addresses" :key="addr.id" class="address-box shadow-sm p-4 rounded-4">
        <div class="d-flex justify-content-between align-items-start mb-2">
          <div class="d-flex align-items-center gap-2">
            <i class="bi bi-house-door-fill fs-4 text-primary"></i>
            <h5 class="fw-bold m-0">{{ addr.label }}</h5>
          </div>
        
        </div>
        <div class="mb-3 text-secondary">
          <p class="mb-1">{{ addr.street }}, {{ addr.number }}</p>
          <p class="mb-1">{{ addr.neighborhood }}</p>
          <p class="mb-1">{{ addr.city }}, {{ addr.state }} - {{ addr.zip }}</p>
          <p v-if="addr.complement" class="mb-0">Complemento: {{ addr.complement }}</p>
        </div>
        <div class="d-flex justify-content-between">
          <ButtonComponent :icon="'bi bi-send'" title="Ver detalhes" class="btn btn-light border" />
          <div class="d-flex gap-2">
            <ButtonComponent :icon="'bi bi-pen'" title="" class="btn-edit orange" />
            <ButtonComponent :icon="'bi bi-trash'" :class="'btn btn-danger'" @click="auth.deletAdd(addr.id)" />
          </div>
        </div>
      </div>

      <!-- Botão para adicionar novo endereço -->
      <div v-if="addresses.length < 3"
        class="d-flex justify-content-center align-items-center address-box add-address-box" @click="addAddress">
        <i class="bi bi-plus fs-1"></i>
      </div>
    </div>
  </main>

  <!-- Modal de novo endereço -->
  <div v-if="mostrarModal" class="modal-backdrop">
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
.add-address-box:hover {
  background-color: #cceeff;
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}


.h-100 {
  height: 100svh !important;
}

.title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.addresses-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.address-box {
  width: 320px;
  background-color: #fff;
  border: 1px solid #eaeaea;
}

.badge {
  font-size: 0.8rem;
  padding: 0.35em 0.6em;
  border-radius: 999px;
}

.btn-edit {
  border: none;
  background-color: transparent;
  cursor: pointer;
}

.btn-edit.orange {
  color: #fd7e14;
}

.btn-edit.red {
  color: #dc3545;
}

@media (min-width: 1024px) {
  main {
    margin-left: 380px;
    width: 70vw;
  }
}
</style>
