<script setup >
import InnputName from '@/components/common/InnputName.vue';
import InputImage from '@/components/common/InputImage.vue';
import { ref } from 'vue';

const name = ref('')
const gmail = ref('')



</script>

<template>
  <main class="card p-4">
    <h1 class="fs-1 text-primary">Personal Information</h1>
    <h2 class="fs-5">Update your personal information</h2>
    <form class="">
      <InnputName :icon="'bi bi-people'" :step-name="'Name'" />

      <InnputName :icon="'bi bi-at'" :step-name="'Mail'" />
    </form>
  </main>
</template>