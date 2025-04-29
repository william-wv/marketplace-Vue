<script setup>
import { ref } from 'vue'
import useAuthStore from '@/stores/auth'
import InnputName from '@/components/common/InnputName.vue'
import ButtonComponent from '@/components/common/ButtonComponent.vue'


const auth = useAuthStore()

const email = ref('')
const nome = ref('')


function submit() {
  const payload = {
    name: nome.value,
    email: email.value
  }
  auth.putUserLog(payload)
}


</script>


<template>

  <form @submit.prevent="submit">
    <InnputName v-model="nome" :icon="'bi bi-person'" :step-name="'Name'" />
    <InnputName v-model="email" :icon="'bi bi-at'" :step-name="'Mail'" />

    <ButtonComponent :title="'Submit'" :class="'blue'" />
  </form>

</template>