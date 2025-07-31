import { defineStore } from 'pinia'
import { ref } from 'vue'
import { makeRequest } from '@/request/request'

export const useUploadJobStore = defineStore('uploadJob', () => {
  const loading = ref(false)
  const error = ref(null)
  const success = ref(null)

  const uploadJobImages = async (formData) => {
    loading.value = true
    error.value = null
    success.value = null

    try {
      const response = await makeRequest('/vendor/upload-image-after', 'POST', formData)
      success.value = response?.message || 'Upload successful!'
      return response
    } catch (err) {
      console.error('Upload failed:', err)
      error.value = err.response?.data?.message || 'Something went wrong!'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Clear messages function
  const clearMessages = () => {
    error.value = null
    success.value = null
  }

  return {
    loading,
    error,
    success,
    uploadJobImages,
    clearMessages,
  }
})
