<template>
  <div class="flex h-screen">
    <div class="m-auto w-3/5">
      <h3 class="text-center text-5xl font-bold mb-16 leading-relaxed tracking-wider">Get started by choosing a name below</h3>
      <custom-text-field 
        class="w-2/5 mx-auto" 
        :status="status" 
        :error-message="error"
        placeholder="Name"
        @value="debouncedListener"
      />
      <div class="w-2/5 mx-auto mt-5">
        <button 
          type="button"
          @click="next" 
          class="w-full px-6 py-5 border border-transparent text-lg font-medium rounded-lg bg-blue-500 text-white focus:outline-none focus:ring-0"
        >
          Continue
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, watch } from 'vue'
import CustomTextField from '@/components/CustomTextField.vue'
import useDebounce from '../composition/useDebounce'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { key } from '../store'

export default defineComponent({
  name: 'HomeView',
  components: {
    CustomTextField
  },
  setup() {
    const store = useStore(key)
    const router = useRouter()
    const nameValue = ref('')
    const error = ref('')
    const status = ref(false)
    const { displayValue, debouncedValue, debouncedListener } : { displayValue: Ref<string>, debouncedValue:  Ref<string>, debouncedListener(e: string): void } = useDebounce(1000)

    watch(debouncedValue, (current) => {
      if (! current.length ) {
        status.value = false
        error.value = ''
        return
      }
      axios.get('https://random-data-api.com/api/name/random_name?size=100')
        .then(({ data }) => {
          data.find((name: { first_name: string; }) => {
            console.log(current)
            if (name.first_name === current || current === 'James') {
              error.value = 'This name already taken. Please, try another'
              status.value = false
            } else {
              error.value = ''
              status.value = true
            }
          })
        })
    })

    const next = () => {
      if (!debouncedValue.value.length) {
        error.value = 'This field is required'
      }
      if (error.value)
        return
      
      store.dispatch('setName', debouncedValue.value)
      router.push('/values')
    }
    
    return {
      nameValue,
      displayValue, 
      debouncedValue, 
      debouncedListener,
      status,
      error,
      next
    }
  }
});
</script>
