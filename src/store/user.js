import { reactive } from 'vue'

const state = reactive({
  currentUser: {}
})

export default state

export function setCurrentUser(user) {
  state.currentUser = user
}

export function setApiKey(apiKey) {
  const currentUser = { ...state.currentUser, apiKey }

  setCurrentUser(currentUser)
}

export function clearCurrentUser() {
  setCurrentUser({})
}

export function getCurrentUser() {}
