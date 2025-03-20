<script setup>



const props = defineProps({
  image: String,
  app: String,
  desc: String,
  text: String,
})

const redirect = () => {
  if (props.app === 'Google') {
    window.location.href = 'https://accounts.google.com/ServiceLogin'; // Redireciona para o Gmail
  } else if (props.app === 'Facebook') {
    window.location.href = 'https://www.facebook.com/login'; // Redireciona para o Facebook
  }
};

</script>

<template>
  <div class="cont d-flex" @click="redirect">
    <div class="img">
      <img :src=image :alt=desc>
    </div>
    <div class="texts">
      <h3>{{ text }}</h3>
      <h2>{{ app }}</h2>
    </div>
  </div>
</template>

<style scoped>
.cont {
  display: flex;
  margin: 20px 0 !important;
  padding: 10px 10px !important;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  cursor: pointer;

  & h3 {
    font-size: 1.1rem;
  }

  & h2 {
    font-size: 1.3rem;
  }
}

.img {
  display: flex;
  align-items: center;
}

img {
  width: 45px;
  height: auto;
  margin-right: 5px !important;
}

.texts {
  width: 100%;
}

@media (min-width: 1440px) {
  

}

@media (min-width:1920px) {
  .cont{
    flex-direction: row;
    margin: 20px;
    padding: 15px !important;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    cursor: pointer;

    & h3 {
      font-size: 1.3rem;
    }

    & h2 {
      font-size: 1.5rem;
    }
  }
}
</style>