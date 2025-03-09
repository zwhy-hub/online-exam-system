<template>
  <div>
    <!-- 404 -->
    <div class="ex-404">
      <div class="ex-404__img">
        <img src="~@/assets/imgs/404.png" alt="404" />
      </div>
      <div class="ex-404__content">
        <h1>404</h1>
        <p>抱歉，您访问的页面不存在</p>
        <el-button type="primary" @click="goHome">返回首页</el-button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const goHome = () => {
  router.push('/')
}
</script>
<style lang="scss" scoped>
@include b(404) {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
  &__img {
    margin-bottom: 20px;
    img {
      width: 200px;
    }
  }
  &__content {
    text-align: center;
    h1 {
      font-size: 60px;
      margin-bottom: 20px;
    }
    p {
      font-size: 20px;
      margin-bottom: 20px;
    }
  }
}
</style>
