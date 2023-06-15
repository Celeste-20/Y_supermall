import { createStore } from 'vuex'
import mutations from "@/store/mutations";
import actions from "@/store/actions";
import getters from "@/store/getters";

// 创建一个新的 store 实例
const state={
    cartList:[],
    check:Boolean,
}

const store = createStore({
    state,
    mutations,
    actions,
    getters
})
export default store