<template>
  <div class="h-full">
    <h2 class="mb-2.5">长列表 -- 虚拟列表优化</h2>
    <div
      class="w-full h-200 relative border-solid border-2 overflow-auto"
      @scroll="handleScroll"
      ref="scrollBox"
    >
      <div
        class="absolute left-0 right-0 top-0 bottom-0 -z-1"
        :style="{
          height: data.length * itemHeight + 'px'
        }"
      ></div>

      <div class="absolute left-0 right-0 top-0 bottom-0" ref="content">
        <div
          v-for="item in visibleData"
          :style="{
            height: itemHeight + 'px'
          }"
          ref="box"
        >
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
// 需要
const data = ref<number[]>(Array.from({ length: 10000 }, (_, i) => 1 + i))
const content = ref(null)
const box = ref(null)
const itemHeight = ref(40)

const visibleData = ref([])

const scrollBox = ref(null)

const updateVisibleData = (scrollTop: number) => {
  const visibleDataCount = content.value.clientHeight / itemHeight.value
  const firstElIndex = Math.floor(scrollTop / itemHeight.value)
  visibleData.value = data.value.slice(firstElIndex, firstElIndex + visibleDataCount)
  content.value.style.webkitTransform = `translate3d(0, ${firstElIndex * itemHeight.value}px, 0)`
  console.log(content.value.style.webkitTransform)
}

const handleScroll = () => {
  updateVisibleData(scrollBox.value.scrollTop)
}

onMounted(() => {
  updateVisibleData(0)
})
</script>

<style scoped></style>
