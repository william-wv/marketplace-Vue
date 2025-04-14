<script setup>
import ButtonComponent from '@/components/common/ButtonComponent.vue';
import useAuthStore from '@/stores/auth';
const auth = useAuthStore();

</script>

<template>
  <div class="card shipping-card p-3 m-2 p-3 rounded-4 shadow">
      <h3>Default Shipping Address</h3>
      <p class="subtext">Your primary delivery address</p>
      <address>
       
      </address>
      <div class="btns">
        <ButtonComponent :title="'Edit'" class="btn-edit orange" />
        <ButtonComponent :title="'Add New'" class="btn-add blue" />
      </div>
    </div>
</template>