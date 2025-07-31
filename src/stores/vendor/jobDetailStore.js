// stores/useJobDetailStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { makeRequest } from '@/request/request'

export const useJobDetailStore = defineStore('jobDetail', () => {
  const job = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const fetchJobDetail = async (id) => {
    loading.value = true
    error.value = null
    try {
      const response = await makeRequest(`/bookings-dashboard/${id}`, 'GET')
      const data = response?.data?.data || response?.data || response

      if (data && typeof data === 'object') {
        job.value = data
      } else {
        throw new Error('Invalid job detail format')
      }
    } catch (err) {
      console.error('Failed to fetch job detail:', err)
      error.value = err.message || 'Failed to fetch job detail'
      job.value = null
    } finally {
      loading.value = false
    }
  }

  return {
    job,
    loading,
    error,
    fetchJobDetail,
  }
})
