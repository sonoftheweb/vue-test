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
  <values-list :values="values" :last-request-time="lastReqTime" :key="fieldKey"/>
</template>

<script lang="ts">
import CustomTextField from '@/components/CustomTextField.vue'
import ValuesList from '@/components/ValuesList.vue'
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { key } from '../store'
import { useApi } from '../composition/useApi'

export default defineComponent({
  name: 'ValuesView',
  components: {
    CustomTextField,
    ValuesList
  },
  setup() {
    const router = useRouter()
    const store = useStore(key)
    const name = store.getters.name
    const code = store.getters.code
    const error = ref('')
    const value = ref('')
    const values = ref([])
    const lastReqTime = ref(0)
    const fieldKey = ref(Math.random())
    const { post, get } = useApi()

    const handleChange = (e: string) => {
      value.value = e
      error.value = ''
    }

    const getValues = () => {
      get(`/front_end_test/${name}/${code}/get_rows`)
      .then(res => {
        lastReqTime.value = parseInt(res.headers.dh_took_ms)
        values.value = res.data.data
      })
      .catch(err => {
        console.log(err)
      })
    }

    const submit = () => {
      if (!value.value.length) {
        error.value = 'This field is required'
      }

      if (!name || !code) {
        error.value = 'Something went wrong. Sending you back to home'
        setTimeout(() => {
          router.back()
        }, 2000)
      }

      post(`/front_end_test/${name}/${code}/create_row`, { value: value.value })
        .then(response => {
          if (response.status === 200) {
            error.value = ''
            value.value = ''
            fieldKey.value = Math.random()
            getValues()
          } 
        })
        .catch(e => {
          if (e.response.status === 400) {
            error.value = 'This value already exists'
          } else if (e.request) {
            console.log(e.request)
          } else {
            console.log('Error', e.message)
          }
        })
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
      values,
      lastReqTime,
      fieldKey,
      handleChange
    }
  },
})
</script>
