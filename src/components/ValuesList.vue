<template>
  <div class="sm:w-1/5 sm:h-96 bg-white text-gray-800 rounded-lg shadow-lg p-5 fixed bottom-10 right-10">
    <div class="grid grid-cols-2 gap-4">
      <div class="text-lg text-gray-300 uppercase font-bold">Created</div>
      <div class="text-lg text-gray-300 uppercase font-bold">Value</div>

      <template v-for="(value, index) in values" :key="index">
				<div class="text-gray-500 text-sm">{{ formatDate(value.created) }}</div>
				<div class="text-gray-500 text-sm">{{ value.value }}</div>
			</template>

    </div>
    <div class="absolute bottom-4 text-sm text-gray-300">Last request took {{ lastRequestTime }}ms</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    values: Array,
    lastRequestTime: Number
  },
  setup() {
    const formatDate = (date: string) => {
      let parsedDate = new Date(date)
      return ("00" + (parsedDate.getMonth() + 1)).slice(-2) + "-" +
            ("00" + parsedDate.getDate()).slice(-2) + "-" +
            parsedDate.getFullYear() + " " +
            ("00" + parsedDate.getHours()).slice(-2) + ":" +
            ("00" + parsedDate.getMinutes()).slice(-2)
    }

    return {
      formatDate
    }
  },
})
</script>
