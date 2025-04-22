<script setup>
import { onMounted, ref } from 'vue';
import { getOrders , deleteOrders} from '@/services/OrdersUsers';

const orders = ref([]);
const loading = ref(true);
const error = ref(null);

const carregarPedidos = async () => {
  loading.value = true;
  try {
    const resp = await getOrders();
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
    await deleteOrders(id);
    orders.value = orders.value.filter(order => order.id !== id);
  } catch (err) {
    console.error("Erro ao deletar pedido:", err);
  }
};

onMounted(carregarPedidos);
</script>

<template>
  <div class="container mt-4">
    <h3 class="mb-4">Lista de Pedidos</h3>

    <div v-if="loading" class="text-muted">Carregando pedidos...</div>
    <div v-else-if="error" class="text-danger">{{ error }}</div>
    <div v-else-if="orders.length === 0" class="text-warning">Nenhum pedido encontrado.</div>

    <div v-else class="row gy-3">
      <div
        class="col-12 col-md-6 col-lg-4"
        v-for="order in orders"
        :key="order.id"
      >
        <div class="card shadow-sm h-100">
          <div class="card-body d-flex flex-column justify-content-between">
            <div>
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
            </div>

            <div v-if="order.status !== 'CANCELED'" class="mt-3">
              <button
                class="btn btn-sm btn-outline-danger w-100"
                @click="deletarPedido(order.id)"
              >
                Deletar Pedido
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
</script>

<style scoped>
.card-title {
  font-size: 1.1rem;
}
</style>
