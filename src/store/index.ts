import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'

export interface State {
  name_test_result: {name: string, id: number, code: number, created_at: string} | null,
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    name_test_result: null, // can't call this a user because it is not an authenticatable user... yet.
  },
  mutations: {
    setName(state, data: {name: string, id: number, code: number, created_at: string}) {
      state.name_test_result = data
    }
  },
  actions: {
    setName(context, data: {name: string, id: number, code: number, created_at: string}) {
      context.commit('setName', data)
    }
  },
  getters: {
    name(state) {
      return state.name_test_result?.name
    },
    code(state) {
      return state.name_test_result?.code
    }
  }
})