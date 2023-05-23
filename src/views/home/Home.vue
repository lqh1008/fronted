<template>
  <div class="p-2.5">
    <el-button
      v-for="btn in btnGroup"
      :key="btn.name"
      @click="curTab = btn.value"
      class="ml-2.5 mb-2.5"
    >
      {{ btn.name }}
    </el-button>
    <component :is="tabs[curTab]" class="p-2.5"></component>
  </div>
  <!--  <LongList />-->
</template>

<script setup lang="ts">
import LongList from '@/components/LongList.vue'
import BigFileUpload from '@/components/BigFileUpload.vue'
import Menu from '@/components/Menu.vue'
import { ref } from 'vue'

const tabs = {
  LongList,
  BigFileUpload,
  Menu
}

const curTab = ref('Menu')

const btnGroup = ref([
  {
    name: '长列表优化',
    value: 'LongList'
  },
  {
    name: '大文件上传',
    value: 'BigFileUpload'
  },
  {
    name: '菜单',
    value: 'Menu'
  }
])
</script>

<style scoped></style>
