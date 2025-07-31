import { defineStore } from 'pinia'
import { ref } from 'vue'
import { makeRequest } from '@/request/request'

export const useUserProfileStore = defineStore('userProfile', () => {
  const profile = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const getUserProfile = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await makeRequest('/user/profile', 'GET')
      profile.value = response.data
    } catch (err) {
      console.error('Failed to fetch user profile:', err)
      error.value = err
    } finally {
      loading.value = false
    }
  }

  // put
  const updateUserProfile = async (id, formData) => {
    loading.value = true
    error.value = null
    try {
      const response = await makeRequest(`/user/profile/${id}`, 'PUT', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      profile.value = response.data
      return profile.value
    } catch (err) {
      console.error('Failed to update user profile:', err)
      error.value = err
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    profile,
    loading,
    error,
    getUserProfile,
    updateUserProfile,
  }
})
