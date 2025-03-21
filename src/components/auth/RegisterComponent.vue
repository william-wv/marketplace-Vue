<script setup>
// Component
import ButtonComponent from '../common/ButtonComponent.vue';
import InnputName from '../common/InnputName.vue';
import InputEmail from '../common/InputEmail.vue';
import InputPassword from '../common/InputPassword.vue';
import FooterComponent from '../layout/FooterComponent.vue';
import ContinueWith from './ContinueWith.vue';

// Vue & js
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth.js';
import { register } from '@/services/http.js';

// ref
const email = ref('');
const senha = ref('');
const name = ref('');

const auth = useAuthStore();

async function enviar() {
  console.log("Enviando:", {
    name: name.value,
    email: email.value,
    password: senha.value
  });
  const result = await register({
    name: name.value,
    email: email.value,
    password: senha.value
  })

  console.log("Resposta da API:", result);


  if (result.status >= 200 || result.status < 300) {
    alert('Conta criada com sucesso')
    auth.saveUser(result.data)
  }
  else {
    alert('Falha na criação do usuario')
  }
}

</script>

<template>
  <main class="pb-5">
    <RouterLink class="m-2" to="/">
      <i class="bi bi-arrow-left-short"></i>
    </RouterLink>

    <section v-if="!auth.isAuthenticated">
      <div class="contain">
        <!-- img -->
        <div class="d-none section-img">
          <img src="/icons/login/register-senha.svg" alt="">
          <RouterLink class="d-flex btn-center" to="/login">
            <ButtonComponent :title="'Sign In'" :style="'blue'" />

          </RouterLink>
        </div>

        <!-- register -->
        <div>


          <div class="texts">
            <h2>Compre +</h2>
            <h1>Create Your Account</h1>
            <p>Join our marketplace to discover amazing products</p>
          </div>
          <form @submit.prevent="enviar">
            <InnputName v-model="name" :step-name="'Name'" />

            <InputEmail v-model="email" :step-name="'Email'" />

            <InputPassword v-model="senha" :step-name="'Password'" />

            <!-- <InputPassword :step-name="'Confirm Password'" /> -->

            <ButtonComponent class="w-100" :title="'Submit'" :style="'blue'" />
          </form>
          <ContinueWith />

          <p class="text-center accont mt-3">Welcome back!
            <RouterLink to="/login">Login</RouterLink>
          </p>
        </div>
      </div>
    </section>

    <section v-else-if="auth.isAuthenticated">
      <div class="text-center space-title mb-5" style="color: var(--White-050);">
        <h1 class="mb-3">Welcome back!</h1>
        <h3>You're already signed in to your account</h3>
      </div>

      <div class="contain d-flex flex-column">
        <div class="circle">
      
        </div>
        <div>
          <p>Welcome, {{ auth.user.name }}</p>
          <h2>Email: {{ auth.user.email }}</h2>
        </div>
        <div>
          <h3>{{ auth.user.role }}</h3>
        </div>
        <div class="btns d-flex flex-column">
          <ButtonArrow 
            :text="'Go To My Account'" 
            :style="'blue'"
            @click="auth.logout()" 
          />
          <ButtonComponent :icon="'bi bi-box-arrow-right'" :title="'Logout'" :style="'red'" @click="auth.logout()" />
        </div>
      </div>

      <div class="cards_login d-grid">
        <CardsLogin :icon="'bi bi-bag'" :title="'Shopping Cart'" :num="1" :text="'Items waiting for checkout'"
          :btn_txt="'View Cart'" />
        <CardsLogin :icon="'bi bi-box-seam'" :title="'Recent orders'" :num="3" :text="'orders in the last 30 days'"
          :btn_txt="'View Orders'" />
        <CardsLogin :icon="'bi bi-heart'" :title="'Wishlist'" :num="6" :text="'Saved items for later'"
          :btn_txt="'View Cart'" />
      </div>

    </section>
  </main>
  <FooterComponent />
</template>

<style scoped>
main {
  background-color: var(--foreground);
  height: 54em;
}

.bi-arrow-left-short {
  font-size: 50px;
  padding: 10px;
}

.contain {
  background-color: var(--Gray-900);
  color: white;
  padding: 30px;
  margin: 20px !important;
  border-radius: 15px;
  text-align: center;
  align-items: center;
}

@media (min-width: 1024px) {
  .contain {
    display: flex !important;
    justify-content: space-around;
  }

  .section-img {
    display: flex !important;
    flex-direction: column;
    padding: 10px;
  }

  .section-img img {
    width: 400px;
    height: auto;
    object-fit: cover;
  }

  .accont {
    display: none;
  }

  .btn-center {
    justify-content: center;
  }
}

@media (min-width: 1920px) {
  img {
    width: 500px !important;
  }

  .contain {
    margin: 32px 350px !important;
  }

  .texts {
    font-size: 24px;
  }

  .section-img img {
    width: 500px;
    height: auto;
    object-fit: cover;
  }

  main {
    height: 57em;
  }
}
</style>