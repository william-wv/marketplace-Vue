<script setup>
import useAuthStore from '@/stores/auth';

const auth = useAuthStore()
</script>

<template>
  <section class="card gap-2 text-center p-4 "style="width: 
  300px;">
    <div><h1 class=" text-primary fs-4">Contact Info</h1></div>
    <div class="d-flex align-items-center">
      <i class="px-2 bi bi-envelope-at"></i>
      <h2 class="fs-6">{{ auth.user.email }}</h2>
    </div>
    <div class="d-flex align-items-center">
      <i class="px-2 bi bi-phone"></i>
      <h2 class="fs-6"> 47 999 237-2960 </h2>
    </div>
    <div class="d-flex align-items-center">
      <i class="px-2 bi bi-calendar-day"></i>
      <h2 class="fs-6"> Entered in Apr '25 </h2>
    </div>
  </section>

</template>