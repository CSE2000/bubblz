// stores/vendorBookingStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { makeRequest } from '@/request/request'

export const useVendorBookingStore = defineStore('vendorBookingStore', () => {
  const bookings = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchBookingHistory = async (status = 'current') => {
    loading.value = true
    error.value = null

    try {
      const res = await makeRequest(`/bookings/history/vendor?status=${status}`, 'GET')
      bookings.value = res.data || []
    } catch (err) {
      console.error('Error fetching bookings:', err)
      error.value = err.message || 'Failed to fetch bookings'
    } finally {
      loading.value = false
    }
  }

  return {
    bookings,
    loading,
    error,
    // Actions
    fetchBookingHistory,
  }
})
