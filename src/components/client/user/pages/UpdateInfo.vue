<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { buscarCep } from '@/services/address'
import { criarEndereco } from '@/services/http'
import ButtomComponentRoute from '@/components/common/ButtomComponentRoute.vue'
import ButtonComponent from '@/components/common/ButtonComponent.vue'

const auth = useAuthStore()

const endereco = ref({
  street: '',
  number: '',
  zip: '',
  city: '',
  state: '',
  country: 'Brasil',
})

async function preencherEndereco() {
  try {
    const cepData = await buscarCep(endereco.value.zip)
    endereco.value.street = cepData.logradouro
    endereco.value.city = cepData.localidade
    endereco.value.state = cepData.uf
  } catch (error) {
    console.error(error.message)
    alert(error.message)
  }
}

async function salvarEndereco() {
  try {
    console.log('Enviando:', endereco.value)
    const enderecoSalvo = await criarEndereco(endereco.value)
    console.log('Resposta da API:', enderecoSalvo)

    auth.setAddress(enderecoSalvo)
    alert('Endereço salvo com sucesso!')
  } catch (error) {
    console.error('Erro ao salvar endereço:', error)
    alert('Erro ao salvar endereço.')
  }
}

</script>

<template>
  <div class="d-flex justify-content-center align-items-center height">
    <div class="card shadow-sm rounded p-3" style="min-width: 400px">
      <div class="card-body">
        <h2 class="card-title h4 mb-1 text-primary">Address Information</h2>
        <p class="text-muted mb-4">Update your shipping and billing address</p>

        <form @submit.prevent="salvarEndereco">
          <div class="mb-3">
            <label for="zip" class="form-label">ZIP / Postal code</label>
            <input type="text" id="zip" v-model="endereco.zip" @blur="preencherEndereco" class="form-control" />
          </div>

          <div class="mb-3">
            <label for="street" class="form-label">Street address</label>
            <input type="text" id="street" v-model="endereco.street" class="form-control" />
          </div>

          <div class="mb-3">
            <label for="number" class="form-label">Number</label>
            <input type="text" id="number" v-model="endereco.number" class="form-control" />
          </div>

          <div class="row">
            <div class="mb-3 col-md-6">
              <label for="city" class="form-label">City</label>
              <input type="text" id="city" v-model="endereco.city" class="form-control" />
            </div>

            <div class="mb-3 col-md-6">
              <label for="state" class="form-label">State / Province</label>
              <input type="text" id="state" v-model="endereco.state" class="form-control" />
            </div>
          </div>

          <div class="mb-4">
            <label for="country" class="form-label">Country</label>
            <input type="text" id="country" v-model="endereco.country" class="form-control" />
          </div>

          <div class="d-flex justify-content-end">
            <ButtomComponentRoute class="btn btn-outline-secondary me-2"
            :type="'button'"
            :rota="'/dashboard/myaccount'"
            :title="'Back'"
            />
            <ButtonComponent class="btn me-2"
            :title="'Save Changes'"
            :class="'blue'"
            />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.height {
  height: 100svh;
}
</style>
