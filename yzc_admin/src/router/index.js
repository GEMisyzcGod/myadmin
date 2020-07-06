import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Login = () => import('@view/login/Login')
const User = () => import('@view/user/User')
const Rights = () => import('@view/users/Rights')
const Roles = () => import('@view/users/Roles')
const Users = () => import('@view/users/Users')

  const routes = [
  {
    path:'/',
    redirect:'/login'
  },
  {
    path:'/login',
    component:Login,
    name:'Login'
  },
  {
    path:'/user',
    component:User,
    name:'User',
    redirect:'/users',
    children:[
      {
        path:'/rights',
        component:Rights,
        name:'Rights'
      },
      {
        path:'/roles',
        component:Roles,
        name:'Roles'
      },
      {
        path:'/users',
        component:Users,
        name:'Users'
      }
    ]
  }
]

const router = new VueRouter({
  mode:'history',
  routes
})

export default router
