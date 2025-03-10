<template>
  <div class="ex-container">
    <el-carousel :interval="4000" type="card" height="400px">
      <el-carousel-item v-for="item in srcList" :key="item.name">
        <el-image :src="item.url"></el-image>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
// const srcList = ref([
//   {
//     name: '1',
//     url: new URL('../../assets/imgs/1.jpg', import.meta.url).href,
//   },
//   {
//     name: '2',
//     url: new URL('../../assets/imgs/2.jpg', import.meta.url).href,
//   },
//   {
//     name: '3',
//     url: new URL('../../assets/imgs/3.jpg', import.meta.url).href,
//   },
//   {
//     name: '4',
//     url: new URL('../../assets/imgs/4.jpg', import.meta.url).href,
//   },
//   {
//     name: '5',
//     url: new URL('../../assets/imgs/5.jpg', import.meta.url).href,
//   },
// ])
const srcList = ref([
  {
    name: '1',
    url: '/src/assets/imgs/1.jpg',
  },
  {
    name: '2',
    url: '/src/assets/imgs/2.jpg',
  },
  {
    name: '3',
    url: '/src/assets/imgs/3.jpg',
  },
  {
    name: '4',
    url: '/src/assets/imgs/4.jpg',
  },
  {
    name: '5',
    url: '/src/assets/imgs/5.jpg',
  },
])
</script>
<style lang="scss" scoped>
// .el-carousel__item:nth-child(2n) {
//   background-color: #99a9bf;
// }

// .el-carousel__item:nth-child(2n + 1) {
//   background-color: #d3dce6;
// }
</style>
