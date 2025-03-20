<script setup>

const props = defineProps({
  text: String,
  style: String,
  types: String
})
</script>

<template>
  <Button :type=types :class=style  class="btnn" >
    <span class="bb">
       {{ text }}  
    </span>
    <span class="aa">
      <i class="bi bi-arrow-right"></i>
    </span>
 
  </Button>
</template>

<style scoped>


button {
  color: var(--White-000);
  padding: 10px;
  border-radius: 5px;
}
.aa{
  padding-left: 10px;
  
}
.orange{
  background-color: var(--Orange-500);
}

.blue{
  background-color: var(--Blue-700);
}


@media (min-width:1920px) {
  .btnn{
    font-size: 2rem !important;
  }
}
</style>