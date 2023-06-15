<template>
  <div>
    <nav-bar>
      <template #left >
        <div class="back" @click="backClick">
          <img src="@/assets/img/fanhui.png" alt="" >
        </div>
      </template>
      <template #center>
          <div class="title">
            <div v-for="(item,index) in titles" :key="item"
                 class="title-item"
                 :class="{active: index === currentIndex}"
                  @click="titleClick(index)">
              {{item}}
            </div>
          </div>
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar.vue";
export default {
  name: "DetailNavBar",
  components:{
    NavBar
  },
  data(){
    return{
      titles:['商品','参数','评论','推荐'],
      currentIndex:0
    }
  },
  methods:{
    titleClick(index){
        this.currentIndex = index
        this.$emit('titleClick',index)
    },
    backClick(){
      this.$router.push('/home')
    }

  }

}
</script>

<style scoped>
  .title{
    display: flex;
  }
  .title-item{
    flex:1;
  }
  .active{
    color: var(--color-high-text);
  }
  .back img{
      margin-top: 5px;
    width: 40px;
    height: 40px;
  }
</style>