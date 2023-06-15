<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav"><template #center><div>购物街</div></template></nav-bar>

    <scroll class="content" ref="scroll"
            :property="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">

      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control
                   :titles="['流行','新款','精选']"
                   @tabClick="tabClick"
                    ref="tabControl"
                   :class="{fixed:isTabFixed}"/>
      <goods-list :goods="showGoods"/>
    </scroll>
    <!--组件不能监听事件点击，如果想监听 -->
    <back-top @click="backClick" v-show="isShowBackTop"/>

  </div>
</template>

<script>
  import HomeSwiper from "@/views/home/childComps/HomeSwiper.vue";
  import RecommendView from "@/views/home/childComps/RecommendView.vue";
  import featureView from "@/views/home/childComps/FeatureView.vue";

  import NavBar from '@/components/common/navbar/NavBar.vue'
  import TabControl from "@/components/content/tabControl/TabControl.vue";
  import goodsList from "@/components/content/goods/GoodsList.vue";
  import Scroll from "@/components/content/scroll/Scroll.vue";
  import BackTop from "@/components/content/backTop/BackTop.vue";

  import {getHomeMultidata,getHomeGoods} from "@/network/home"


  //import {debounce} from "@/common/utils";-->



  export default {
  name: `home`,
  components:{
    RecommendView,
    HomeSwiper,
    featureView,

    NavBar,
    TabControl,
    goodsList,
    Scroll,
    BackTop,

  },
  data(){
    return{
      banners:[],
      recommends: [],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]},
      },
      currentType:'pop',
      isShowBackTop:false,
      tabOffsetTop:0,
      isTabFixed: false,
      saveY:0
    }
  },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    activated() {
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0,this.saveY,0)

    },
    deactivated(){
      this.saveY = this.$refs.scroll.getScrollY()
    },

    created() {
    //请求多个数据
      this.getHomeMultidata()
      //请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },
     mounted() {
    // const refresh = debounce(this.$refs.scroll.refresh)
    //   this.$bus.$on('itemImageLoad',()=>{
    //     refresh()
    //   })
       //console.log(this.$refs.tabControl.$el.offsetTop)
     },

    methods:{
      /**
       * 事件监听相关
       */
      //防抖动

      tabClick(index){
        switch (index){
          case 0:
            this.currentType = 'pop'
                break
          case 1:
            this.currentType = 'new'
                break
          case 2:
            this.currentType = 'sell'
                break
        }
      },
      backClick(){
        //通过this.$refs.scroll去访问scroll内部的scroll
        this.$refs.scroll.scrollTo(0,0,500);
      },
      contentScroll(position){
        //1、判断BackTop是否显示
        this.isShowBackTop = (0-position.y) > 500
        //2、决定tabControl是否吸顶（position:fixed)
        this.isTabFixed = (0-position.y) > this.tabOffsetTop
      },
      loadMore(){
        this.getHomeGoods(this.currentType)
      },

      swiperImageLoad(){
        this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
      },
      /**
       * 网络请求相关
       */
      getHomeMultidata(){
        getHomeMultidata().then(res =>{
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })},
      getHomeGoods(type){
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res=>{
           this.goods[type].list.push(...res.data.list)//
            this.goods[type].page += 1
            this.$refs.scroll.finishPullUp()

        })}

    }
  }
</script>

<style scoped>
  #home{
    height: 100vh;
    position: relative;
  }


  .home-nav{
    background-color:var(--color-tint);
    /*使用原生滚动时，为了让导航不跟随滚动而使用
    /*position: fixed;*/
    /*top:0px;*/
    /*left:0px;*/
    /*right: 0;*/
    /*z-index: 9;*/
  }

  .content{
    overflow: hidden;
    position: absolute;
    /*下面这些一定要写哦*/
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;
  }
  .fixed{
    position: fixed;
    left:0;
    right: 0;
    top: 44px;
  }
</style>
