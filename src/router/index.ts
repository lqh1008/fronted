import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/home/Home.vue'
import Login from '@/views/login/Login.vue'
// import { useCounterStore } from '@/stores/counter'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      children: [
        {
          path: '/login',
          name: 'login',
          component: Login
        }
      ]
    },
    {
      path: '/',
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'home',
          component: Home
        }
      ]
    }
  ]
})

router.beforeEach(async (to: any) => {
  // if (to.fullPath === '/home') {
  //   // 应该是登录后
  //   const store = useCounterStore()
  //   await store.getMenu().then((res: any) => {
  //     store.setMenu(res)
  //   })
  // }
  // router.addRoute({
  //   name: 'admin',
  //   path: '/admin'
  // })

  console.log('当前有的路由===>', router.getRoutes())
})
export default router
