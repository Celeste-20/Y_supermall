<template>
  <div class="check-button" :class="{check:isChecked}" @click="Checked">
    <div></div>
  </div>
  
</template>

<script>
export default {
  name: "CheckButton",
  props:{
    isChecked:{
      type:Boolean,
      default:false,
    }
  },
  methods:{
    Checked(){
      this.$emit('cchecked')
    },
  }

}
</script>

<style scoped>
  .check-button div{
    width:20px;
    height:20px;
    border-radius: 50%;
    border:1px solid #aaaaaa;
  }

  .check div{
    background-image: url("@/assets/img/detail/check_active.png");
    background-size:20px 20px;
  }
</style>