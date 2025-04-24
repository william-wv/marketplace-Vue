<script setup>
import ListUser from '@/components/client/user/ListUser.vue';
import UserAddress from '@/components/client/user/UserAddress.vue';
import UserSection from '@/components/client/user/UserSection.vue';
import CardsHome from '@/components/layout/CardsHome.vue';


</script>

<template>
  <main>
    <div class="p-3">
        <div class="d-flex flex-column">
          <!-- <UserSection /> -->
          <!-- <UserAddress/> -->
      </div>
    </div>
  </main>
</template>

<style scoped>
main{
  height: 100%;
}

@media (min-width:1024px) {
  .flex-column {
    flex-direction: row !important;
  }
}

</style>