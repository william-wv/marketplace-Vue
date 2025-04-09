<script setup>
// vue & js
import useAuthStore from '@/stores/auth.js';
// componentes
import ButtonComponent from '../common/ButtonComponent.vue';
import ButtonArrow from '../common/ButtonArrow.vue';
import CardsLogin from '../layout/CardsLogin.vue';
// store
const auth = useAuthStore();
</script>

<template>
    <div class="text-center space-title mb-5" style="color: var(--White-000);">
      <h1 class="mb-3">Welcome back!</h1>
      <h3>You're already signed in to your account</h3>
    </div>
    <div class="contain d-flex flex-column">
      <div class="circle">
        <h1 style="color: var(--White-000);">{{ auth.user.name.charAt() }}</h1>
      </div>
      <div>
        <p>Welcome, {{ auth.user.name }}</p>
        <h2>Email: {{ auth.user.email }}</h2>
      </div>
      <div>
        <h3>{{ auth.user.role }}</h3>
      </div>
      <div class="btns d-flex flex-column">
        <RouterLink to="/myaccount">
          <ButtonArrow :text="'Go To My Account'" :style="'blue'" />
        </RouterLink>
        <ButtonComponent :icon="'bi bi-box-arrow-right'" :title="'Logout'" :style="'red'" @click="auth.logout()" />
      </div>
    </div>

    <div class="cards_login d-grid">
      <!-- Cards User -->
      <CardsLogin :icon="'bi bi-bag'" :title="'Shopping Cart'" :num="1" :text="'Items waiting for checkout'"
        :btn_txt="'View Cart'" />
      <CardsLogin :icon="'bi bi-box-seam'" :title="'Recent orders'" :num="3" :text="'orders in the last 30 days'"
        :btn_txt="'View Orders'" />
      <CardsLogin :icon="'bi bi-heart'" :title="'Wishlist'" :num="6" :text="'Saved items for later'"
        :btn_txt="'View Cart'" />
      <!-- cards adimin and moderator -->
      <RouterLink to="/mystock">
        <CardsLogin v-if="auth.user.role === 'MODERATOR' || auth.user.role === 'ADMIN'" :icon="'bi bi-cart'"
          :title="'Stock'" :num="6" :text="'Saved items for later'" :btn_txt="'View Stock'" />
      </RouterLink>
      <!-- card -->
      <RouterLink to="/editModerator">
        <CardsLogin v-if="auth.user.role === 'ADMIN'" :icon="'bi bi-kanban'" :title="'Gerenciar'"
          :text="'Saved items for later'" :num="6" :btn_txt="'View Categories'" />
      </RouterLink>
    </div>
</template>
<style scoped>
.contain {
  background-color: var(--White-000);
  color: var(--Gray-600);
  padding: 30px;
  margin: 20px !important;
  border-radius: 15px;
  text-align: center;
  align-items: center;
  gap: 20px !important;
  & h1 {
    font-size: 2rem;
  }
  & h2 {
    font-size: 1rem;
    color: var(--Gray-600);
  }
  & h3 {
    font-size: 0.8rem;
  }
  & p {
    font-size: 1.3rem;
    padding-bottom: 5px;
  }
}
.circle {
  width: 80px;
  height: 80px;
  background-color: var(--Blue-100);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.btns {
  gap: 15px;
}
</style>