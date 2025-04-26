<script setup>
import User from '@/components/client/user/UserSection.vue';
import ButtonComponent from '@/components/common/ButtonComponent.vue';
import useAuthStore from '@/stores/auth';

const auth = useAuthStore()

</script>

<template>
  <section class=" card d-flex flex-column align-items-center gap-3"  style="width: 
  300px;">
    <div>
      <User />
    </div>
    <div>
      <h2 class="text-black fs-5">{{ auth.endereco[0]?.city }} - {{ auth.endereco[0]?.state }}</h2>
    </div>
      <ButtonComponent :title="'Change Image Profile'" :class="'blue'" :icon="'bi bi-card-image'" />
  </section>


</template>