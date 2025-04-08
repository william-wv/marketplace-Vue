<script setup>

import { editStock } from '@/services/http';
import { onMounted } from 'vue';


onMounted(() => {
  editStq(id);
});


async function editStq (id){
  const update = await editStock(id)
  return update.data;
}

onMounted(() => {
  editStq()
})

</script>

<template>
    <RouterLink class="m-2" to="/login">
      <i class="bi bi-arrow-left-short"></i>
    </RouterLink>

<main>

  
</main>
</template>