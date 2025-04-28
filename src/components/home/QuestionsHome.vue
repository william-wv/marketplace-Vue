<template>
  <section class="py-5 bg-light">
    <div class=" text-center">
      <h2 class="mb-5">Por que comprar no MeuMarket?</h2>

      <div class="whybuy-container">
        <CardWhyBuy
          icon="bi-truck"
          title="Entrega Rápida"
          text="Entregamos em todo o Brasil com rapidez e segurança."
        />
        <CardWhyBuy
          icon="bi-shield-lock"
          title="Compra Segura"
          text="Seus dados estão protegidos e suas compras garantidas."
        />
        <CardWhyBuy
          icon="bi-credit-card"
          title="Pagamento"
          text="Cartões, boleto, Pix e parcelamento sem juros."
        />
        <CardWhyBuy
          icon="bi-clock"
          title="Atendimento 24h"
          text="Estamos sempre disponíveis para ajudar você."
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import CardWhyBuy from '../layout/CardWhyBuy.vue';
</script>

<style scoped>
.whybuy-container {
  display: flex;
  justify-content: center;
  gap: 2rem;
}

/* Responsividade */
@media (max-width: 992px) {
  .whybuy-container {
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .whybuy-container {
    flex-direction: column;
    align-items: center;
  }
}
</style>
