<template>
  <div class="sm:w-1/5 sm:h-96 bg-white text-gray-800 rounded-lg shadow-lg p-5 fixed bottom-10 right-10">
    <div class="grid grid-cols-2 gap-4">
      <div class="text-lg text-gray-300 uppercase font-bold">Created</div>
      <div class="text-lg text-gray-300 uppercase font-bold">Value</div>

      <template v-for="(value, index) in values" :key="index">
				<div class="text-gray-500 text-sm">{{ formatDate(value.date) }}</div>
				<div class="text-gray-500 text-sm">{{ value.value }}</div>
			</template>

    </div>
    <div class="absolute bottom-4 text-sm text-gray-300">Last request took 57ms</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import { key } from '../store'

export default defineComponent({
  setup() {
    const store = useStore(key)
		const { values } = store.state
    const formatDate = (date: Date) => {
      return ("00" + (date.getMonth() + 1)).slice(-2) + "-" +
            ("00" + date.getDate()).slice(-2) + "-" +
            date.getFullYear() + " " +
            ("00" + date.getHours()).slice(-2) + ":" +
            ("00" + date.getMinutes()).slice(-2)
    }

    return {
      values,
      formatDate
    }
  },
})
</script>
