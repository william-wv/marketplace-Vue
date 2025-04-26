<script setup>
import ButtonComponent from '@/components/common/ButtonComponent.vue';
import useAuthStore from '@/stores/auth';

const auth = useAuthStore()

async function deleteAdd(id) {
  const result = await auth.delAddressesUser(id)
  return result
}

function handleEdit(id) {
  console.log('Editar', id)
}

function handleDelete(id) {
  console.log('Excluir', id)
  deleteAdd(id)
}
</script>

<template>
  <div class="mt-2">
    <div
      class="card m-2 shadow-sm"
      v-for="(address, index) in auth.endereco"
      :key="index">
      <div class="card-body p-1">
        <div class="row">
          <div class="col-md-8">
            <ul class="list-group list-group-flush">
              <li class="list-group-item"><strong>CEP:</strong> {{ address.zip }}</li>
              <li class="list-group-item"><strong>País:</strong> {{ address.country }}</li>
              <li class="list-group-item"><strong>Estado:</strong> {{ address.state }}</li>
              <li class="list-group-item"><strong>Cidade:</strong> {{ address.city }}</li>
              <li class="list-group-item"><strong>Rua:</strong> {{ address.street }}</li>
              <li class="list-group-item"><strong>Número:</strong> {{ address.number }}</li>
            </ul>
          </div>
          <div class="col-md-4 d-flex flex-column justify-content-center align-items-end gap-2">
            <ButtonComponent
              :title="'Editar'"
              class="btn btn-outline-primary w-100"
              @click="() => handleEdit(address.id)"
            />
            <ButtonComponent
              :title="'Excluir'"
              class="btn btn-outline-danger w-100"
              @click="() => handleDelete(address.id)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  border-radius: 0.75rem;
}

.list-group-item {
  font-size: 1rem;
}

strong {
  color: var(--Orange-500); 
}
</style>
