<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item
          v-for="(item,index) in cartList"
          :item-info="item"
          :key="index"/>
    </scroll>
  </div>
</template>

<script>
   import Scroll from "@/components/content/scroll/Scroll.vue";
   import CartListItem from "@/views/cart/childComps/CartListItem.vue";
   import {mapGetters} from "vuex";

  export default {
    name: "CarList",
    components:{
      Scroll,
      CartListItem
    },
    computed:{
      ...mapGetters(['cartList'])
    },
    activated() {
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  .cart-list{
    height: calc(100vh - 44px - 49px - 40px);
  }

  .content{
    height:100%;
    overflow: hidden;
  }
</style>