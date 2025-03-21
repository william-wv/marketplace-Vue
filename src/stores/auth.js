import { defineStore } from "pinia"
import { ref } from "vue"

export const useAuthStore = defineStore('auth', () => {
  const token = ref(null)
  const user = ref({})
  const isAuthenticated = ref(false)

  function logout() {
      token.value = null
      user.value = {}
      isAuthenticated.value = false
  }

  function saveUser(result) {
      user.value = result.user
      isAuthenticated.value = true
      token.value = result.token
  }

  return { token, user, isAuthenticated, logout, saveUser }
}, 
{persist: true})

export default useAuthStore
