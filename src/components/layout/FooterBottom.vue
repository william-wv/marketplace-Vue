<script setup>
import { ref } from "vue";
import FooterList from "./FooterList.vue";
import FooterApps from "./FooterApps.vue";

const categoryItens = ['Computer', 'SmartPhone', 'Headfone', 'Camera & Photo', 'TV & Homes']
const listCategories = ref(categoryItens)

const links = ['Shop Product', 'Shopping Cart', 'Wishlist', 'Compare', 'About Us']
const listLinks = ref(links)


</script>
<template>

  <section class="container__bottom-footer d-flex">

    <div class="container-box-infos">
      <div class="logo">
        <h1>Compre +</h1>
      </div>
      <div class="texts-footer">
        <div class="number-call">
          <h3>Costumer Supports:</h3>
          <h2>(629) 555-0129</h2>
        </div>
        <div class="locate">
          <h3>4517 Washington Ave. Manchester, Kentucky 39495</h3>
        </div>
        <div class="email">
          <h2>info@compremais.com</h2>
        </div>
      </div>
    </div>

    <div class="containter-box-category d-flex">
      <div>
        <FooterList :title="'Top category'" :lista="listCategories" />
      </div>
      <div>
        <FooterList :title="'Quick links'" :lista="listLinks" />
      </div>
    </div>

    <div class="containter-box-apps">
      <FooterApps 
        :image="'/img/footer/apple.png'"
        :app="'Apple'"
        :desc="'Apple logo'"
      />
      <FooterApps 
        :image="'/public/img/footer/googlePlay.png'"
        :app="'Google Play'"
        :desc="'Google Play logo'"
      />
    </div>
  </section>



  <section class="container-footer-msg">
    <p>Kinbo - eCommerce Template © 2021. Design by Templatecookie</p>
  </section>

</template>

<style scoped>
.container__bottom-footer {
  background-color: var(--Gray-900);
  justify-content: space-evenly;
  align-items: center;
  padding: 20px 0;
  color: var(--White-000);
}

.container-box-infos{
  display: flex;
  width: 20%;
  flex-direction: column;
  gap: 10px;
}

.container-footer-msg {
  background-color: var(--Gray-900);
  
  & p {
    color: var(--White-050);
    text-align: center;
    padding: 5px 0;
  }
}

.texts-footer{
  gap: 10px;
  & h2{
    font-size: 1.5rem;
  }
  & h3 {
    font-size: 1rem;
  }
}

.number-call,.locate,.email {
  margin: 10px 0 !important;
}

.containter-box-category{
  gap: 0 100px ;
}

.texts-footer h2:hover{
  color: var(--Blue-700);
}
</style>