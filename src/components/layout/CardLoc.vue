<script setup>
import { getAddress } from '@/services/http'
import { defineEmits, onMounted, ref } from 'vue'

const emit = defineEmits(['select-address'])

const selectedAddress = ref(null)

function selectAddress(id) {
  selectedAddress.value = id
  emit('select-address', id)
}

const addresses = ref([])

async function fetchAddresses() {
  try {
    const response = await getAddress()
    if (Array.isArray(response)) {
      addresses.value = response
    } else {
      console.error('Unexpected data structure:', response)
    }
  } catch (error) {
    console.error('Error loading addresses:', error)
  }
}

onMounted(() => {
  fetchAddresses()
})
</script>

<template>
  <div class="container py-4">
    <div class="bg-light rounded p-4 shadow-sm">
      <h1 class="text-center text-primary mb-4">My Addresses</h1>

      <div v-if="addresses.length === 0">
        <h2 class="text-center text-black fs-4">
          You have no saved addresses. Please create a new one.
        </h2>
      </div>

      <div class="grid-container" v-else>
        <div 
          v-for="address in addresses" 
          :key="address.id"
          class="card"
          :class="{ 'card-selected': address.id === selectedAddress.value }"
          @click="selectAddress(address.id)"
        >
          <div class="card-body d-flex justify-content-center w-100 align-items-center">
            <div>
              <h5 class="card-title mb-0">
                <i class="bi bi-geo-alt-fill me-2 text-primary"></i>ZIP: {{ address.zip }}
              </h5>
              <p class="mb-1"><strong>Street:</strong> {{ address.street }}</p>
              <p class="mb-1"><strong>Number:</strong> {{ address.number }}</p>
              <p class="mb-1"><strong>City:</strong> {{ address.city }}</p>
              <p class="mb-1"><strong>State:</strong> {{ address.state }}</p>
              <p class="mb-1"><strong>Country:</strong> {{ address.country }}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.card {
  width: 100%;
  cursor: pointer;
  transition: transform 0.3s, background-color 0.3s;
  margin: 10px !important;
}

.card:hover {
  transform: scale(1.05);
}

.card-selected {
  border: 2px solid #007bff;
  box-shadow: 0 0 10px rgba(0, 123, 255, 0.3);
}
</style>
