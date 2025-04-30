<script setup>
import { ref } from 'vue'
import useAuthStore from '@/stores/auth'
import UpdateUsr from './form/UpdateUsr.vue'
import ButtonComponent from '@/components/common/ButtonComponent.vue'
import CardUser from '@/components/layout/CardUser.vue'

const auth = useAuthStore()

</script>


<template>
  <header class="px-5 py-3 bord d-flex justify-content-between align-items-center">
    <div class="header">
      <h1 class="fs-2">Minha conta</h1>
      <p class="fs-4">Gerencie suas infos pessoais e preferencias</p>
    </div>
    <ButtonComponent @click="auth.logout()" :title="'Logout'" :class="'btn btn-outline-primary'"
      :icon="'bi bi-box-arrow-right'" />
  </header>
  <main class="d-flex align-items-center h-100">
    <aside class="col-5 m-5">
      <CardUser />
    </aside>

    <div class=" col-5 m-5">
      <UpdateUsr />
    </div>
  </main>

</template>

<style scoped>
.bord {
  border: 1px solid grey !important;
}

.h-100 {
  height: 80svh !important;
}
</style>
