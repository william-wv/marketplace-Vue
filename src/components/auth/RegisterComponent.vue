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
import { register } from '@/services/http';
import { useAuthStore } from '@/stores/auth';

// ref
const email = ref('');
const senha = ref('');

const auth = useAuthStore();

async function enviar() {
  const result = await register({  
    name: name.value,
    email: email.value, 
    password: senha.value })

  if (result.status === 200) {
    alert('Login sucesso')
    auth.saveUser(result.data)
  }
  else {
    alert('Login falhou')
  }
}

</script>

<template>
  <main class="pb-5">
    <RouterLink class="m-2" to="/">
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
    <form @submit.prevent="enviar">
          <InnputName :step-name="'Name'"/>

          <InputEmail  :step-name="'Email'"/>

          <InputPassword :step-name="'Password'" />

          <InputPassword :step-name="'Confirm Password'" />
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
  .btn-center{
    justify-content: center;
  }
}

@media (min-width: 1920px) {
  img{
    width: 500px !important;
  }
  .contain{
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

  main{
    height: 57em;
  }
}

</style>