<template>
  <div class="ex-header">
    <div class="ex-left">
      <div class="ex-left__logo">Java课程在线考试系统</div>
      <div class="ex-left__menu">
        <router-link to="/">首页</router-link>
        <router-link to="/exam">考试</router-link>
        <router-link to="/result">成绩</router-link>
        <router-link to="/about">关于</router-link>
      </div>
    </div>
    <div class="ex-right">
      <div class="ex-right__left">教师</div>
      <div class="ex-right__right">用户</div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
@include b(header) {
  width: 100%;
  height: 60px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-image: linear-gradient(rgb(243, 244, 246), rgba(243, 244, 246, 0));
  border-bottom: rgba(209, 213, 219, 0.1) solid 0.666667px;
  z-index: 1000;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  font-weight: 600;
  color: #333;
  transition: all 0.3s;
}
@include b(left) {
  display: flex;
  align-items: center;
  gap: 30px;
  @include e(logo) {
    margin-left: 30px;
    font-size: 24px;
    font-weight: 700;
    color: #00a6ac;
  }
  @include e(menu) {
    display: flex;
    gap: 30px;
    a {
      color: #333;
      text-decoration: none;
      &:hover {
        color: #00a6ac;
      }
    }
  }
}
@include b(right) {
  display: flex;
  gap: 30px;
  @include e(left) {
    margin-right: 30px;
    color: #00a6ac;
    cursor: pointer;
  }
  @include e(right) {
    margin-right: 30px;
    color: #00a6ac;
    cursor: pointer;
  }
}
</style>
