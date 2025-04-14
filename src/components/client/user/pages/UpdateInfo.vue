
<script setup>
import { ref } from 'vue'
import { buscarCep } from '@/services/address'

const endereco = ref({
  street: '',
  number: '',
  zip: '',
  city: '',
  state: '',
  country: 'Brasil',
})

async function preencherEndereco(endereco) {


}

</script>

<template>
  <div class="container mt-5">
    <div class="card shadow-sm rounded">
      <div class="card-body">
        <h2 class="card-title h4 mb-1">Address Information</h2>
        <p class="text-muted mb-4">Update your shipping and billing address</p>

        <form>
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
            <button type="button" class="btn btn-outline-secondary me-2">Cancel</button>
            <button type="submit" class="btn btn-primary">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>


<style scoped>


</style>
