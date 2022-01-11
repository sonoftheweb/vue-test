<template>
  <div class="flex h-screen">
    <div class="m-auto w-3/5">
      <h3 class="text-center text-5xl font-bold mb-16 leading-relaxed tracking-wider">Get started by choosing a name below</h3>
      <custom-text-field 
        class="w-2/5 mx-auto" 
        :status="status" 
        :error-message="error"
        placeholder="Name"
        @value="nameValue=$event"
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
import { defineComponent, ref, watch } from 'vue'
import CustomTextField from '@/components/CustomTextField.vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { key } from '../store'
import { useNameTest } from '../composition/useApi'

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
    const { testName } = useNameTest()

    watch(() => nameValue.value, () => {
      error.value = ''
      status.value = false
    })

    const next = () => {
      if (!nameValue.value.length) {
        error.value = 'This field is required'
        return
      }

      testName(nameValue.value, (result) => {
        error.value = ''
        status.value = true
        setTimeout(() => {
          store.dispatch('setName', result)
          router.push('/values')
        }, 1000)
      }, (e) => {
        console.log(e)
        status.value = false
        error.value = 'This name already taken. Please, try another'
        return
      })
    }
    
    return {
      nameValue,
      status,
      error,
      next
    }
  }
});
</script>
