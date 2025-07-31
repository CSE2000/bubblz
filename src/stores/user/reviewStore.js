// stores/reviewStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { makeRequest } from '@/request/request'

export const useReviewStore = defineStore('reviewStore', () => {
  const reviewSuccess = ref(false)
  const reviewError = ref(null)
  const loading = ref(false)

  const submitReview = async ({ booking_id, rating, message, files }) => {
    loading.value = true
    reviewError.value = null

    const formData = new FormData()
    formData.append('booking_id', booking_id)
    formData.append('rating', rating)
    formData.append('message', message)

    files.forEach((file) => {
      formData.append('photo', file) // assuming backend accepts multiple 'photo'
    })

    try {
      const response = await makeRequest('/reviews', 'POST', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      reviewSuccess.value = true
      return response?.data
    } catch (err) {
      console.error('Review submission failed:', err)
      reviewError.value = err
    } finally {
      loading.value = false
    }
  }

  return {
    reviewSuccess,
    reviewError,
    loading,
    submitReview,
  }
})
