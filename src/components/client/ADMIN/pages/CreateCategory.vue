<script setup>
import { ref } from 'vue';
import { createCategory } from '@/services/http';

import { push } from 'notivue';


import ButtonComponent from '@/components/common/ButtonComponent.vue';
import InnputName from '@/components/common/InnputName.vue';

const emit = defineEmits(['refreshCategories']);
const catName = ref('');
const catDesc = ref('');

async function enviarCat() {
  const categoriaCriada = await createCategory({
    name: catName.value,
    description: catDesc.value,
  })
  emit('refreshCategories')
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
}
</script>

<template>
    <RouterLink class="m-2" to="/dashboard/edit/admin/categories">
      <i class="bi bi-arrow-left-short"></i>
    </RouterLink>
 <h1 class="text-center mt-5 ">Create Category</h1>
    <div class="d-flex flex-column justify-content-center height-main m-5 mt-0 mb-0 ">
     
      <form @submit.prevent="enviarCat" class="card p-5">
        <InnputName :icon="'bi bi-alphabet-uppercase'" :stepName="'Category name'" v-model="catName" />
        <InnputName :icon="'bi bi-alphabet'" :stepName="'Category Description'" v-model="catDesc" />
        <div>
          <ButtonComponent :icon="''" :style="'blue'" :title="'Create'" />
        </div>
      </form>
    </div>
</template>

<style scoped>

.height-main{
  height: 80svh;
}

</style>