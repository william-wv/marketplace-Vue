<script setup>
import { ref } from "vue";
import FooterList from "./FooterList.vue";
import FooterApps from "../pages/CardApps.vue";
import FooterComponent from "./FooterComponent.vue";

const categoryItens = ['Computers', 'SmartPhone', 'Headfone', 'Camera & Photo', 'TV & Homes']
const listCategories = ref(categoryItens)

const links = ['Shop Product', 'Shopping Cart', 'Wishlist', 'Compare', 'About Us']
const listLinks = ref(links)


</script>
<template>

  <section class="container__bottom-footer ">

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

    <div class="containter-box-category ">
      <div class="space">
        <FooterList :title="'Top category'" :lista="listCategories" />
      </div>
      <div class="space">
        <FooterList :title="'Quick links'" :lista="listLinks" />
      </div>
    </div>

    <div class="containter-box-apps ">
      <FooterApps :image="'/img/footer/apple.png'" :app="'Apple'" :desc="'Apple logo'" :text="'Get it now'" />
      <FooterApps :image="'/img/footer/googlePlay.png'" :app="'Google Play'" :desc="'Google Play logo'" :text="'Get it now'" />
    </div>
  </section>

  <FooterComponent/>
</template>

<style scoped>
.container__bottom-footer {
  background-color: var(--Gray-900);
  color: var(--White-050);
  padding: 30px 30px 0 30px;
}

.logo {
  padding: 20px 0;
}

.number-call h3 {
  margin-bottom: 5px !important;
}

.container-box-infos {
  width: 300px;

  & h2 {
    font-size: 1.3rem;
    cursor: pointer;
    color: var(--White-200)
  }

  & h3 {
    font-size: 1rem;
    cursor: pointer;
  }

  & div {
    margin-bottom: 10px !important;
  }
}

.containter-box-category {

  & div {
    margin-bottom: 15px !important;
  }
}

.containter-box-apps {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-top: 20px;
  max-width: 180px;

  & img {
    width: 40px;
    height: 40px;
  }
}


@media (min-width:768px) {
  .container__bottom-footer {
    display: flex;
  }

  .containter-box-apps {
    display: flex;
    justify-content: center;
  }
}

@media (min-width:1024px) {
  .container__bottom-footer {
    display: flex;
    justify-content: space-evenly;

    & .containter-box-category{
      display: flex;
      margin-top: 20px !important;

      & .space {
        margin-right: 20px !important;
      }
    }

    & .containter-box-apps {
      display: flex;
      justify-content: start;
    }
  }

}

@media (min-width:1440px) {
  .container__bottom-footer {
    display: flex;
    justify-content: space-evenly;

    & .containter-box-category{
      display: flex;
      margin-top: 20px !important;

      & .space {
        margin-right: 100px !important;
      }
    }

    & .containter-box-apps {
      display: flex;
      justify-content: start;
    }
  }

}
</style>