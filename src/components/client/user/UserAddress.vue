<script setup>
import ButtonComponent from '@/components/common/ButtonComponent.vue';
import { getAddress } from '@/services/http';
import { onMounted, ref } from 'vue';

const addresses = ref([])

async function getAdd() {
  const responde = await getAddress()
  addresses.value = responde
  console.log(addresses.value)
}

onMounted(() => {
  getAdd()
})

</script>

<template>
  <main>
    <div class="card shipping-card p-3 m-2 p-3 rounded-4 shadow">
      <h3 class="text-warning">Default Shipping Address</h3>
      <p class="subtext">Your primary delivery address</p>

      <div class="addresses-container">

        <div v-for="addr in addresses" :key="addr.id" class="address-box border d-flex  p-3 m-2">
          <div class="d-flex  gap-2">
            <ButtonComponent :icon="'bi bi-trash'" :title="''" class="btn-edit red" />
            <ButtonComponent :icon="'bi bi-pen'" :title="''" class="btn-edit orange" />
          </div>
          <div>
            <ul class="p-0 m-0">
              <li class="li-item text-secondary-emphasis"><b>Zip:</b> {{ addr.zip }}</li>
              <li class="li-item text-secondary-emphasis"><b>Country:</b> {{ addr.country }}</li>
              <li class="li-item text-secondary-emphasis"><b>State:</b> {{ addr.state }}</li>
              <li class="li-item text-secondary-emphasis"><b>City:</b> {{ addr.city }}</li>
              <li class="li-item text-secondary-emphasis"><b>Street:</b> {{ addr.street }}</li>
              <li class="li-item text-secondary-emphasis"><b>Number:</b> {{ addr.number }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
li {
  font-size: 1rem !important;
  text-overflow: ellipsis !important;
  width: 200px;
}

ul{
  margin-left: 1rem !important;
}

.addresses-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
}

.address-box {
  width: 300px;
  list-style: none;
  border-radius: 10px;
  background-color: #f8f9fa;
}

@media (min-width: 1024px) {
  main {
    margin-left: 380px !important;
    width: 70svw;
  }

  .card {
    height: 95svh;
  }
}
</style>
