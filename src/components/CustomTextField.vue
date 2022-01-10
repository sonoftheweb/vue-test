<template>
  <div>
    <div class="w-full">
      <label for="name" class="sr-only">Name</label>
      <div class="mt-1 relative rounded-md shadow-sm">
        <input 
          :value="value" 
          @keyup="handleChange" 
          class="w-full mx-auto border block px-7 py-5 focus:ring-0 sm:text-xl text-gray-900 focus:outline-none border-gray-300 rounded-lg" 
          :placeholder="placeholder" 
        />
        <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none" v-if="status">
          <CheckCircleIcon class="h-5 w-5 text-green-500" aria-hidden="true" />
        </div>
      </div>
      <div class="relative" v-if="errorMessage">
        <tool-tip class="absolute -top-14 left-full ml-3" :type="`error`" :text="errorMessage" />
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, watch } from 'vue'
import { CheckCircleIcon } from '@heroicons/vue/solid'
import ToolTip from '@/components/ToolTip.vue'

export default defineComponent({
  name: 'CustomTextField',
  components: {
    CheckCircleIcon,
    ToolTip
  },
  emits: ['value'],
  props: {
    initialValue: String,
    status: Boolean,
    errorMessage: String,
    placeholder: String
  },
  setup(props, { emit }) {
    const value = ref(props.initialValue)

    watch(() => props.initialValue, (current) => {
      value.value = current
    })

    const handleChange = (e: Event) => {
      const target = e.target as HTMLInputElement
      value.value = target.value
      emit('value', target.value)
    }

    return {
      value,
      handleChange
    }
  },
})
</script>
