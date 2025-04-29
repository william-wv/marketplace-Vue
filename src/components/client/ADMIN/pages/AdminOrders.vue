<<<<<<< HEAD
<template>
  <div>
    <h2>Lista de Pedidos</h2>
    <ul>
      <li v-for="order in orders" :key="order.order_id">
        Pedido #{{ order.order_id }} - Status: {{ order.status }}
      </li>
    </ul>
  </div>

</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import socket from '@/services/socket';

const orders = ref([]);
console.log(orders.value)
onMounted(() => {
  socket.on("connect", () => {
    console.log("Conectado com sucesso");
    socket.emit("get_all_orders");
  });

  socket.on("all_orders", (data) => {
    console.log("Orders recebidas:", data);
    orders.value = data;
  });

  socket.on("new_order", (data) => {
    console.log("Novo pedido:", data);
    orders.value.push(data);
  });

  socket.on("disconnect", () => {
    console.log("Desconectado");
  });
});

onUnmounted(() => {
  socket.off("connect");
  socket.off("all_orders");
  socket.off("new_order");
  socket.off("disconnect");
});
</script>

<style scoped>
/* Só um estilo básico */
ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 8px;
=======
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
>>>>>>> e6a293dc410a255436b122eac0bfca4d7348d207
}
</style>
