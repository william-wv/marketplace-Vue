<script setup>
import { ref } from 'vue';
import { createCategory } from '@/services/http';

import { push } from 'notivue';

import InnputName from '../common/InnputName.vue';

import ButtonComponent from '../common/ButtonComponent.vue';

const catName = ref('');
const catDesc = ref('');

async function enviarCat() {
  const categoriaCriada = await createCategory({
    name: catName.value,
    description: catDesc.value,
  })

  if (categoriaCriada.status === 422) {
    push.error({
      title: 'error category',
      message: '',
    });
    push.error('Fail create category');
  } else {
    push.success({
      title: 'Create category',
      message: '',
    });
  }

  window.location.reload()
}
</script>

<template>
<h1 class="text-center mb-3">Create <br> Category</h1>

  <form @submit.prevent="enviarCat">

    <InnputName :stepName="'Category name'" v-model="catName" />

    <InnputName :stepName="'Category Description'" v-model="catDesc" />

    <div>
      <ButtonComponent :icon="''" :style="'blue'" :title="'Create'" />
    </div>
  </form>

</template>

<style scoped></style>