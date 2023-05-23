<template>
  <div>
    <el-button @click="login"> 登录 </el-button>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'

const login = () => {
  router.push('/')
}
</script>

<style scoped></style>
