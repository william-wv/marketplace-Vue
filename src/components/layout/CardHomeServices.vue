<script setup>

const props = defineProps({
  title: String,
  subtitle: String,
  icon: String,
})

</script>

<template>


  <div class=" pt-5 cards ">
    <div class="div-cards text-center  d-flex flex-column  justify-content-center align-items-center w-100">
      <div class="div-icon text-center">
        <i :class="icon"></i>
      </div>
      <div class="pt-3 ">
        <h1>
          {{ title }}
        </h1>
        <h2>
          {{ subtitle }}
        </h2>
      </div>
    </div>
  </div>

</template>

<style scoped>
.cards{
  margin: 0 100px !important;
  
}

.div-cards {
  border:1px solid #ccc !important;
  padding: 20px !important;
  border-radius: 30px;
}

.div-icon {
  padding: 10px;
  border-radius: 30% 20%;
  width: max-content;
  background-color: var(--secundary);

  & i{
    font-size: 2rem;
  }
}

h1{
  font-size: 2.5rem;
}
h2{
  font-size: 1.2rem;
  color: var(--txt-h2);
}

@media (min-width:1000px) {

}
</style>