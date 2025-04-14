<script setup>

  import useAuthStore from '@/stores/auth';
  const auth = useAuthStore();

</script>

<template>
    <main>
      <p>{{ auth }}</p>
    </main>
</template>

<style scoped>

h1{
  color: black !important;
}

</style>