<script setup>
import { ref, onMounted, onUnmounted } from "vue";

import iconsData from "@/data/iconsHeaderBottom.json"

import useAuthStore from "@/stores/auth";

// Lista de itens (exemplo)
// const items = ref([
//   { id: 1, name: "Apple" },
//   { id: 2, name: "Banana" },
//   { id: 3, name: "Orange" },
//   { id: 4, name: "Grapes" },
// ]);
const icons = ref(iconsData)


const isMobile = ref(window.innerWidth <= 768);

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768;
};

onMounted(() => {
  window.addEventListener("resize", checkMobile);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkMobile);
});

// const searchQuery = ref("");

// Filtra os itens com base no campo de busca
// const filteredItems = computed(() => {
//   return items.value.filter(item => 
//     item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
//   );
// });

// store
const auth = useAuthStore();

</script>

<style scoped>
.container {
  max-width: 400px;
  margin: 20px auto;
}

input {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}
</style>
<template>
  <div class="container__header d-flex">

    <div v-if="isMobile" class="">
      <nav class="navbar">
        <div class="container-fluid">
          <!-- Logo (canto esquerdo) -->
          <RouterLink class="logo navbar-brand" to="/">Compre +</RouterLink>

          <!-- Botão de Toggle para abrir o menu lateral (canto direito) -->
          <button class="navbar-toggler ms-auto" type="button" data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>

      <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
        <div class="offcanvas-header">
          <h5 style="color:  var(--White-050);" class="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
          <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav">

            <RouterLink to="/">
              <li class="nav-item">
                Home
              </li>
            </RouterLink>

            <RouterLink to="/categories">
              <li class="nav-item">
                Categories
              </li>
            </RouterLink>
            <RouterLink to="/discounts">
              <li class="nav-item">
                Discounts
              </li>
            </RouterLink>
            <RouterLink to="/coupons">
              <li class="nav-item">
                Coupons
              </li>
            </RouterLink>
            <RouterLink to="/login">
              <li class="nav-item">
                About
              </li>
            </RouterLink>
          </ul>
        </div>
      </div>
    </div>

    <div v-else class="container-itens__header d-flex">
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
      <div v-for="icon in icons" :key="icon.id" class="icons">
        <RouterLink :to="icon.route">
          <img :src="icon.image" :alt="icon.desc">
        </RouterLink>

      </div>
      <div class="p-2">
        <p class="welcome" v-if="auth.isAuthenticated" style="color: var(--White-050);">
          Welcome <br>
          {{ auth.user.name }}</p>
      </div>
    </div>
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

a {
  color: var(--White-050) !important;
}

li {
  margin: 10px 0 !important;
  border: 1px solid var(--White-050);

}

.offcanvas {
  background-color: var(--Blue-700);
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

.container-itens__header {
  align-items: center;
  gap: 5px;
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