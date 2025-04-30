<script setup>
import { ref, onMounted } from "vue";
import { format } from "date-fns";
import { useOrderStore } from "@/services/OrdersUsers";
import HeaderComponent from "./HeaderComponent.vue";

const ordersList = useOrderStore();
const loadingOrders = ref(new Set());

const statusOptions = [
  { value: "PENDING", label: "Pending" },
  { value: "PROCESSING", label: "Processing" },
  { value: "SHIPPED", label: "Shipped" },
  { value: "COMPLETED", label: "Completed" },
  { value: "CANCELED", label: "Canceled" },
];

onMounted(async () => {
  await ordersList.fetchAllOrders();
});

async function handleStatusChange(order) {
  try {
    loadingOrders.value.add(order.id);
    await ordersList.updateOrder(order.id, {
      order_id: order.id,
      status: order.status,
    });
    // Optional: refresh all orders or update locally
    await ordersList.fetchAllOrders();
    const index = ordersList.orders.findIndex(o => o.id === order.id);
    if (index !== -1) {
      ordersList.orders[index].status = order.status;
    }
  } catch (error) {
    console.error("Error updating order status:", error.response?.data || error);
  } finally {
    loadingOrders.value.delete(order.id);
  }
}

function getStatusLabel(status) {
  const map = {
    PENDING: "Pending",
    PROCESSING: "Processing",
    SHIPPED: "Shipped",
    COMPLETED: "Completed",
    CANCELED: "Canceled",
  };
  return map[status] || "Unknown";
}

function getStatusBootstrap(status) {
  const map = {
    PENDING: {
      badge: "bg-warning text-dark",
      border: "border-warning",
      icon: "bi bi-clock",
    },
    PROCESSING: {
      badge: "bg-primary text-white",
      border: "border-primary",
      icon: "bi bi-arrow-repeat",
    },
    SHIPPED: {
      badge: "bg-purple text-white",
      border: "border-purple",
      icon: "bi bi-truck",
    },
    COMPLETED: {
      badge: "bg-success text-white",
      border: "border-success",
      icon: "bi bi-check-circle",
    },
    CANCELED: {
      badge: "bg-danger text-white",
      border: "border-danger",
      icon: "bi bi-x-circle",
    },
  };
  return map[status] || {
    badge: "bg-secondary text-white",
    border: "border-secondary",
    icon: "bi bi-question-circle",
  };
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return isNaN(date) ? "Invalid date" : format(date, "dd/MM/yyyy HH:mm");
}

function getTotal(products) {
  return products.reduce((acc, p) => acc + parseFloat(p.price), 0).toFixed(2);
}
</script>

<template>
  <HeaderComponent />
  <div class="row g-4">
    <div class="col-md-4" v-for="order in ordersList.orders.filter(o => o.status !== 'CANCELED')" :key="order.id">
      <div class="card border-start border-4 shadow-sm" :class="getStatusBootstrap(order.status).border">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h5 class="card-title mb-0">
              <i class="bi bi-box-seam me-2"></i>ORD-{{ order.id }}
            </h5>
            <span class="badge rounded-pill d-flex align-items-center" :class="getStatusBootstrap(order.status).badge">
              <i :class="getStatusBootstrap(order.status).icon" class="me-1"></i>
              {{ getStatusLabel(order.status) }}
            </span>
          </div>

          <ul class="list-unstyled mb-3 text-muted small">
            <li class="text-black"><i class="bi bi-person me-1"></i> Customer: Simulated</li>
            <li class="text-black"><i class="bi bi-calendar-event me-1"></i> {{ formatDate(order.order_date) }}</li>
            <li class="text-black"><i class="bi bi-cart me-1"></i> {{ order.products.length }} item(s)</li>
            <li class="text-black"><i class="bi bi-currency-dollar me-1"></i> R$ {{ getTotal(order.products) }}</li>
            <li class="text-black"><i class="bi bi-geo-alt me-1"></i> Address ID: {{ order.address_id }}</li>
            <li class="text-black"><i class="bi bi-credit-card me-1"></i> Payment: Simulated</li>
          </ul>

          <div class="d-flex justify-content-between align-items-center">
            <button class="btn btn-link btn-sm p-0 text-decoration-none">
              <i class="bi bi-search"></i> Details
            </button>

            <div class="d-flex align-items-center">
              <select v-model="order.status" @change="() => handleStatusChange(order)"
                class="form-select form-select-sm w-auto" :disabled="loadingOrders.has(order.id)">
                <option v-for="opt in statusOptions" :key="opt.value" :value="opt.value">
                  {{ opt.label }}
                </option>
              </select>

              <div v-if="loadingOrders.has(order.id)" class="spinner-border spinner-border-sm text-primary ms-2"
                role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-purple {
  background-color: #a259ff !important;
}

.border-purple {
  border-color: #a259ff !important;
}
</style>
