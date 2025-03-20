<script setup>

import ButtonArrow from '../common/ButtonArrow.vue';
import ButtonComponent from '../common/ButtonComponent.vue';
import InputEmail from '../common/InputEmail.vue';
import InputPassword from '../common/InputPassword.vue';
import FooterComponent from '../layout/FooterComponent.vue';
import CardApps from '../pages/CardApps.vue';

</script>

<template>
  <main class="pb-5 ">
    <RouterLink class="m-2" to="/">
      <i class=" bi bi-arrow-left-short"></i>
    </RouterLink>
    <div class="contain">


      <section class="telas-maiores">

        <div class="container_login-top d-block">
          <div class="logo d-none">
            <img src="/icons/login/login.svg" width="300" alt="img login">
          </div>
          <div>
            <h1 class="mb-2">Sign In</h1>
            <h2 class="mb-5">Sign in to your account to continue</h2>
            <form @submit.prevent="login">
              <InputEmail />

              <div>
                <div class="password-space d-flex mb-1">
                  <label for="password">Password</label>
                  <p class="forgot">forgot your password?</p>
                </div>
                <InputPassword />
              </div>
              <div class="d-flex">
                <input type="checkbox" required>
                <p class="space-acept">Aceito os termos e condições</p>
              </div>
              <div>
                <ButtonArrow class="w-100 mt-4 mb-2" :type="'submit'" :class="'btn btn-primary'" :text="'Sign in'" />
              </div>

              <div class="divider w-100 text-center mb-3 mt-3">
                <span>
                  <p>Or continue with</p>
                </span>
              </div>

              <div class="container-cards-form d-flex">
                <CardApps class="cardApps justify-content-center align-items-center text-center"
                  :image="'/src/assets/img/google.png'" :app="'Google'" :desc="'logo google'" />
                <CardApps class="cardApps justify-content-center align-items-center text-center"
                  :image="'/src/assets/img/face.png'" :app="'Facebook'" :desc="'logo facebook'" />
              </div>

              <p class="text-center accont mt-3">Don't have an account?
                <RouterLink to="/register">Register</RouterLink>
              </p>
            </form>

          </div>
        </div>

        <div class="container_login-bottom d-none">

          <div>
            <img src="/icons/login/login.svg" width="500px" alt="img login">
          </div>
          <h1 class="text-signup">Sign up and discover a great amount <br> of new opportunities!</h1>
          <div class="btn-signup">
            <RouterLink to="/register">
            <ButtonComponent class="btn-principal" :title="'Sign Up'" :style="'blue'" />
          </RouterLink>
          </div>
        </div>

      </section>
    </div>
  </main>
  <FooterComponent  />
</template>

<style scoped>
.contain {
  padding: 20px;
}

.bi-arrow-left-short {
  font-size: 50px;
}

main {
  background-color: var(--foreground);
}

h2 {
  color: var(--text-h2);
  font-size: 1rem;
}

.container_login-top {
  background-color: var(--Gray-900);
  color: white;
  padding: 30px;
  border-radius: 15px;
}

.password-space {
  display: flex;
  justify-content: space-between;
}

.forgot {
  color: var(--text-h2);
  cursor: pointer;
  font-size: 0.8rem;
}

.input-group-text {
  cursor: pointer;
}

.forgot:hover {
  text-decoration: underline;
}
.space-acept{ 
  position: relative;
  left: 10px;
}
.divider {
  display: flex;
  align-items: center;
  text-align: center;
  color: #aaa;
  font-size: 12px;
  text-transform: uppercase;
  margin: 20px 0;
}

.divider::before,
.divider::after {
  content: "";
  flex: 1;
  border-bottom: 1px solid #555;
  margin: 0 10px;
}

.container-cards-form {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;

  & .cardApps:hover {
    background-color: var(--shadow);
  }
}

@media (min-width: 1023px) {
  .contain {
    display: flex !important;
    justify-content: center;
  }

  .telas-maiores {
    display: flex !important;

  }

  .container_login-bottom {
    display: block !important;
    justify-content: center !important;
    /* Centraliza os itens */
    align-items: center !important;
  }

  .pb-5 {
    padding: 60px !important;
  }

  .btn-signup {
    display: flex;
    justify-content: center;
  }

  .text-signup {
    color: var(--text-h2) !important;
    font-size: 1rem;
    text-align: center;
    margin-bottom: 30px !important;

  }

  .accont{
    display: none;
  }
}

@media (min-width: 1440px) and (max-width: 1900px) {
  .contain{
    padding: 90px 0 !important;
  }

  .pb-5{
    padding: 10px !important;
  }
  
  h1, label{
    font-size: 1.5rem;
  }
}



@media (min-width: 1920px) {
  .pb-5{
    height: 95vh;
    padding: 0 25px !important;
  }

  .contain{
    padding: 0px 0;
  }

  .container_login-top {
    padding: 40px;
  }
  .container_login-bottom {
    padding: 30px;
  }

  .btn-signup {
    margin-top: 30px;
  }

  .text-signup {
    font-size: 1.3rem;
  }

  .container_login-top {
    font-size: 1.5rem;
  }

  .forgot {
    display: flex;
    align-items: end;
    margin-bottom: 5px !important;
    font-size: 1rem;
  }

  label {
    width: 30vw;
    padding: 3px;
  }

  .space-acept{ 
  font-size: 1.6rem;
  }

  .text-center {
    font-size: 1.4rem;
  }

  .btn-principal{
    font-size: 1.6rem;
  }

}
</style>
