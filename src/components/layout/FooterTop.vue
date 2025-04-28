<script setup>
import ButtonComponent from '@/components/common/ButtonArrow.vue';
import InputEmail from '../common/InputEmail.vue';
</script>

<template>
  <div class="my-4 py-4 bg-white d-flex justify-content-center align-items-center">
    <div class="row align-items-center gy-4">
      <div class="col-6 text-center">
        <h1 class="h4 fw-bold mb-2">Sign up for our newsletter</h1>
        <h2 class="h6 text-muted mb-0">
          Receive exclusive offers and updates directly to your email.
        </h2>
      </div>

      <div class="col-6">
        <form class="d-flex justify-content-center align-items-center gap-2 p-3">
          <div class="position-relative">
            <InputEmail />
          </div>
          <div>
            <ButtonComponent :text="'Sign up'" :style="'blue'" class="btn-newsletter" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.btn-newsletter {
  padding: 0.5rem 1.5rem;
}

.position-relative {
  top: 5px;
}
</style>
