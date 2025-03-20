<script setup>

</script>

<template>
  <div class="mb-3">
    <label>Email</label>
    <div class="input-group">
      <span class="input-group-text"><i class="bi bi-envelope"></i></span>
      <input placeholder="name@exemple.com" type="text" class="form-control" required>
    </div>
  </div>
</template>

<style scoped>
@media (min-width:1920px) {
  .input-group{
    height: 60px !important;
  }

  input::placeholder{
    font-size: 1.6rem !important;
    position: relative;
    top: 10%;
  }

  i{
    font-size: 1.6rem !important;
  }
  
}
</style>