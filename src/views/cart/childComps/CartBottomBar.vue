<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
          :is-checked="isSelectAll"
          class="check-button"
      @click="checkClick"
      />
      <span>全选</span>
    </div>

    <div class="price">
      合计:{{totalPricel}}
    </div>

    <div class="calculate">
        去计算({{checkLength}})
    </div>

  </div>
</template>

<script>
import checkButton from "@/components/content/checkButton/CheckButton.vue";
import {mapGetters} from "vuex";
//import cartListItem from "@/views/cart/childComps/CartListItem.vue";

export default {
  name: "CartBottomBar",
  components:{
    checkButton
  },
  computed:{
    ...mapGetters(['cartList']),
    totalPricel(){
      return '￥'+this.$store.state.cartList.filter(item =>{
        return item.checked
      }).reduce((preValue,item) => {
        return preValue+(item.realPrice * item.count)
      },0).toFixed(2)
    },
    checkLength(){
      return this.cartList.filter(item => item.checked).length
    },
    isSelectAll(){
      if (this.cartList.length === 0 ) return false
      return !(this.cartList.filter(item => !item.checked).length)
      //return !this.cartList.find(item => !item.checked)
    }
  },
  methods:{
    checkClick(){
      if(this.isSelectAll){
        this.cartList.forEach(item => item.checked = false)
      }else  {
        this.cartList.forEach(item => item.checked = true)
      }
    }
  }
}
</script>

<style scoped>
  .bottom-bar{
    position: relative;
    display: flex;
    height: 40px;
    line-height: 40px;
    background-color: #eeeeee;
  }

  .check-content{
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
  }
  .check-button{
    /*flex: 1;*/
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }
  .price{
    margin-left: 15px;
    flex: 1;
  }
  .calculate{
    width: 90px;
    background-color: var(--color-tint);
    color: #eeeeee;
    text-align: center;
  }

</style>