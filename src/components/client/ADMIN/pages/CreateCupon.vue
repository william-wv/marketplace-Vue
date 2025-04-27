<script setup>
import { ref } from 'vue'
import { postCupon } from '@/services/cupons'
import { push } from 'notivue'

const code = ref('')
const discount = ref(0)
const startDate = ref('')
const endDate = ref('')

const enviarCupon = async () => {
  if (!code.value.trim()) {
    push.error('Código do cupom é obrigatório')
    return
  }
  
  if (!startDate.value || !endDate.value) {
    push.error('Datas de início e fim são obrigatórias')
    return
  }

  const payload = {
    code: code.value,
    discount_percentage: discount.value,
    start_date: new Date(startDate.value).toISOString(),
    end_date: new Date(endDate.value).toISOString()
  }

  const res = await postCupon(payload)
  if (res && res.status === 201) {
    push.success('Cupom criado com sucesso!')
  } else {
    push.error('Erro ao criar cupom!')
    console.error('Erro detalhado:', res?.data || res)
  }
}
</script>

<template>
  <div class=" h-100 d-flex align-items-center justify-content-center">
    <div class="col-md-6">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title text-center mb-4">Criar Cupom</h4>
          <div class="mb-3">
            <label for="code" class="form-label">Nome do cupom</label>
            <input v-model="code" type="text" id="code" class="form-control" placeholder="Digite o nome do cupom" />
          </div>
          <div class="mb-3">
            <label for="discount" class="form-label">Desconto (%)</label>
            <select v-model.number="discount" id="discount" class="form-control">
              <option value="0" disabled selected>Selecione o desconto</option>
              <option value="5">5%</option>
              <option value="10">10%</option>
              <option value="15">15%</option>
              <option value="20">20%</option>
              <option value="25">25%</option>
              <!-- Adicione mais opções conforme necessário -->
            </select>
          </div>
          <div class="mb-3">
            <label for="startDate" class="form-label">Data de Início</label>
            <input v-model="startDate" type="datetime-local" id="startDate" class="form-control" />
          </div>
          <div class="mb-3">
            <label for="endDate" class="form-label">Data de Término</label>
            <input v-model="endDate" type="datetime-local" id="endDate" class="form-control" />
          </div>
          <button @click="enviarCupon" class="btn btn-primary w-100">Criar cupom</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.h-100 {
  height: 100svh !important;
}
</style>
