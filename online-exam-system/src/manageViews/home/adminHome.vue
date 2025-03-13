<template>
  <div class="ex-container">
    <div class="ex-header">
      <div class="ex-left">
        <div class="ex-title">快捷方式</div>
        <div class="ex-content">
          <div class="ex-card" v-for="item in leftNav" :key="item.name">
            <div class="ex-card__header" @click="handlePush(item.url)"></div>
            <div class="ex-card__text">{{ item.name }}</div>
          </div>
        </div>
      </div>
      <div class="ex-right">
        <div class="ex-title">数据统计</div>
        <div class="ex-stats">
          <div class="ex-card" v-for="(stat, index) in stats" :key="index">
            <div class="ex-card__value">{{ stat.value }}</div>
            <div class="ex-card__text">{{ stat.title }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="ex-charts">
      <div class="ex-title">图表展示</div>
      <div ref="chart1Ref" class="ex-chart"></div>
      <div ref="chart2Ref" class="ex-chart"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import * as echarts from 'echarts'
type EChartsOption = echarts.EChartsOption

const chart1Ref = ref<HTMLDivElement | null>(null)
const chart2Ref = ref<HTMLDivElement | null>(null)
const option = {
  title: {
    text: 'Nightingale Chart',
    subtext: 'Fake Data',
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)',
  },
  legend: {
    left: 'center',
    top: 'bottom',
    data: ['rose 1', 'rose 2', 'rose 3', 'rose 4', 'rose 5', 'rose 6', 'rose 7', 'rose 8'],
  },
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false },
      restore: { show: true },
      saveAsImage: { show: true },
    },
  },
  series: [
    {
      name: '半径模式',
      type: 'pie',
      radius: [20, 140],
      center: ['25%', '50%'],
      roseType: 'radius',
      itemStyle: {
        borderRadius: 5,
      },
      label: {
        show: false,
      },
      emphasis: {
        label: {
          show: true,
        },
      },
      data: [
        { value: 40, name: 'rose 1' },
        { value: 33, name: 'rose 2' },
        { value: 28, name: 'rose 3' },
        { value: 22, name: 'rose 4' },
        { value: 20, name: 'rose 5' },
        { value: 15, name: 'rose 6' },
        { value: 12, name: 'rose 7' },
        { value: 10, name: 'rose 8' },
      ],
    },
    {
      name: '面积模式',
      type: 'pie',
      radius: [20, 140],
      center: ['75%', '50%'],
      roseType: 'area',
      itemStyle: {
        borderRadius: 5,
      },
      data: [
        { value: 30, name: 'rose 1' },
        { value: 28, name: 'rose 2' },
        { value: 26, name: 'rose 3' },
        { value: 24, name: 'rose 4' },
        { value: 22, name: 'rose 5' },
        { value: 20, name: 'rose 6' },
        { value: 18, name: 'rose 7' },
        { value: 16, name: 'rose 8' },
      ],
    },
  ],
}

const router = useRouter()

// 快捷方式
const leftNav = ref([
  { name: '用户管理', url: '/manage/userManage/__userManage' },
  { name: '班级管理', url: '/manage/userManage/__classManage' },
  { name: '申请列表', url: '/manage/userManage/__orderManage' },
  { name: '管理员管理', url: '/manage/adminManage' },
  { name: '考试管理', url: '/manage/examManage/__examManage' },
  { name: '题目管理', url: '/manage/topicManage/__topicManage' },
  { name: '题库管理', url: '/manage/topicManage/__questionBankManage' },
  { name: '公告管理', url: '/manage/noticeManage' },
])

// 统计数据
const stats = ref([
  { title: '学生总数', value: 100 },
  { title: '及格考试', value: 80 },
  { title: '未及格考试', value: 20 },
  { title: '教师总数', value: 10 },
  { title: '题库数量', value: 500 },
  { title: '试卷数量', value: 50 },
])

const handlePush = (url: string) => {
  router.push(url)
}

// 初始化 ECharts
onMounted(() => {
  if (chart1Ref.value && chart2Ref.value) {
    const chart1 = echarts.init(chart1Ref.value)
    const chart2 = echarts.init(chart2Ref.value)

    chart1.setOption(option)
    chart2.setOption(option)

    // 监听窗口大小变化，自动调整图表大小
    window.addEventListener('resize', () => {
      chart1.resize()
      chart2.resize()
    })
  }
})
</script>
<style lang="scss" scoped>
@include b(container) {
  background-color: #f4f3f3;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
}
@include b(header) {
  display: flex;
  gap: 20px;
}
//左侧区域
@include b(left) {
  background-color: #fff;
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
@include b(title) {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}
@include b(content) {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
}
@include b(card) {
  background-color: #fff;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  text-align: center;
  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
  @include e(header) {
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f0f0f0;
    border-radius: 50%;
    cursor: pointer;
  }
  @include e(text) {
    font-size: 14px;
    color: #999;
  }
  @include e(value) {
    font-size: 24px;
    font-weight: bold;
  }
}
//右侧区域
@include b(right) {
  background-color: #fff;
  padding: 20px;
  flex: 1;
}
@include b(stats) {
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

@include b(charts) {
  flex: 1;
  background-color: #fff;
  padding: 20px;
}
.ex-chart {
  width: 100%;
  height: 400px;
}
</style>
