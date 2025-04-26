<script setup >
import ButtonComponent from '@/components/common/ButtonComponent.vue';
import InnputName from '@/components/common/InnputName.vue';
import useAuthStore from '@/stores/auth';
import { ref } from 'vue';

const auth = useAuthStore()
const name = ref('')
const gmail = ref('')

async function updateProfiles() {
  auth.updateProfile({
    "name": name.value,
    "email": gmail.value
  })

  console.log("comp")
}

</script>

<template>
  <main class="card p-4">
    <h1 class="fs-1 text-primary">Personal Information</h1>
    <h2 class="fs-5">Update your personal information</h2>
    <form @submit.prevent="updateProfiles">
      <InnputName v-model="name" :icon="'bi bi-people'" :step-name="'Name'" />
      <InnputName v-model="gmail" :icon="'bi bi-at'" :step-name="'Mail'" />
      <ButtonComponent :icon="'bi bi-send'" :title="'Submit'" :class="'orange-w'"/>
    </form>
  </main>
</template>