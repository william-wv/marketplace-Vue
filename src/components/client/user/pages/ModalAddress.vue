<script setup>
import { ref, onMounted } from 'vue'
import { Modal } from 'bootstrap'
import ButtomComponentRoute from '@/components/common/ButtomComponentRoute.vue'
import ButtonComponent from '@/components/common/ButtonComponent.vue'
import { buscarCep } from '@/services/address'
import { criarEndereco } from '@/services/http'
import useAuthStore from '@/stores/auth'
import AddressList from '../AddressList.vue'

const auth = useAuthStore()

const modalRef = ref(null)
let modalInstance = null

function abrirModalEndereco() {
  modalInstance.show()
}

const endereco = ref({
  street: '',
  number: '',
  zip: '',
  city: '',
  state: '',
  country: 'Brasil',
})

async function getAddress() {
  try {
    const result = await auth.getAddressesUser()
    return result
  } catch (error) {
    console.error('Erro ao carregar endereços:', error)
  }
}

async function preencherEndereco() {
  try {
    const cepData = await buscarCep(endereco.value.zip)
    endereco.value.street = cepData.logradouro
    endereco.value.city = cepData.localidade
    endereco.value.state = cepData.uf
  } catch (error) {
    console.error(error.message)
    alert('CEP inválido ou erro ao buscar CEP.')
  }
}

async function salvarEndereco() {
  if (!endereco.value.zip || !endereco.value.street || !endereco.value.number || !endereco.value.city || !endereco.value.state) {
    alert('Preencha todos os campos obrigatórios!')
    return
  }

  try {
    const enderecoSalvo = await criarEndereco(endereco.value)
    auth.setAddress(enderecoSalvo)
    await getAddress()
    alert('Endereço salvo com sucesso!')
    modalInstance.hide()
  } catch (error) {
    console.error('Erro ao salvar endereço:', error)
    alert('Erro ao salvar endereço.')
  }
}

onMounted(() => {
  modalInstance = new Modal(modalRef.value)
  getAddress()
})
</script>

<template>
  <div class="d-flex justify-content-center align-items-center h-100">
    <div class="container" >
      <div class="d-flex flex-wrap gap-3 border rounded shadow-sm p-4 bg-white">
        <h1 class="fs-4 fw-bold text-primary m-0 d-flex align-items-center gap-2">
          <i class="bi bi-geo-alt-fill"></i> Meus endereços
        </h1>
  
        <div class="w-100">
          <ButtomComponentRoute
            v-if="auth.endereco.length < 2"
            :icon="'bi bi-house-add'"
            :title="'Adicionar Endereço'"
            :class="'orange'"
            class="w-100 w-md-auto d-flex justify-content-center gap-2"
            @click="abrirModalEndereco"
            />
          </div>
        </div>
        
        <!-- Modal -->
          <div class=" modal fade" ref="modalRef" aria-labelledby="modalEnderecoLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content ">
                <div class="modal-header">
                  <h5 class="modal-title" id="modalEnderecoLabel">Novo Endereço</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                </div>
      
                <div class="modal-body">
                  <form @submit.prevent="salvarEndereco">
                    <div class="mb-3">
                      <label for="zip" class="form-label">CEP</label>
                      <input type="text" id="zip" v-model="endereco.zip" @blur="preencherEndereco" class="form-control" />
                    </div>
                    <div class="mb-3">
                      <label for="street" class="form-label">Rua</label>
                      <input type="text" id="street" v-model="endereco.street" class="form-control" />
                    </div>
                    <div class="mb-3">
                      <label for="number" class="form-label">Número</label>
                      <input type="text" id="number" v-model="endereco.number" class="form-control" />
                    </div>
                    <div class="row">
                      <div class="mb-3 col-md-6">
                        <label for="city" class="form-label">Cidade</label>
                        <input type="text" id="city" v-model="endereco.city" class="form-control" />
                      </div>
                      <div class="mb-3 col-md-6">
                        <label for="state" class="form-label">Estado</label>
                        <input type="text" id="state" v-model="endereco.state" class="form-control" />
                      </div>
                    </div>
                    <div class="mb-3">
                      <label for="country" class="form-label">País</label>
                      <input type="text" id="country" v-model="endereco.country" class="form-control" />
                    </div>
      
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                      <ButtonComponent :title="'Salvar Alterações'" :class="'blue'" class="btn" />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
  
      <AddressList />
    </div>
  </div>
</template>

<style scoped>


@media (max-width: 768px) {
  .modal-dialog {
    
  }
}
</style>
