    
    <script setup>
    const cards = [
      {
        title: 'Delete Orders',
        subtitle: 'Remova pedidos do sistema',
        description: 'Exclua pedidos antigos ou cancelados do banco de dados.',
        lastAccess: 'Hoje',
        color: 'danger',
        icon: 'bi bi-trash',
        route:'/dashboard/edit/delete'
      },
      {
        title: 'Gerenciar Orders',
        subtitle: 'Visualize e edite pedidos',
        description: 'Acesse todos os pedidos para visualizar detalhes e fazer alterações.',
        lastAccess: 'Ontem',
        color: 'primary',
        icon: 'bi bi-clipboard-data',
        route:'/dashboard/edit/gerenciar'
      },
      {
        title: 'DeleteOrders',
        subtitle: 'Exclusão em massa',
        description: 'Exclua múltiplos pedidos de uma só vez com filtros avançados.',
        lastAccess: '3 dias atrás',
        color: 'warning',
        icon: 'bi bi-trash3',
        route:'/dashboard/edit/deletePermanente'
      },
      {
        title: 'SocketOrder',
        subtitle: 'Atualizações em tempo real',
        description: 'Monitore pedidos em tempo real com atualizações instantâneas.',
        lastAccess: '1 semana atrás',
        color: 'success',
        icon: 'bi bi-wifi',
        route:'/dashboard/edit/socket'
      },
    ];
</script>

<template>
  <main class="container-fluid py-4 px-3 px-md-5">
    <h1 class="fw-bold mb-2">Dashboard</h1>
    <p class="text-muted mb-4">Gerencie suas ordens com as opções abaixo</p>

    <div class="row gy-4">
      <div class="col-12 col-md-6 col-xl-3" v-for="card in cards" :key="card.title">
        <router-link :to="card.route" class="text-decoration-none text-dark">
        <div class="card h-100 shadow-sm rounded-4 p-4 border-0">
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
          <p class="text-muted small">Último acesso: {{ card.lastAccess }}</p>
        </div>
        </router-link>
      </div>
    </div>
    <RouterView/>
  </main>
</template>

<style scoped>
.card {
  transition: transform 0.2s ease;
}

.card:hover {
  transform: scale(1.02);
}
</style>
