
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
import FastClick from 'fastclick'
import VueLazyload from "vue-lazyload";
// import axios from 'axios'

createApp(App).use(router).use(store).use(VueLazyload).mount('#app')

//解决移动端的300ms延迟
FastClick.attach(document.body)

//使用懒加载插件
