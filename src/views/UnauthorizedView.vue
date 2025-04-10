
<script setup>

</script>

<template>
  <div class=" d-flex flex-column justify-content-center align-items-center vh-100 text-center">
    <div class="card shadow p-4 border-0" style="max-width: 500px;">
      <div class="card-body">
        <i class="bi bi-shield-lock-fill text-danger display-3 mb-3"></i>
        <h2 class="card-title text-danger">Acesso Negado</h2>
        <p class="card-text text-muted">
          Você não tem permissão para acessar esta página. Verifique suas credenciais ou entre em contato com o administrador.
        </p>
        <router-link to="/" class="btn btn-outline-danger mt-3">
          <i class="bi bi-house-door-fill me-2"></i> Voltar para a Home
        </router-link>
      </div>
    </div>
  </div>
</template>
