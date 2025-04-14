<script setup>
import ListUser from '@/components/client/user/ListUser.vue';
import UserAddress from '@/components/client/user/UserAddress.vue';
import UserSection from '@/components/client/user/UserSection.vue';


</script>

<template>
  <main>
    <div class="p-3">
        <div class="d-flex flex-column">
          <UserSection />
          <!-- <ListUser /> -->
          <UserAddress/>
      </div>
    </div>
  </main>
</template>

<style scoped>
main{
  height: 100%;
}

.d-grid{
  grid-template-columns: repeat(1,1fr);
}

@media (min-width:1024px) {
  .flex-column {
    flex-direction: row !important;
  }
}

</style>