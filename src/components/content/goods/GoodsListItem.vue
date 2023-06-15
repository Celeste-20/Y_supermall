<template>
  <div class="goods-list-item" @click="itemClick">
    <img v-lazy="showImage" alt="" class="goods-list-img" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price" >{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>

export default {
  name: "GoodsListItem",
  props:{
    goodsItem:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  computed:{
    showImage(){
      return (this.goodsItem.show&&this.goodsItem.show.img)||this.goodsItem.img
    }
  },
  methods:{
    imageLoad(){

      //this.$bus.$emit('itemImageLoad')
    },
    itemClick(){
      this.$router.push('/detail/' + this.goodsItem.iid)
    }

  }


}
</script>

<style scoped>
  .goods-list-item {
    padding-bottom: 60px;
    width: 49%;
    position: relative;
  }
  .goods-list-item img{
    width: 100%;
    border-radius: 10px;
    height: 100%;
  }
  .goods-info{
    font-size:12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }
  .goods-info p{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect{
    position: relative;
  }

  .goods-info .collect::before {
    content:"";
    position: absolute;
    left: -15px;
    top: 0;
    width: 14px;
    height: 14px;
    background: url(@/assets/img/home/collect_icon.png) 0 0/14px 14px;
  }

</style>