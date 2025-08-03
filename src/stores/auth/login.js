// stores/useLoginStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { makeRequest } from '@/request/request'

export const useLoginStore = defineStore('login', () => {
  const loading = ref(false)
  const error = ref(null)
  const user = ref(null)
  const token = ref(localStorage.getItem('token') || null)
  const role = ref(localStorage.getItem('role') || '')
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
        localStorage.setItem('role', response.role)
        return true
      } else {
        error.value = response.message || 'Login failed'
        return false
      }
    } catch (err) {
      console.log(err)
      error.value = err.response.data.message || err.message || 'Something went wrong'
      return false
    } finally {
      loading.value = false
    }
  }

  // ✅ Add logout function
  const logout = () => {
    token.value = null
    role.value = ''
    user.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('role')
  }

  return {
    loading,
    error,
    role,
    user,
    token,
    loginUser,
    logout,
  }
})
