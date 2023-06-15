<template>
  <div id="detail">
    <detail-nav-bar class="detailNavBar" @titleClick="titleClick" ref="nav"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll">

      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>

    </scroll>

    <detail-bottom-bar @addCart="addToCart"/>
    <back-top @click="backClick" v-show="isShowBackTop"/>
<!--    <toast :message="message" :show="show"/>-->

  </div>
</template>

<script>
import DetailNavBar from "@/views/detail/childComps/DetailNavBar.vue";
import DetailSwiper from "@/views/detail/childComps/DetailSwiper.vue";
import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo.vue";
import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo.vue";
import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo.vue";
import DetailParamInfo from "@/views/detail/childComps/DetailParamInfo.vue";
import DetailCommentInfo from "@/views/detail/childComps/DetailCommentInfo.vue";
import DetailBottomBar from "@/views/detail/childComps/DetailBottomBar.vue";


import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "@/network/detail";
import {backTopMixin} from "@/common/mixin";

import Scroll from "@/components/content/scroll/Scroll.vue";
import GoodsList from "@/components/content/goods/GoodsList.vue";
import BackTop from "@/components/content/backTop/BackTop.vue";
// import Toast from "@/components/common/toast/Toast.vue";
export default {
  name: `Detail`,
  components:{
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailNavBar,
    DetailSwiper,
    DetailBottomBar,
    // Toast,

    Scroll,
    GoodsList,

    BackTop
  },
  mixins:[backTopMixin],
  data(){
      return{
        iid:null,
        topImages:[],
        goods:{},
        shop: {},
        detailInfo:{},
        paramInfo:{},
        commentInfo:{},//改
        recommends:[],
        themeTopYs:[],
        getThemeTopY:null,
        currentIndex:0,
        // message:'',
        // show:false,
      }
  },

  created() {
    //1、保存传入的iid
    this.iid = this.$route.params.iid
    //2、根据传入的iid请求详情数据
    getDetail(this.iid).then(res=>{
      //获取顶部的图片轮播数据
      const data =res.result;
      this.topImages=data.itemInfo.topImages
      //获取商品信息
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      //获取商家详情
      this.shop = new Shop(data.shopInfo)
      //滚动图之前的详情数据
      this.detailInfo = data.detailInfo;
      //获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      //取出评论信息
      if(data.rate.cRate !== 0){
       this.commentInfo = data.rate.list[0]
      }

      this.$nextTick(()=>{

        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        this.themeTopYs.push(Number.MAX_VALUE);
        //console.log(this.themeTopYs);
      })


      })

    //3、请求推荐数据
    getRecommend().then(res => {
       this.recommends = res.data.list
     })

   },

  methods:{
    imageLoad() {
      this.$refs.scroll.refresh();
    },
    titleClick(index){
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
    },
    contentScroll(position){

      const positionY = -position.y
      let length = this.themeTopYs.length
      for (let i =0;i < length-1; i++){
        if (this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])){
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }

      this.listenShowBackTop(position)
    },
    addToCart(){
      //获取购物车需要展示的信息
      const product={}
      product.image = this.topImages[0]
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.realPrice = this.goods.realPrice
      product.iid = this.iid

      //添加到购物车里
      //this.$store.commit('addCart',product)
      this.$store.dispatch('addCart',product).then(res=>{
        this.show = true;
        this.message = res;

        setTimeout(() => {
            this.show = false;
            this.message = '';
        },1500)
        //this.$tosat.show('请选择购买的商品',2000)
      })


    }


  },
}
</script>

<style scoped>
  #detail{
    position:relative;
    z-index:999;
    background-color: #fff;
    height: 100vh;
  }
  .detailNavBar{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content{
    height: calc(100% - 44px);
  }
</style>