<template>
  <div class="cart">
  <!--导航-->
    <nav-bar class="top">
      <template #center >购物车({{cartLength}})</template>
    </nav-bar>
  <!--商品列表-->
    <car-list />

  <!--底部汇总-->
    <cart-bottom-bar/>
  </div>

</template>

<script>
import NavBar from "@/components/common/navbar/NavBar.vue";
import CarList from "@/views/cart/childComps/CarList.vue";
import CartBottomBar from "@/views/cart/childComps/CartBottomBar.vue";
import {mapGetters} from "vuex";

export default {
  name: `cart`,
  components:{
    NavBar,
    CarList,
    CartBottomBar
  },
  computed:{
    ...mapGetters(['cartList','cartLength'])
    }

}
</script>

<style>
  .top{
    background-color: var(--color-tint);
    color: #ffffff;
    /*font-weight: 700;*/
  }

</style>

