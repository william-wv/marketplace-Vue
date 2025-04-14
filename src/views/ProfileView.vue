<script setup>
import ListUser from '@/components/client/user/ListUser.vue';
import UserAddress from '@/components/client/user/UserAddress.vue';
import UserSection from '@/components/client/user/UserSection.vue';


</script>

<template>
  <main>
    <div class="p-3">
      <div class="d-flex flex-column gap-3">
        <div class="">
          <UserSection />
          <ListUser />
        </div>
        <div>
          <UserAddress/>
        </div>
    
      </div>
    </div>
  </main>
</template>

<style scoped>
main{
  height: 100%;
}

@media (min-width:1400px) {
  .d-flex{
    flex-direction: row !important;
  }
}

</style>