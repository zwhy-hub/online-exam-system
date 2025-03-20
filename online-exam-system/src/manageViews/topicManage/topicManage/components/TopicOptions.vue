<template>
  <div>
    <div v-for="(item, index) in steps" :key="index">
      <el-input
        style="width: 240px; margin-right: 20px"
        v-model="item.selectInfo"
        placeholder="请输入选项"
      ></el-input>
      <el-checkbox
        v-model="item.checked"
        label="正确"
        size="large"
        style="margin-right: 20px"
        :disabled="
          topicType === 1 &&
          steps.filter((item) => item.checked).length > 0 &&
          !item.checked
        "
      />
      <el-button
        type="primary"
        plain
        @click="addStep"
        v-if="index === steps.length - 1"
      >
        添加选项
      </el-button>
      <el-button
        type="danger"
        plain
        @click="removeStep(index)"
        v-if="index !== 0 && index !== 1"
      >
        删除
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, withDefaults } from 'vue';
import { ElMessage } from 'element-plus';

interface Steps {
  selectInfo: string;
  checked: boolean;
}

const props = withDefaults(
  defineProps<{
    steps: Steps[];
    topicType: number;
  }>(),
  {
    steps: () => [],
    topicType: 1,
  }
);

const emit = defineEmits<{
  'update:steps': [value: Steps[]];
}>();

const addStep = () => {
  if (props.steps.length >= 7) {
    ElMessage.warning('最多添加7个选项');
    return;
  }
  const newSteps = [
    ...props.steps,
    {
      selectInfo: '',
      checked: false,
    },
  ];
  emit('update:steps', newSteps);
};

const removeStep = (index: number) => {
  if (props.steps.length <= 2) {
    ElMessage.warning('至少保留2个选项');
    return;
  }
  const newSteps = [...props.steps];
  newSteps.splice(index, 1);
  emit('update:steps', newSteps);
};
</script>

<style lang="scss" scoped></style>
