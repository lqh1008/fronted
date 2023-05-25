import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
// import http from '@/utils/http'

export const useCounterStore = defineStore(
  'counter',
  () => {
    const count = ref(0)
    const doubleCount = computed(() => count.value * 2)
    function increment() {
      count.value++
    }

    const menu = ref([])

    // const getMenu = () => {
    //   console.log(111)
    //   return new Promise((resolve) => {
    //     http
    //       .request({
    //         url: '/v1/routes'
    //       })
    //       .then((res: any) => {
    //         resolve(res)
    //       })
    //   })
    // }

    // const setMenu = (data: any) => {
    //   menu.value = data
    // }

    return { count, doubleCount, menu, getMenu, setMenu }
  },
  {
    persist: {
      enabled: true, //Store中数据持久化生效
      strategies: [
        {
          // 自定义存储的 key，默认是 store.$id
          key: 'menu',
          // 可以指定任何 extends Storage 的实例，默认是 sessionStorage
          storage: localStorage,
          // state 中的字段名，按组打包储存
          paths: ['menu']
        }
      ]
    }
  }
)
