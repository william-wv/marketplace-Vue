import { deleteAddress, getAddress } from "@/services/http.js";
import { defineStore } from "pinia"
import { ref } from "vue"

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('user_token') || '');
  const user = ref({})
  const isAuthenticated = ref(false)
  const isShoppNull = ref(true)
  const endereco = ref([]);

  function logout() {
    token.value = null
    user.value = {}
    isAuthenticated.value = false
    isShoppNull.value = false
    endereco.value = []
    localStorage.removeItem('user_token');
  }

  function saveUser(result) {
    user.value = result.user
    isAuthenticated.value = true
    token.value = result.token
    isShoppNull.value = result.isShoppNull
    endereco.value = []
    localStorage.setItem('user_token', result.token);
  }

  function setToken(newToken) {
    token.value = newToken;
    localStorage.setItem('user_token', newToken);
  }

  function setAddress(novoEndereco) {
    endereco.value = novoEndereco
  }

  async function getAddressesUser() {
    endereco.value = await getAddress()
  }

  async function delAddressesUser(id) {
    endereco.value = await deleteAddress(id)
    getAddressesUser()
  }



  return {
    token,
    user,
    isAuthenticated,
    isShoppNull,
    endereco,
    logout,
    saveUser,
    setToken,
    setAddress,
    getAddressesUser,
    delAddressesUser
  }
}, {
  persist: true
})

export default useAuthStore
