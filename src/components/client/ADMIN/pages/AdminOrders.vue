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
}
</style>
