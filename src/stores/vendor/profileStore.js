import { defineStore } from 'pinia'
import { ref } from 'vue'
import { makeRequest } from '@/request/request'

export const useVendorProfileStore = defineStore('vendorProfile', () => {
  const profiles = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const getVendorProfile = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await makeRequest('/employee', 'GET')
      profiles.value = response.data || null
    } catch (err) {
      console.error('Failed to fetch vendor profile:', err)
      error.value = err
    } finally {
      loading.value = false
    }
  }

  const updateVendorProfile = async (formData) => {
    loading.value = true
    error.value = null
    try {
      const response = await makeRequest('/employee/profile', 'PUT', formData)
      profiles.value = response.data || null
      return profiles.value
    } catch (err) {
      console.error('Failed to update vendor profile:', err)
      error.value = err
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    profiles,
    loading,
    error,
    getVendorProfile,
    updateVendorProfile,
  }
})
