import { verify } from "@/services/http.js"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('user_token') || '');
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

  async function verifyMe() {
    try {
      const response = await verify()
      const expiration = response.data.expires_at
      console.log("Token expira em:", expiration)
    } catch (error) {
      logout()
    }
  }

  function setToken(newToken) {
    token.value = newToken;
    localStorage.setItem('user_token', newToken);
  }

  function setAddress(novoEndereco) {
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
    verifyMe,
    setToken,
    setAddress
  }
}, {
  persist: true
})

export default useAuthStore
