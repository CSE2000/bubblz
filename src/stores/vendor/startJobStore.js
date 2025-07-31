import { defineStore } from 'pinia'
import { ref } from 'vue'
import { makeRequest } from '@/request/request'

export const useJobStore = defineStore('jobStore', () => {
  const uploading = ref(false)
  const uploadError = ref(null)
  const uploadSuccess = ref(false)
  const uploadedImageUrl = ref(null)

  const uploadJobStartImage = async (imageBlob) => {
    uploading.value = true
    uploadError.value = null
    uploadSuccess.value = false

    try {
      // Create FormData
      const formData = new FormData()
      formData.append('image', imageBlob, 'job-start-photo.png')

      const response = await makeRequest('/vendor/upload-image-before', 'POST', formData, {
        headers: {
          // Don't set Content-Type, let browser set it for FormData
        }
      })

      uploadSuccess.value = true
      uploadedImageUrl.value = response?.data?.image_url || null
      return response?.data
    } catch (err) {
      console.error('Upload image failed:', err)
      uploadError.value = err?.message || 'Failed to upload image. Please try again.'
      throw err
    } finally {
      uploading.value = false
    }
  }

  const resetUploadState = () => {
    uploading.value = false
    uploadError.value = null
    uploadSuccess.value = false
    uploadedImageUrl.value = null
  }

  return {
    // State
    uploading,
    uploadError,
    uploadSuccess,
    uploadedImageUrl,
    
    // Actions
    uploadJobStartImage,
    resetUploadState
  }
})