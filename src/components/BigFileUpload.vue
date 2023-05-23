<template>
  <div>
    <el-upload class="upload-demo" drag action="#" multiple :http-request="customUpload">
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
      <template #tip>
        <div class="el-upload__tip">jpg/png files with a size less than 500kb</div>
      </template>
    </el-upload>
    <el-button class="block" @click="handleUpload">上传</el-button>
  </div>
</template>

<script setup lang="ts">
import http from '@/utils/http'
import { UploadFilled } from '@element-plus/icons-vue'
import { ref } from 'vue'
// http.request('/v1/user').then((res) => {
//   console.log(res)
// })

const container = ref({
  file: null
})

const data = ref([])

const customUpload = ({ file }: { file: File }) => {
  if (!file) return
  container.value.file = file
  console.log('container===>', container)
}

const creatChunks = (file: File, size = 2 * 1024 * 1024) => {
  const fileChunkList = []
  let cur = 0
  while (cur < file.size) {
    fileChunkList.push({ file: file.slice(cur, cur + size) })
    cur += size
  }
  return fileChunkList
}

const uploadChunks = async () => {
  const requestList = data.value
    .map((chunk: any, hash: any) => {
      const formData = new FormData()
      formData.append('chunk', chunk)
      formData.append('hash', hash)
      formData.append('filename', container.value.file.name)
      return {
        formData
      }
    })
    .map(({ formData }: any) => {
      console.log(formData)
      return http.post({
        url: '/v1/multi-upload',
        data: formData
      })
    })
  await Promise.all(requestList)
  await mergeRequest()
  // console.log('requestList===>', requestList)
}

const mergeRequest = async () => {
  await http.post({
    url: '/v1/merge',
    header: {
      'content-type': 'application/json'
    },
    data: JSON.stringify({
      filename: container.value.file.name
    })
  })
}

// const handleUpload = ()=>{
//
// }

const handleUpload = async () => {
  if (!container.value.file) return
  const fileChunkList = creatChunks(container.value.file)
  data.value = fileChunkList.map((file: any, index) => {
    return {
      chunk: file,
      hash: container.value.file.name + '-' + index
    }
  })
  await uploadChunks()
}
</script>

<style scoped></style>
