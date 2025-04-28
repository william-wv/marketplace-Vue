<script setup>
import DiscontIcons from '@/components/home/DiscontIcons.vue';
import QuestionsHome from '@/components/home/QuestionsHome.vue';
import SeeCategories from '@/components/home/SeeCategories.vue';
import HomeComponent from '@/components/pages/HomeComponent.vue';



</script>

<template>
  <main class="bg-light">
    <HomeComponent class="height"/>
    
    <SeeCategories />
    <DiscontIcons />

    <QuestionsHome/>
  </main>
</template>

<style scoped>

.height{
  height: 75svh !important;
}

</style>