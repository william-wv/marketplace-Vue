<script setup>
// Component
import ButtonComponent from '../common/ButtonComponent.vue';
import InnputName from '../common/InnputName.vue';
import InputEmail from '../common/InputEmail.vue';
import InputPassword from '../common/InputPassword.vue';
import FooterComponent from '../layout/FooterComponent.vue';
import ContinueWith from './ContinueWith.vue';
import { push } from 'notivue';

// Vue & js
import { ref } from 'vue';
import { register } from '@/services/http.js';

// ref
const mail = ref('');
const senha = ref('');
const nome = ref('');


async function enviarRegister() {
  try {
    const result = await register({ 
    name: nome.value,
    email: mail.value, 
    password: senha.value })  

  if ( result.status == 201) {
    push.success({
      title: 'Register Sucessful',
      message: '',
    });
    console.log("Sucesso:", result.status);
  }

  if (result.status == 422) {
    errorMessage.value = 'Invalid email or password';
    push.error('Invalid email or password');
  }
  else {
    alert('Registro deu falha')
    console.log("Erro ou outro status:", result.status);
  }
  } catch (e) {
    console.log(e)
  }
  
}

</script>

<template>
  <main class="pb-5">
    <RouterLink class="m-2" to="/login">
      <i class="bi bi-arrow-left-short"></i>
    </RouterLink>

    <section>
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
          <form @submit.prevent="enviarRegister">
            
            <InnputName v-model="nome" :icon="'bi bi-person-add'" :step-name="'Name'"  />
            <InputEmail v-model="mail" :step-name="'Email'" />
            <InputPassword v-model="senha" :step-name="'Password'" />
            <!-- 
            <InputPassword :step-name="'Confirm Password'" /> 
            -->
            <ButtonComponent class="w-100" :title="'Submit'" :style="'blue'" />
          </form>
          <ContinueWith />
          <p class="text-center accont mt-3">Welcome back!
            <RouterLink to="/login">Login</RouterLink>
          </p>
        </div>
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