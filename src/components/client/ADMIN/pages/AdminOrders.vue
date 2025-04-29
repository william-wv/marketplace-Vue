<script setup>
const cards = [
  {
    title: 'Delete Orders',
    subtitle: 'Remove orders from the system',
    description: 'Delete old or cancelled orders from the database.',
    lastAccess: 'Today',
    color: 'danger',
    icon: 'bi bi-trash',
    route: '/dashboard/edit/delete'
  },
  {
    title: 'Manage Orders',
    subtitle: 'View and edit orders',
    description: 'Access all orders to view details and make changes.',
    lastAccess: 'Yesterday',
    color: 'primary',
    icon: 'bi bi-clipboard-data',
    route: '/dashboard/edit/gerenciar'
  },
  {
    title: 'Real-Time Orders',
    subtitle: 'Live order updates',
    description: 'Monitor orders in real time with instant updates.',
    lastAccess: '1 week ago',
    color: 'success',
    icon: 'bi bi-wifi',
    route: '/dashboard/edit/socket'
  },
];
</script>

<template>
  <main class="container-fluid py-4 px-3 px-md-5 custom-scroll  h-100">
    <h1 class="fw-bold mb-2">Dashboard</h1>
    <p class="text-muted mb-4">Manage your orders using the options below</p>

    <div class="row gy-4">
      <div class="col-12 col-md-6 col-xl-3" v-for="card in cards" :key="card.title">
        <router-link :to="card.route" class="text-decoration-none text-dark">
          <div class="card  shadow-sm rounded-4 p-4 border-0 hover-effect">
            <div class="d-flex align-items-center mb-3">
              <div
                :class="`icon bg-${card.color} bg-opacity-25 text-${card.color} rounded-circle d-flex align-items-center justify-content-center me-3`"
                style="width: 40px; height: 40px;">
                <i :class="card.icon"></i>
              </div>
              <h5 class="mb-0 fw-bold">{{ card.title }}</h5>
            </div>
            <p class="text-muted mb-1">{{ card.subtitle }}</p>
            <p class="text-muted small">{{ card.description }}</p>
            <p class="text-muted small">Last accessed: {{ card.lastAccess }}</p>
          </div>
        </router-link>
      </div>
    </div>

    <RouterView />

  </main>
</template>

<style scoped>
.h-100{
  height: 100svh !important;
}
.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background-color: #ffffff;
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}

.custom-scroll {
  scrollbar-width: none; 
  -ms-overflow-style: none; 
  overflow: hidden;
}

.custom-scroll::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.hover-effect {
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.hover-effect:hover {
  background-color: #f8f9fa;
}
</style>
