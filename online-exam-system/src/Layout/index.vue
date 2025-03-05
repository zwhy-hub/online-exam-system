<template>
  <div class="ex-box">
    <Header />
    <Content />
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
}
</style>
