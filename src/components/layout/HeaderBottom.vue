<script setup>

import { ref } from "vue";
import iconsData from "@/data/iconsHeaderBottom.json"

// Lista de itens (exemplo)
// const items = ref([
//   { id: 1, name: "Apple" },
//   { id: 2, name: "Banana" },
//   { id: 3, name: "Orange" },
//   { id: 4, name: "Grapes" },
// ]);
const icons = ref(iconsData)

// const searchQuery = ref("");

// Filtra os itens com base no campo de busca
// const filteredItems = computed(() => {
//   return items.value.filter(item => 
//     item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
//   );
// });
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
    <div class="logo__header">
      <h1 class="logo">Compre +</h1>
    </div>
    <div class="busca__header">
      <input type="text" class="form-control" placeholder="Digite para buscar..." />

      <!-- <ul class="list-group mt-3">
          <li v-for="item in filteredItems" :key="item.id" class="list-group-item">
            {{ item.name }}
          </li>
        </ul> -->

    </div>
    <div class="container-itens__header d-flex">
      <div v-for="icon in icons" :key="icon.id" class="icons">
        <RouterLink :to="icon.route">
          <img :src="icon.image" :alt="icon.desc">
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
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


  input {
    height: 30px !important;
  }

  .form-control::placeholder {
    font-size: 0.7rem;
  }
}
</style>