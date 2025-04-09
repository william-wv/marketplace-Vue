<script setup>
// vue & js
import { useIsMobile } from '@/composable/useIsMobile';
// componentes
import IsAuthMobile from './isAuthMobile.vue';
import IsAuthDesktp from './isAuthDesktp.vue';
const { isMobile } = useIsMobile();
</script>

<template>

  <section v-if="isMobile">
    <IsAuthMobile/>
  </section>

  <section v-else>
    <IsAuthDesktp/>
  </section>
</template>

<style scoped>

</style>