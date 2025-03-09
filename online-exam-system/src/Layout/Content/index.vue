<template>
  <div class="ex-content">
    <router-view></router-view>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
@include b(content) {
  flex: 1;
  overflow: auto;
  margin-top: 60px;
  @include e(items) {
    padding: 10px;
    margin: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
}
</style>
