<template>
  <div class="ex-header">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
      router
    >
      <el-menu-item index="#">
        <div class="ex-left__logo">在线考试系统</div>
      </el-menu-item>
      <el-menu-item index="/">首页</el-menu-item>
      <el-menu-item index="/examList" v-if="isStudent">考试列表</el-menu-item>
      <el-menu-item index="/score" v-if="isStudent">我的成绩</el-menu-item>
      <el-menu-item index="/manage/teacherHome" v-if="isTeacher">教师入口</el-menu-item>
      <el-menu-item index="/manage/adminHome" v-if="isAdmin">后台入口</el-menu-item>
      <el-menu-item index="/reTeacher" v-if="isStudent">关联教师</el-menu-item>
      <el-sub-menu index="/user" v-if="currentUser">
        <template #title>用户</template>
        <el-menu-item index="/user">个人资料</el-menu-item>
        <el-menu-item @click="handleLogout">退出登录</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="/login" v-if="!currentUser">登录</el-menu-item>
    </el-menu>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import useUserStore from '@/stores/modules/user'

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
const activeIndex = ref(route.path)
const currentUser = ref(userStore.user)
const isAdmin = ref(
  currentUser ? currentUser?.value?.role === 3 || currentUser?.value?.role === 4 : false,
)
const isTeacher = ref(currentUser ? currentUser?.value?.role === 2 : false)
const isStudent = ref(
  currentUser ? currentUser?.value?.role === 1 || currentUser?.value?.role === 4 : false,
)
const handleSelect = (key: string) => {
  activeIndex.value = key
}

// 监听路由变化，更新 activeIndex
watch(
  () => route.path,
  (newPath) => {
    activeIndex.value = newPath
    if (newPath.startsWith('/manage') && isAdmin.value) {
      activeIndex.value = '/manage/adminHome'
    } else if (newPath.startsWith('/manage') && isTeacher.value) {
      activeIndex.value = '/manage/teacherHome'
    }
  },
)
const handleLogout = () => {
  localStorage.removeItem('USER')
  userStore.user = undefined
  router.push('/login')
}
</script>
<style lang="scss" scoped>
@include b(header) {
  width: 100%;
  height: 60px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  // background-image: linear-gradient(rgb(243, 244, 246), rgba(243, 244, 246, 0));
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
.el-menu-demo {
  width: 100%;
  background-image: linear-gradient(rgb(243, 244, 246), rgba(243, 244, 246, 0));
}
.el-menu--horizontal > .el-menu-item:nth-child(1) {
  margin-right: auto;
}
</style>
