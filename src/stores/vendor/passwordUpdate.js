import { defineStore } from 'pinia'
import { ref } from 'vue'
import { makeRequest } from '@/request/request'

export const usePasswordStore = defineStore('password', () => {
  const loading = ref(false)
  const error = ref(null)
  const success = ref(null)

const updatePassword = async (payload) => {
    loading.value = true
    error.value = null
    success.value = null
    try {
        const res = await makeRequest('/update-password', 'PUT', payload)
        success.value = res?.message || 'Password updated successfully!'
    } catch (err) {
        error.value = err.response?.data?.message || 'Something went wrong!'
        console.error('Update password error:', err)
    } finally {
        loading.value = false
    }
}

  return {
    loading,
    error,
    success,
    updatePassword,
  }
})
