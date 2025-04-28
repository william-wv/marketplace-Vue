<template>
  <section class="py-5 bg-light">
    <div class="text-center">
      <h2 class="mb-5">Why shop at MeuMarket?</h2>

      <div class="whybuy-container">
        <CardWhyBuy
          icon="bi-truck"
          title="Fast Delivery"
          text="We deliver all over Brazil with speed and security."
        />
        <CardWhyBuy
          icon="bi-shield-lock"
          title="Secure Shopping"
          text="Your data is safe, and purchases are guaranteed."
        />
        <CardWhyBuy
          icon="bi-credit-card"
          title="Payment"
          text="Credit cards, boleto, Pix, and interest-free installments."
        />
        <CardWhyBuy
          icon="bi-clock"
          title="24/7 Support"
          text="We are always available to assist you."
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

/* Responsiveness */
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
