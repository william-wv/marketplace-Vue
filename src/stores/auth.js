import router from "@/router/router";
import { getUser, putImage, putUser } from "@/services/gerUsers";
import { deleteAddress, getAddress } from "@/services/http";
import { push } from "notivue";
import { defineStore } from "pinia"
import { ref } from "vue"

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('user_token') || '');
  const user = ref({})
  const isAuthenticated = ref(false)
  const isShoppNull = ref(true)
  const endereco = ref({})

  function logout() {
    router.replace('/login')
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


  function setToken(newToken) {
    token.value = newToken;
    localStorage.setItem('user_token', newToken);
  }

  function setAddress(novoEndereco) {
    user.value.address = novoEndereco
  }

  async function putUserLog(payload){
    const response = await putUser(payload)
    if (response && response.data) {
      user.value = response.data
    }
  }

  async function putUserimage(payload){
    const response = await putImage(payload)
    if (response && response.data) {
      user.value = response.data
    }
  }
  
  async function delUserimage(payload){
    const response = await deleteAddress(payload)
    if (response && response.data) {
      address.value = response.data
    }
  }
  
  async function deletAdd(id) {

      const response = await deleteAddress(id)
      if (response && response.status === 204) {
        push.success('Address deleted')
        endereco.value = response
        await getAddress()
      } else {
        push.error('Fail to delete')
      }

    
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
    putUserLog,
    putUserimage,
    delUserimage,
    deletAdd
  }
}, {
  persist: true
})

export default useAuthStore
