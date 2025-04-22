<script setup>
import UpdateOrders from '../orders/UpdateOrders.vue';
import OrdersComponent from '../orders/OrdersComponent.vue';
import DeleteOrders from '../orders/DeleteOrders.vue';
import GetOrders from '../orders/GetOrders.vue';
</script>

<template>
  <main class="container-fluid py-4 px-3 px-md-5">
    <div class="row gy-4 gx-md-5">
      
      <!-- Coluna Esquerda -->
      <div class="col-12 col-md-6 d-flex flex-column gap-4">
        <OrdersComponent style="height: 50svh;" />
        <GetOrders />
      </div>

      <!-- Coluna Direita -->
      <div class="col-12 col-md-6 d-flex flex-column gap-4">
        <UpdateOrders style="height: 50svh;" />
        <DeleteOrders />
      </div>

    </div>
  </main>
</template>

<style scoped>
main {
  min-height: 100vh;
  background-color: #f8f9fa;
}
</style>
