<script setup>


import ButtonComponent from '@/components/common/ButtonComponent.vue';
import useAuthStore from '@/stores/auth';
const auth = useAuthStore();
</script>

<template>
  <main class="d-flex flex-column gap-4">
    <div>
      <h1>Account Overview</h1>
      <h3>Menage yir account settings and preferences</h3>
    </div>
   <ButtonComponent 
   class="btn-h"
   :title="'Edit Profile'"
   :class="'blue'"
   />
    <div class="card ">
      <p>adsa</p>
    </div>
  </main>
</template>

<style scoped>
.btn-h{
  width: 150px !important;
}

</style>