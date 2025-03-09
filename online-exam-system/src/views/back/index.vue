<template>
  <div class="ex-container">
    <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
      <el-radio-button :value="false">expand</el-radio-button>
      <el-radio-button :value="true">collapse</el-radio-button>
    </el-radio-group> -->
    <el-menu
      :default-active="activePath"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
      unique-opened
    >
      <el-menu-item index="/manage/home">
        <el-icon><icon-menu /></el-icon>
        <template #title>首页</template>
      </el-menu-item>
      <el-sub-menu index="1">
        <template #title>
          <el-icon><location /></el-icon>
          <span>用户管理</span>
        </template>
        <el-menu-item index="1-1">用户管理</el-menu-item>
        <el-menu-item index="1-2">班级管理</el-menu-item>
        <el-menu-item index="1-3">申请管理</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="2">
        <template #title>
          <el-icon><location /></el-icon>
          <span>题目管理</span>
        </template>
        <el-menu-item index="2-1">题目管理</el-menu-item>
        <el-menu-item index="2-2">题库管理</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="3">
        <template #title>
          <el-icon><location /></el-icon>
          <span>考试管理</span>
        </template>
        <el-menu-item index="3-1">考试管理</el-menu-item>
        <el-menu-item index="3-2">试卷管理</el-menu-item>
        <el-menu-item index="3-3">成绩管理</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="4">
        <el-icon><icon-menu /></el-icon>
        <template #title>管理员管理</template>
      </el-menu-item>
      <el-menu-item index="5">
        <el-icon><document /></el-icon>
        <template #title>公告管理</template>
      </el-menu-item>
      <el-menu-item index="6">
        <el-icon><setting /></el-icon>
        <template #title>操作日志</template>
      </el-menu-item>
    </el-menu>
    <div class="ex-container__content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { Document, Menu as IconMenu, Location, Setting } from '@element-plus/icons-vue'
import { useRouter, useRoute } from 'vue-router'

const route = useRoute()
const router = useRouter()
const activePath = ref(route.path)
const isCollapse = ref(false)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>
<style lang="scss" scoped>
@include b(container) {
  display: flex;
  height: 86vh;
  @include e(content) {
    flex: 1;
  }
}

.el-menu-vertical-demo {
  width: 200px;
  height: 100%;
  border-right: 1px solid #e6e6e6;
}
</style>
