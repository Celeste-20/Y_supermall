<template>
  <div>
    <scroll class="content">

    </scroll>
  </div>
</template>

<script>
import Scroll from "@/components/content/scroll/Scroll.vue";
export default {
  name: `profile`,
  components:{
    Scroll
  }
}
</script>

<style scoped>
  .content{
    height:300px;
    background-color: red;
    overflow: hidden;
  }
</style>
