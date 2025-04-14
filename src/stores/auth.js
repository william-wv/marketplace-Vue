import { defineStore } from "pinia"
import { ref } from "vue"

export const useAuthStore = defineStore('auth', () => {
  const token = ref(null)
  const user = ref({})
  const isAuthenticated = ref(false)
  const isShoppNull = ref(true)
  const endereco = ref({})

  function logout() {
    token.value = null
    user.value = {}
    isAuthenticated.value = false
    isShoppNull.value = false
    endereco.value = {}
  }

  function saveUser(result) {
    user.value = result.user
    isAuthenticated.value = true
    token.value = result.token
    isShoppNull.value = result.isShoppNull
  }

  function expired() {
    if (user.token === 'Invalid or expired token') {
      logout()
    }
  }

  function setAddress(novoEndereco) {
    // Atualiza o endereço dentro de user
    user.value.address = novoEndereco
  }

  return {
    token,
    user,
    isAuthenticated,
    isShoppNull,
    endereco,
    logout,
    saveUser,
    expired,
    setAddress 
  }
}, {
  persist: true
})

export default useAuthStore
