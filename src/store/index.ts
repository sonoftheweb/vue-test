import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'

export interface State {
  name: string,
  values: Array<{date: Date, value: string}>
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    name: '',
    values: []
  },
  mutations: {
    setName(state, name: string) {
      state.name = name
    },
    addValue(state, values: {date: Date, value: string}) {
      state.values.push(values)
    }
  },
  actions: {
    setName(context, name: string) {
      context.commit('setName', name)
    },
    addValue(context, values: {date: Date, value: string}) {
      context.commit('addValue', values)
    }
  },
  getters: {
    name(state) {
      return state.name
    },
    values(state) {
      return state.values
    }
  }
})