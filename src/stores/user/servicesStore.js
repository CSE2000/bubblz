// stores/user/serviceStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { makeRequest } from '@/request/request'

export const useServiceStore = defineStore('serviceStore', () => {
  const allServices = ref([])
  const loading = ref(false)
  const error = ref(null)

  const getAllServices = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await makeRequest('/services', 'GET')
      allServices.value = response?.data || []
    } catch (err) {
      console.error('Failed to load services:', err)
      error.value = err
    } finally {
      loading.value = false
    }
  }

  return {
    allServices,
    loading,
    error,
    getAllServices,
  }
})
