<script setup>
import CardContact from './layout/CardContact.vue';
import CardProfile from './layout/CardProfile.vue';
import UpdateProfile from './pages/UpdateProfile.vue';




</script>

<template>

  <div class="d-flex align-items-center h-100 gap-5 justify-content-center w-100">
    <aside class="d-flex flex-column align-items-center gap-2" style="max-width: 400px;">
      <CardProfile class="p-3" />
      <CardContact class="p-3"/>
    </aside>
    <main>
      <UpdateProfile class="p-5"/>
    </main>

  </div>

</template>

<style scoped>
.h-100 {
  height: 95svh !important;
}
</style>