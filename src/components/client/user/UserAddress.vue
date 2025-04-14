<script setup>
import ButtomComponentRoute from '@/components/common/ButtomComponentRoute.vue';
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

  <div class="card shipping-card p-3 m-2 p-3 rounded-4 shadow ">
      <h3>Default Shipping Address</h3>
      <p class="subtext">Your primary delivery address</p>
      <address v-for="addr in addresses">
        <div class="d-flex ">
          <ul class="card p-3">
            <li class="li-item text-secondary-emphasis">Zip: {{ addr.zip }}</li>
            <li class="li-item text-secondary-emphasis">Contry: {{ addr.country }}</li>
            <li class="li-item text-secondary-emphasis">State: {{ addr.state }}</li>
            <li class="li-item text-secondary-emphasis">City: {{ addr.city }}</li>
            <li class="li-item text-secondary-emphasis">Street: {{ addr.street }}</li>
            <li class="li-item text-secondary-emphasis">Number:  {{ addr.number }}</li>
          </ul>
        </div>
      </address>
      <div class="btns">
        <ButtomComponentRoute  :title="'Edit'" class="btn-edit orange"/>
        <ButtomComponentRoute :rota="'/update'" :title="'Add New'" class="btn-add blue" />
      </div>
    </div>
</template>

<style scoped>

</style>

