//import Vue from 'vue'
import {createRouter, createWebHistory} from 'vue-router'

//Vue.use(createRouter)

const routes = [
  {
    path:'',
    redirect:'/home',
    component:() => import('@/views/home/home.vue')
  },{
    path:'/cart',
    component:() => import('@/views/cart/cart.vue')
  },
  {
    path:'/category',
    component:() => import ('@/views/category/category.vue')
  },{
    path:'/home',
    component:() => import('@/views/home/home.vue')
  },{
    path:'/profile',
    component:() => import('@/views/profile/profile.vue')
  },
  {
    path:'/detail/:iid',
    component:() => import('@/views/detail/Detail.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
