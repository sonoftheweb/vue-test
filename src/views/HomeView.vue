<template>
  <div class="flex h-screen getting-started">
    <div class="m-auto w-full text-center">
      <h1>Get started by choosing a name below</h1>
      <!-- class="w-2/5 mx-auto" -->
      <custom-text-field
        class="input-component"
        :status="status"
        :error-message="error"
        placeholder="Name"
        @value="nameValue=$event"
      />
      <button type="button" @click="next">Continue</button>
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
    const status = ref(true)
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
