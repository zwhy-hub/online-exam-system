<template>
  <div class="ex-box">
    <Header />
    <Content />
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
  @include e(footer) {
    height: 60px;
    line-height: 60px;
    text-align: center;
    background-color: #f3f4f6;
    color: #333;
  }
}
</style>
