import { defineStore } from 'pinia'
import { ref } from 'vue'
import { makeRequest } from '@/request/request'

export const useRegisterStore = defineStore('register', () => {
  const loading = ref(false)
  const error = ref(null)
  const success = ref(false)

  const registerUser = async (userData) => {
    loading.value = true
    error.value = null
    success.value = false

    try {
      const response = await makeRequest('/signup', 'POST', userData)

      if (response?.data?.status === 'success' || response?.status === 200) {
        success.value = true
        return true
      } else {
        error.value = response?.data?.message || 'Registration failed'
        return false
      }
    } catch (err) {
      error.value = err?.response?.data?.message || err.message || 'Something went wrong'
      return false
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    success,
    registerUser,
  }
})
