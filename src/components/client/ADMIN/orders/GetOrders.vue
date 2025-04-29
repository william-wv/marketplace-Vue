  
  <script setup>
  import { ref, computed } from 'vue';
  import { getOrdersById } from '@/services/http';
  import ButtonComponent from '@/components/common/ButtonComponent.vue';

  import InputNumber from '@/components/common/InputNumber.vue';
  
  const id_Order = ref(0);
  const order = ref(null);
  const notGet = ref(false);
  
  const getOrderId = async () => {
    try {
      const resp = await getOrdersById(id_Order.value);
      order.value = resp;
      notGet.value = true;
    } catch (e) {
      console.error("Erro ao buscar pedido:", e);
      order.value = null;
      notGet.value = false;
    }
  };
  
  const statusClass = computed(() => {
    if (!order.value || !order.value.status) return '';
    const status = order.value.status.toUpperCase();
    switch (status) {
      case 'PENDING':
        return 'badge bg-warning text-dark';
      case 'PROCESSING':
        return 'badge bg-primary';
      case 'SHIPPED':
        return 'badge bg-info text-dark';
      case 'COMPLETED':
        return 'badge bg-success';
      case 'CANCELED':
        return 'badge bg-danger';
      default:
        return 'badge bg-secondary';
    }
  });
  </script>

<template>
  <form @submit.prevent="getOrderId" >
    <div class="d-flex align-items-center gap-2">
      <i class="fs-3 bi bi-box"></i>
      <h1>Get order</h1>
    </div>

    <InputNumber
      v-model="id_Order"
      :step-name="'Order id'"
      placeholder="Digite o ID do pedido"
    />
    <ButtonComponent
    :title="'Submit'"
      :class="'orange'"
    />
  </form>

  <section v-if="notGet && order" class="border rounded p-3 bg-light">
    <p><strong>Order Id:</strong> {{ order.id }}</p>
    <p><strong>Id do endereço:</strong> {{ order.address_id }}</p>
    <p><strong>Cupom usado:</strong> {{ order.coupon_id }}</p>
    <p>
      <strong>Status:</strong>
      <span :class="statusClass">{{ order.status }}</span>
    </p>
    <p><strong>Date:</strong> {{ order.order_date }}</p>
  </section>

  <section v-else class="text-danger mt-3">
    <p>Nenhum pedido encontrado</p>
  </section>
</template>

<style scoped>
form {
  max-width: 500px;
}
</style>
