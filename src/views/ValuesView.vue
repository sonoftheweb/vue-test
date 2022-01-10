<template>
  <div class="flex h-screen">
    <div class="m-auto w-3/5">
      <h3 class="text-5xl font-bold mb-16 text-center leading-relaxed tracking-wider">Welcome, <span class="text-blue-500">{{ name }}!</span> <br/>Please, add value to list</h3>
      <custom-text-field 
        class="w-2/5 mx-auto" 
        :initial-value="value"
        :error-message="error"
        placeholder="Value"
        @value="handleChange" 
      />
      <div class="w-2/5 mx-auto mt-5">
        <button 
          type="button"
          @click="submit" 
          class="w-full px-6 py-5 border border-transparent text-lg font-medium rounded-lg bg-blue-500 text-white focus:outline-none focus:ring-0"
        >
          Add
        </button>
      </div>
    </div>
  </div>  
  <values-list/>
</template>

<script lang="ts">
import CustomTextField from '@/components/CustomTextField.vue'
import ValuesList from '@/components/ValuesList.vue'
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { key } from '../store'

export default defineComponent({
  name: 'ValuesView',
  components: {
    CustomTextField,
    ValuesList
  },
  setup() {
    const store = useStore(key)
    const name = store.state.name
    const error = ref('')
    const value = ref('')
    const fieldKey = ref(Math.random())

    const handleChange = (e: string) => {
      value.value = e
      error.value = ''
    }

    const submit = () => {
      if (!value.value.length) {
        error.value = 'This field is required'
      }

      let found = store.getters.values.find((item: { value: string; }) => {
        return item.value === value.value
      })

      if (found) {
        error.value = 'This value already exist. Please, try another '
      }

      if (error.value.length) {
        return
      } else {
        store.commit('addValue', { value: value.value, date: new Date() })
        value.value = ''
        fieldKey.value = Math.random()
      }
    }

    onMounted(() => {
      if (! name) {
        useRouter().push('/')
      }
    })

    return {
      submit,
      name,
      error,
      value,
      fieldKey,
      handleChange
    }
  },
})
</script>
