<template>
  <el-form-item label="答案">
    <el-radio-group
      :model-value="modelValue"
      @update:model-value="emit('update:modelValue', $event)"
    >
      <el-radio label="0">错误</el-radio>
      <el-radio label="1">正确</el-radio>
    </el-radio-group>
  </el-form-item>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<style lang="scss" scoped></style>
