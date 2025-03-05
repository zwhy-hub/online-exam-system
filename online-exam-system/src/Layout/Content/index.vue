<template>
  <div class="ex-content">
    <div class="ex-content__items" v-for="item in 100" :key="item">{{ item }}</div>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
@include b(content) {
  flex: 1;
  overflow: auto;
  @include e(items) {
    padding: 10px;
    margin: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
}
</style>
