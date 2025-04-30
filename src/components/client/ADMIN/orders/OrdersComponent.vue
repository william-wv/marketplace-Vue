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

<template>
  <div class="d-flex justify-content-center mt-5 w-100 min-vh-100">
    <div class="col-md-8">
      <div class="d-flex gap-2 align-items-center mb-4">
        <i class="bi bi-boxes fs-3"></i>
        <h2 class="mb-0">Lista de Pedidos</h2>
      </div>

      <div v-if="orders.length === 0" class="alert text-center alert-info">
        Nenhum pedido encontrado.
      </div>

      <ul class="list-group">
        <li v-for="order in orders" :key="order.order_id"
            class="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <strong class="fs-5">Pedido #{{ order.order}}</strong>
          </div>
          <span>{{ order.status || 'Sem status' }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>




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
