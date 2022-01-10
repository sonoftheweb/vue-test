<template>
  <div class="min-w-fit">
    <div 
    class="tooltip bg-white border h-auto relative rounded-md" 
    :style="`border: 1px solid ${color}`"
  >
    <p class="p-3" :style="`color: ${color}`">{{ text }}</p>
    <div 
      class="tail-bg absolute w-0 h-0"
      :style="`border-color: transparent ${color} transparent transparent;`"
    ></div>
    <div 
      class="tail-fg absolute w-0 h-0"
    ></div>
  </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ToolTip',
  props: {
    text: String,
    type: String
  },
  setup(props) {
    const color = props.type === 'error' ? 'red' : 'green'

    return {
      color
    }
  }
})

</script>
