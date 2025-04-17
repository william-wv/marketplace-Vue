<script setup>
import ButtonComponent from '@/components/common/ButtonComponent.vue';
import InputName from '@/components/common/InnputName.vue';
import { postMod } from '@/services/gerUsers';
import { push } from 'notivue';
import { ref } from 'vue';

const nome = ref('')
const email = ref('')
const password = ref('')

async function postModerator() {
  const result = await postMod({
    name: nome.value,
    email: email.value,
    password: password.value,
    role: "MODERATOR"
  });

  if (result.status === 201) {
    push.success('Moderador criado');
  } else {
    push.error('Falha ao criar moderador');
  }
}
</script>

<template>
  <div class="d-flex justify-content-center align-items-center h-100">
    <form @submit.prevent="postModerator">
      <InputName :icon="'bi bi-people'" :step-name="'Nome do Moderador'" v-model="nome" />
      <InputName :icon="'bi bi-at'" :step-name="'Email do Moderador'" v-model="email" />
      <InputName :icon="'bi bi-123'" :step-name="'Senha do Moderador'" v-model="password" />

      <ButtonComponent :class="'blue'" :title="'Submit'" />
    </form>
  </div>
</template>

<style scoped></style>
