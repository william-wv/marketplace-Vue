<script setup>
import { onMounted, ref } from 'vue';
import { useOrderStore } from '@/services/OrdersUsers';

const useOrder = useOrderStore()
const orders = ref([]);
const loading = ref(true);
const error = ref(null);

const carregarPedidos = async () => {
  loading.value = true;
  try {
    const resp = await useOrder.fetchOrders();
    orders.value = resp.data;
  } catch (err) {
    error.value = 'Erro ao carregar pedidos';
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const deletarPedido = async (id) => {
  try {
    await useOrder.deleteOrder(id);
    orders.value = orders.value.filter(order => order.id !== id);
  } catch (err) {
    console.error("Erro ao deletar pedido:", err);
  }
};

function statusClass(status) {
  switch (status) {
    case 'PENDING':
      return 'badge bg-secondary';
    case 'PROCESSING':
      return 'badge bg-primary';
    case 'SHIPPED':
      return 'badge bg-info text-dark';
    case 'COMPLETED':
      return 'badge bg-success';
    case 'CANCELED':
      return 'badge bg-danger';
    default:
      return 'badge bg-light text-dark';
  }
}

onMounted(carregarPedidos);
</script>

<template>
  <div class="row ">
    <h3 class="mb-4 d-flex justify-content-center pt-5">Lista de Pedidos</h3>

    <div v-if="loading" class="text-muted">Carregando pedidos...</div>
    <div v-else-if="error" class="text-danger">{{ error }}</div>
    <div v-else-if="orders.length === 0">

      <div class="d-flex justify-content-center gap-3 align-items-center h-100">
        <i class="bi bi-box"></i>
        <p>Nenhum pedido encontrado !!</p>
      </div>
    </div>

    <div v-else class="d-flex flex-wrap justify-content-center">
      <div class="" v-for="order in orders" :key="order.id">
        <div v-if="order.status !== 'CANCELED'" class="mt-3">
          <div class="card card-body">
            <h5 class="card-title">Pedido #{{ order.id }}</h5>
            <p class="card-text mb-1">
              <strong>Status:</strong>
              <span :class="statusClass(order.status)">
                {{ order.status }}
              </span>
            </p>
            <p class="card-text mb-1"><strong>Endereço:</strong> {{ order.address_id }}</p>
            <p class="card-text mb-1"><strong>Cupom:</strong> {{ order.coupon_id || 'Nenhum' }}</p>
            <p class="card-text"><strong>Data:</strong> {{ order.order_date }}</p>

            <button class="btn btn-sm btn-outline-danger w-100" @click="deletarPedido(order.id)">
              Deletar Pedido
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.card-title {
  font-size: 1.1rem;
}

.h-100 {
  height: 80svh !important;
}
</style>
