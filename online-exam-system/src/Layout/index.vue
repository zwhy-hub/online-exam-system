<template>
  <div class="ex-box">
    <Header />
    <Content class="ex-box__content" />
    <div class="ex-box__footer">在线考试系统 @2025-至今</div>
  </div>
</template>
<script setup lang="ts">
import Header from './Header/index.vue'
import Content from './Content/index.vue'
</script>
<style scoped lang="scss">
@include b(box) {
  @include bfc;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  @include e(content) {
    flex: 1;
  }
  @include e(footer) {
    height: 60px;
    line-height: 60px;
    text-align: center;
    // background-color: #f3f4f6;
    color: #7e7e7e;
    font-size: 10px;
  }
}
</style>
