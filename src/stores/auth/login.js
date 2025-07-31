// stores/useLoginStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { makeRequest } from '@/request/request'

export const useLoginStore = defineStore('login', () => {
  const loading = ref(false)
  const error = ref(null)
  const user = ref(null)
  const token = ref(null)
  const role = ref('')
  const loginUser = async (credentials) => {
    loading.value = true
    error.value = null

    try {
      const response = await makeRequest('/login', 'POST', credentials)

      console.log(response)
      if (response.access_token) {
        token.value = response.access_token
        role.value = response.role
        localStorage.setItem('token', token.value)
        localStorage.setItem('role', response.role) // Save the role
        return true
      } else {
        error.value = response.message || 'Login failed'
        return false
      }
    } catch (err) {
      console.log(err)
      error.value = err?.response.message || err.message || 'Something went wrong'
      return false
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    role,
    user,
    token,
    loginUser,
  }
})
