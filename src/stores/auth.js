import { getUser, updateImage, updateUser } from "@/services/gerUsers";
import { deleteAddress, getAddress } from "@/services/http.js";
import { push } from "notivue";
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

  // address
  function setAddress(novoEndereco) {
    endereco.value = novoEndereco
  }

  async function getAddressesUser() {
    endereco.value = await getAddress()
  }
  function delAddressesUser(id) {
    endereco.value = deleteAddress(id)
    getAddressesUser()
  }

  // user
  async function updateImageProfile(formda) {
    const response = await updateImage(formda)
    getUserMe()
    console.log(response.status)
    if (response.status === 200) {
      push.success('Image updated')
    } else {
      push.error('Fail to upload')
    }
  }
  
  async function getUserMe() {
    user.value = await  getUser()
  }

  async function updateProfile(params) {
    const response = await updateUser(params)
    getUserMe()
    if (response.status == 200) {
      push.success('User updated')
    } else {
      push.error('Fail to upload')
    }
    console.log('pinias')
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
    delAddressesUser,
    updateImageProfile,
    getUserMe,
    updateProfile
  }
}, {
  persist: true
})

export default useAuthStore
