<script setup>
import User from '@/components/client/user/UserSection.vue';
import MyAccont from '@/components/client/user/pages/MyAccont.vue';
</script>


<template>
  <div class="d-flex">
    <!-- Lado fixo com componentes filhos sempre visíveis -->
    <aside class="col-2 position-sticky">
      <User />
      <MyAccont />
    </aside>

    <!-- Área onde as rotas mudam -->
    <section class="col-10">
      <RouterView />
    </section>
  </div>
</template>

<style scoped>
.d-flex {
  display: flex;
}

.col-2 {
  width: 20%;
}

.col-10 {
  width: 80%;
}

.position-sticky {
  position: sticky;
  top: 0;
}
</style>
