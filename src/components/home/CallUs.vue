<script setup lang="ts">
import ButtonComponent from '../common/ButtonComponent.vue';

</script>

<template>
  <section class=" py-5 d-flex justify-content-center">
    <div class="container">
      <div class="row align-items-center bg-white p-4 rounded shadow">
        <!-- Text Column -->
        <div class="col-md-5 text-center">
          <img src="/src/assets/img/phone-call.png" alt="Customer Support" class="img-fluid" style="max-width: 250px; ">
        </div>
        <div class="col-md-7">
          <h2 class="mb-3" style="color: var(--Orange-500);"> Contact Us</h2>
          <p class="mb-4">Need help or have any questions? Our team is ready to assist you!</p>
          <ul class="list-unstyled mb-4">
            <li style="color: black;"><strong>Phone:</strong> <a href="tel:+15551234567"
                class="text-decoration-none text-dark">(555) 123-4567</a></li>
            <li style="color: black;"><strong>WhatsApp:</strong> <a href="https://wa.me/15551234567"
                class="text-decoration-none" style="color: var(--Orange-500);" target="_blank">Click here to chat</a>
            </li>
            <li style="color: black;">
              <strong>Business Hours:</strong> 
              Mon to Fri, 8 AM - 6 PM
            </li>
          </ul>

          <a href="tel:+15551234567">
            <ButtonComponent :title="'Call Us'" :class="'orange'" />
          </a>
        </div>



      </div>
    </div>
  </section>
</template>
