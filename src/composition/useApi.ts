import axios from 'axios'

axios.defaults.headers.common['x-dhauth-token'] = process.env.VUE_APP_HEADER_TOKEN
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

export function useApi() {
  const api = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    withCredentials: true
  })

  return {
    get: (url: string) => api.get(url), // eslint-disable-next-line
    post: (url: string, data: any) => api.post(url, data), // eslint-disable-next-line
    put: (url: string, data: any) => api.put(url, data),
    delete: (url: string) => api.delete(url)
  }
}

export function useNameTest() {
  const { post } = useApi()

  // eslint-disable-next-line
  const testName = (name: string, callable: (...args: any)=>boolean|void, failed_callable: (...args: any)=>void|null) => {
    post('/front_end_test/create_test', { name: name })
    .then(response => {
      callable(response.data.data)
    }).catch(error => {
      if (error.response) {
        if (failed_callable) {
          failed_callable(error.data)
        } else {
          return false
        }
      } else if (error.request) {
        console.log(error.request)
      } else {
        console.log('Error', error.message)
      }
    })
  }

  return {
    testName
  }
}