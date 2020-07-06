import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// 本地存储
import Store from "store/storages/sessionStorage"

// local
// Store.set("user",{name:'sss',age:7878})
// console.log(Store.get("user"))
// session
// Store.write("user","90809")
// console.log(Store.read("user","90809"))

Vue.config.productionTip = false
import axios from 'axios'
// import {request} from '@network/request'

// request({
//   url:'login',
//   method:'post',
//   data:{
//     username:'admin',
//     password:'123456'
//   }
// }).then( data => {
//   console.log(data)
// })

// 输出看看是否跨域
/* axios({
  url:'http://127.0.0.1:8888/api/private/v1/login',
  method:'post',
  data:{
    username:'admin',
    password:'123456'
  }
}).then(data => {
  console.log(data)
}) */

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
