<script setup>
// vue & js
import { ref } from 'vue';
import { login } from '@/services/http';
import useAuthStore from '@/stores/auth.js';
import { cartService } from '@/services/http';

// notificações
import { push } from 'notivue'

// componentes
import ButtonComponent from '../common/ButtonComponent.vue';
import InputEmail from '../common/InputEmail.vue';
import InputPassword from '../common/InputPassword.vue';
import FooterComponent from '../layout/FooterComponent.vue';
import ContinueWith from './ContinueWith.vue';
import ButtonArrow from '../common/ButtonArrow.vue';
import CardsLogin from '../layout/CardsLogin.vue';

// refs
const email = ref('');
const senha = ref('');
const errorMessage = ref('');

// store
const auth = useAuthStore();

async function enviarLogin() {
  const result = await login({
    email: email.value,
    password: senha.value
  })


  const carrinho = await cartService.createCart();
  if (carrinho.error) {
    console.error(carrinho.message);
  } else {
    console.log('Carrinho criado com sucesso:', carrinho);
  }


  if (result.status == 200) {
    push.success({
      title: 'Login successful',
      message: 'Welcome back!',
    });
    auth.saveUser(result.data)
  }
  else {
    errorMessage.value = 'Invalid email or password';
    push.error('Invalid email or password');
  }
}

</script>

<template>
  <main class="pt-5 pb-5">
    <RouterLink class="m-2" to="/">
      <i class="bi bi-arrow-left-short"></i>
    </RouterLink>

    <section class="main1" v-if="!auth.isAuthenticated">
      <div class="contain">
        <div class="spacecc">
          <div class="texts mb-4 mt-5">
            <h2>Compre +</h2>
            <h1>Sign In</h1>
            <p>Sign in to your account to continue</p>
          </div>

          <form @submit.prevent="enviarLogin">
            <InputEmail :stepName="'Email'" v-model="email" />
            <InputPassword :stepName="'Password'" v-model="senha" />

            <!-- <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p> -->

            <ButtonComponent class="w-100" :title="'Login'" :style="'blue'" />
          </form>
          <ContinueWith />

          <p class="text-center accont mt-3">Don't have an account?
            <RouterLink to="/register">Sign Up</RouterLink>
          </p>
        </div>

        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

        <div class="d-none section-img">
          <img src="/icons/login/register-senha.svg" alt="">
          <RouterLink class="d-flex btn-center" to="/register">
            <ButtonComponent :title="'Sign Up'" :style="'blue'" />
          </RouterLink>
        </div>
      </div>
    </section>


    <section v-else>
      <div class="text-center space-title mb-5" style="color: var(--Blue-700);">
        <h1 class="mb-3">Welcome back!</h1>
        <h3>You're already signed in to your account</h3>
      </div>

      <div class="contain d-flex flex-column">
        <div class="circle">
          <h1 style="color: var(--Blue-700);">{{ auth.user.name.charAt() }}</h1>
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
          <CardsLogin v-if="auth.user.role === 'ADMIN'" :icon="'bi bi-tags'" :title="'Categories and Products'"
            :text="'Saved items for later'" :num="6" :btn_txt="'View Categories'" />
        </RouterLink>

      </div>

    </section>
  </main>
  <FooterComponent />
</template>
<style scoped>
.error-message {
  color: red;
  font-size: 0.9rem;
  margin-top: 5px;
}

main {
  background-color: var(--White-000) !important;
}

.bi-arrow-left-short {
  font-size: 50px;
  padding: 10px;
}

.space-title {
  gap: 30px;
}

.contain {
  background-color: var(--Blue-700);
  color: white;
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
    color: var(--White-000);
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
  background-color: var(--White-000);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.btns {
  gap: 15px;
}



@media (min-width: 1024px) {
  .main1 {
    height: 50em;
  }

  .contain {
    display: flex !important;
    justify-content: space-around;
  }

  .spacecc {
    width: 30vw;
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

  .cards_login {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width:1920px) {
  .main1 {
    height: 47em;
  }

  .contain {
    margin: 30px 350px !important;
  }

  .cards_login {
    margin: 30px 200px !important;
  }

  .contain {

    & h1 {
      font-size: 2.4rem;
    }

    & h2 {
      font-size: 1.6rem;
      color: var(--White-250);
    }

    & h3 {
      font-size: 0.8rem;
    }

    & p {
      font-size: 1.3rem;
      padding-bottom: 5px;

    }
  }
}
</style>