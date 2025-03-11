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
      @select="handleSelect"
      unique-opened
      router
    >
      <el-menu-item :index="isAdmin ? '/manage/adminHome' : '/manage/teacherHome'">
        <el-icon><icon-menu /></el-icon>
        <template #title>首页</template>
      </el-menu-item>
      <el-sub-menu index="/manage/userManage">
        <template #title>
          <el-icon><location /></el-icon>
          <span>{{ isAdmin ? '用户管理' : '学生管理' }}</span>
        </template>
        <el-menu-item index="/manage/userManage/__userManage">
          {{ isAdmin ? '用户管理' : '学生管理' }}
        </el-menu-item>
        <el-menu-item index="/manage/userManage/__classManage">班级管理</el-menu-item>
        <el-menu-item index="/manage/userManage/__orderManage">申请管理</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="/manage/topicManage">
        <template #title>
          <el-icon><location /></el-icon>
          <span>题目管理</span>
        </template>
        <el-menu-item index="/manage/topicManage/__topicManage">题目管理</el-menu-item>
        <el-menu-item index="/manage/topicManage/__questionBankManage">题库管理</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="/manage/examManage">
        <template #title>
          <el-icon><location /></el-icon>
          <span>考试管理</span>
        </template>
        <el-menu-item index="/manage/examManage/__examManage">考试管理</el-menu-item>
        <el-menu-item index="/manage/examManage/__testPaperManage">试卷管理</el-menu-item>
        <el-menu-item index="/manage/examManage/__scoreManage">成绩管理</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="/manage/adminManage" v-if="idSuperAdmin">
        <el-icon><icon-menu /></el-icon>
        <template #title>管理员管理</template>
      </el-menu-item>
      <el-menu-item index="/manage/noticeManage" v-if="idSuperAdmin">
        <el-icon><document /></el-icon>
        <template #title>公告管理</template>
      </el-menu-item>
      <el-menu-item index="/manage/logData" v-if="idSuperAdmin">
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
import useUserStore from '@/stores/modules/user'

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
const activePath = ref(route.path)
const isCollapse = ref(false)
const isAdmin = ref(userStore ? userStore?.user?.role === 3 || userStore?.user?.role === 4 : false)
const idSuperAdmin = ref(userStore ? userStore?.user?.role === 4 : false)
const isTeacher = ref(userStore ? userStore?.user?.role === 2 : false)
const handleSelect = (key: string) => {
  activePath.value = key
}
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
  height: 89vh;
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
