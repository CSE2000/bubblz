// stores/typeOfServices.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { makeRequest } from '@/request/request'

export const useTypeOfServicesStore = defineStore('typeOfServices', () => {
  const services = ref([])
  const loading = ref(false)
  const error = ref(null)

  const getServices = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await makeRequest('/categories', 'GET')
      services.value = response?.data || []
    } catch (err) {
      console.error('Failed to load service categories:', err)
      error.value = err
    } finally {
      loading.value = false
    }
  }

  return {
    services,
    loading,
    error,
    getServices,
  }
})
