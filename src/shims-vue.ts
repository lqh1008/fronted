// Cannot find module '@/views/home/Home.vue' or its corresponding type declarations
// 因为 ts 没有编译 vue 文件
declare module '*.vue' {
  import { ComponentOptions } from 'vue'
  const componentOptions: ComponentOptions
  export default componentOptions
}
