<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { Offcanvas } from "bootstrap";
import useAuthStore from "@/stores/auth";

// Detecta se está em um dispositivo móvel
const isMobile = ref(window.innerWidth <= 700);
const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768;
};

onMounted(() => {
  window.addEventListener("resize", checkMobile);
});

// Remove o event listener quando o componente for desmontado
onUnmounted(() => {
  window.removeEventListener("resize", checkMobile);
});

// Referência para o menu lateral
const offcanvasElement = ref(null);
let offcanvasInstance = null;

// Inicializa o Bootstrap Offcanvas
onMounted(() => {
  if (offcanvasElement.value) {
    offcanvasInstance = new Offcanvas(offcanvasElement.value);
  }
});

// Função para fechar o menu ao clicar em um link
const closeOffcanvas = () => {
  if (offcanvasInstance) {
    offcanvasInstance.hide();
  }
};

// store
const auth = useAuthStore();
</script>

<template>
  <div class="container__header d-flex">
    <section v-if="isMobile">
      <nav class="navbar">
        <div class="container-fluid">
          <RouterLink class="logo navbar-brand" to="/">Compre +</RouterLink>
          <button class="navbar-toggler ms-auto" type="button" data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>

      <div ref="offcanvasElement" class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasNavbarLabel" style="color: var(--White-050);">Menu</h5>
          <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav">
            <RouterLink class="d-flex" to="/" @click="closeOffcanvas">
              <div class="icon-flex"><i class="bi bi-arrow-left-short"></i></div>
              <li data-bs-dismiss="offcanvas" aria-label="Close" class="nav-item">Home</li>
            </RouterLink>
            <RouterLink class="d-flex" to="/login" @click="closeOffcanvas">
              <div class="icon-flex"><i class="bi bi-arrow-left-short"></i></div>
              <li class="nav-item">Login</li>
            </RouterLink>
            <RouterLink class="d-flex" to="/categories" @click="closeOffcanvas">
              <div class="icon-flex"><i class="bi bi-arrow-left-short"></i></div>
              <li data-bs-dismiss="offcanvas" aria-label="Close" class="nav-item">Categories</li>
            </RouterLink>
            <RouterLink class="d-flex" to="/discounts" @click="closeOffcanvas">
              <div class="icon-flex"><i class="bi bi-arrow-left-short"></i></div>
              <li data-bs-dismiss="offcanvas" aria-label="Close" class="nav-item">Discounts</li>
            </RouterLink>
            <RouterLink class="d-flex" to="/coupons" @click="closeOffcanvas">
              <div class="icon-flex"><i class="bi bi-arrow-left-short"></i></div>
              <li data-bs-dismiss="offcanvas" aria-label="Close" class="nav-item">Coupons</li>
            </RouterLink>
            <RouterLink class="d-flex" to="/shop" @click="closeOffcanvas">
              <div class="icon-flex"><i class="bi bi-arrow-left-short"></i></div>
              <li data-bs-dismiss="offcanvas" aria-label="Close" class="nav-item">Shop</li>
            </RouterLink>
          </ul>
        </div>
      </div>
    </section>
    <section v-else>
      <div class="container-itens__header d-flex w-100">
        <div class="logo__header">
          <RouterLink to="/">
            <h1 class="logo">Compre +</h1>
          </RouterLink>
        </div>

        <div class="busca__header">
          <input type="text" class="form-control" placeholder="Digite para buscar..." />

          <!-- <ul class="list-group mt-3">
          <li v-for="item in filteredItems" :key="item.id" class="list-group-item">
            {{ item.name }}
          </li>
        </ul> -->

        </div>

        <div class="p-2">
          <p class="welcome" v-if="auth.isAuthenticated" style="color: var(--White-050);">
            Welcome <br>
            {{ auth.user.name }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.content {
  margin-top: 56px;
  padding: 20px;
}

.navbar {
  width: 100svw;
  display: flex !important;
  justify-content: space-between !important;
}

i {
  font-size: 1.5rem;
}

a {
  color: var(--White-050) !important;
}


li {
  margin: 10px 0 !important;
  font-weight: 600;
}

li:hover {
  color: var(--Yellow-500) !important;
}

.offcanvas {
  background-color: var(--Blue-700);
  width: 40vw;
}

.container__header {
  box-shadow: inset 0px 2px 0px rgba(255, 255, 255, 0.1);
  background-color: var(--Blue-700);
  justify-content: space-evenly;
  padding: 10px 0;
  align-items: center;
}

h1 {
  color: var(--White-050);
  font-size: 2rem;
}

.busca__header {
  display: flex;
  align-self: center;
  width: 30vw;
}

.icon-flex{
  display: flex;
  align-items: center;
}

.container-itens__header {
  align-items: center;
  justify-content: center;
  gap: 30px;
}


@media (max-width: 450px) {
  .logo {
    font-size: 1.5rem;
  }

  .welcome {
    display: none;
  }

  input {
    height: 30px !important;
  }

  .form-control::placeholder {
    font-size: 0.7rem;
  }
}
</style>