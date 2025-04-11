<script setup>
// vue & js
import { ref , onMounted } from 'vue';
import { login } from '@/services/http';
import useAuthStore from '@/stores/auth.js';
import { cartService } from '@/services/http';
import router from '@/router';
// notificações
import { push } from 'notivue'
// componentes
import ButtonComponent from '../common/ButtonComponent.vue';
import InputEmail from '../common/InputEmail.vue';
import InputPassword from '../common/InputPassword.vue';
import ContinueWith from './ContinueWith.vue';
import IsAuth from './IsAuth.vue';
// refs
const email = ref('');
const senha = ref('');
const errorMessage = ref('');
// store
const auth = useAuthStore();
// functions
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

onMounted(() => {
  if (auth.user.id) {
    router.replace('/dashboard/myaccount')
  }
})
</script>

<template>
  <main>
    <section class="main1" v-if="!auth.isAuthenticated">
      <div class="backgraundI">
        <RouterLink class="m-2" to="/">
          <i class="bi bi-arrow-left-short arrow-white"></i>
        </RouterLink>
      </div>
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
            <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
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
      <IsAuth />
    </section>
  </main>
</template>

<style scoped>
.error-message {
  color: red;
  font-size: 0.9rem;
  margin-top: 5px;
}

.bi-arrow-left-short {
  font-size: 50px;
  padding: 10px;
}

main {
  background-color: var(--Blue-500);
}

.arrow-white {
  color: var(--White-000) !important;
}

.contain {
  background-color: var(--White-000);
  color: var(--Gray-800);
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