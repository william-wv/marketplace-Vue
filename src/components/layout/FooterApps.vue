<script setup>

const info = defineProps({
  image: String,
  app: String,
  desc: String,
})

</script>

<template>
  <div class="contain d-flex">
    <div class="img">
      <img :src=image :alt=desc >
    </div>
    <div class="texts">
      <h3>Get it now</h3>
      <h2>{{ app }}</h2>
    </div>
  </div>
</template>

<style scoped>
  .contain{
    display: flex;
    margin: 20px 0 !important;
    padding: 10px 10px;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 20px;

  }
  .img{
    display: flex;
    align-items: center;
  }

  img{
    width: 45px;
    height: auto;
    margin-right: 5px !important;
  }

  .texts{
    width: 100%;
  }

</style>