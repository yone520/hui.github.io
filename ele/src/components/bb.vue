<template>
    <!-- -->
    <div class="andy">
        <slot name="prepend"></slot>
        <el-input v-if="$attrs.type === 'input'" :placeholder="getPlacehloder($attrs.selectvalue, $attrs.options)" v-model="vals"></el-input>
        <el-date-picker
            v-if="['datetimerange', 'daterange'].includes($attrs.type)"
            v-model="vals"
            :type="$attrs.type"
            unlink-panels
            range-separator="至"
            format="YYYY-MM-DD HH:mm:ss"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :shortcuts="shortcuts"
        >
        </el-date-picker>
    </div>
    <!-- <abc type='input' v-model="formInline[item.model]"/> -->
</template>

<script lang="ts">
import { defineComponent, ref, unref, isReactive, toRefs, toRef, computed, watch } from 'vue'


export default defineComponent({
  name: 'Abc',
  props: {
      modelValue: [String, Number, Array],
  },
  emits: {
      'update:modelValue': null,
  },
  components: {
  },
  setup(prop, ctx) {
    const vals = ref(prop.modelValue)
    watch(() => prop.modelValue, () => {
        vals.value = prop.modelValue
    })
    watch(() => vals.value, () => {
        ctx.emit('update:modelValue', vals.value)
    })
    const getPlacehloder = (selectVal: string, options: any[]) => {
        const val = options.find(item => item.value === selectVal);
        if (val) {
            return val.placeholder
        } else {
            return '请输入内容'
        }
    }
    const shortcuts = ref([{
      text: '最近一周',
      value: (() => {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
        return [start, end]
      })(),
    }, {
      text: '最近一个月',
      value: (() => {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
        return [start, end]
      })(),
    }, {
      text: '最近三个月',
      value: (() => {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
        return [start, end]
      })(),
    }, {
      text: '最近一年',
      value: (() => {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 365)
        return [start, end]
      })(),
    }])
    return {
        vals,getPlacehloder,shortcuts
    }
  }
})
</script>

<style scoped>
.andy {
    display: flex;
}
</style>