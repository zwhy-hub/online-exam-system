<template>
  <div class="ex-container">
    <div class="ex-header">
      <div class="ex-left">
        <div class="ex-title">快捷方式</div>
        <div class="ex-content">
          <div class="ex-content__card" v-for="item in leftNav" :key="item.name">
            <div class="ex-card__header" @click="handlePush(item.url)"></div>
            <div class="ex-card__text">{{ item.name }}</div>
          </div>
        </div>
      </div>
      <div class="ex-right">right</div>
    </div>
    <div class="footer">content</div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const leftNav = ref([
  {
    name: '用户管理',
    url: '/manage/userManage/__userManage',
  },
  {
    name: '班级管理',
    url: '/manage/userManage/__classManage',
  },
  {
    name: '申请列表',
    url: '/manage/userManage/__orderManage',
  },
  {
    name: '管理员管理',
    url: '/manage/adminManage',
  },
  {
    name: '考试管理',
    url: '/manage/examManage/__examManage',
  },
  {
    name: '题目管理',
    url: '/manage/topicManage/__topicManage',
  },
  {
    name: '题库管理',
    url: '/manage/topicManage/__questionBankManage',
  },
  {
    name: '公告管理',
    url: '/manage/noticeManage',
  },
])
const handlePush = (url: string) => {
  router.push(url)
}
</script>
<style lang="scss" scoped>
@include b(container) {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 20px;
  background-color: rgb(247, 246, 246);
  overflow: hidden;
}
@include b(header) {
  height: 350px;
  display: flex;
  justify-content: space-between;
  background-color: yellowgreen;
}
@include b(left) {
  flex: 2;
  background-color: red;
  display: flex;
  flex-direction: column;
}
@include b(content) {
  display: flex;
  flex-wrap: wrap;
  @include e(card) {
    width: 200px;
    height: 100px;
  }
}
@include b(footer) {
  flex: 1;
}
</style>
