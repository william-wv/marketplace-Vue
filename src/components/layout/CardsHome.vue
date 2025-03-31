<script setup>


const props = defineProps({
  icon: String,
  title: String,
  num: Number,
  text: String,
  btn_txt: String,
  route: String,  
})

const number = props.num.toString()

</script>

<template>
  <section >
    <RouterLink :to=route>
    <div class="contain d-flex">
      <div class="p-1 div-icon">
        <i style="color: var(--Orange-500); opacity: 70%;"  class="icon" :class=icon></i>
      </div>
      <div class="texts">
        <h2 style="color: var(--White-050);" class="mt-2">{{ title }}</h2>
        <h2 style="color: var(--White-050);">{{ number }}</h2>
      </div>
      <div class="m-2">
        <i style="color: var(--White-050);" class="bi bi-arrow-right-short"></i>
      </div>
    </div>
  </RouterLink>
  </section>
</template>

<style scoped>
section {
  padding: 20px 20px;
}
a{
  color: var(--Gray-900);
}
.contain {
  width: 170px;
  background-color: var(--Blue-500);
  padding: 5px;
  border-radius: 10px;

  & .div-icon {
    width: 30%;
    display: flex;
    align-items: center;

    & i {
      font-size: 1.6rem;
    }
  }

  & .m-2 {
    display: flex;
    align-items: center;
  }

  & .texts {
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }

  & h2 {
    font-size: 1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  & p {
    font-size: 0.7rem;
  }
}

i {
  font-size: 1.5rem;
  color: var(--Gray-900);
}

</style>