// stores/user/bookingStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { makeRequest } from '@/request/request'

export const useBookingStore = defineStore('bookingStore', () => {
  const allBookings = ref([])
  const loading = ref(false)
  const error = ref(null)

  const getBookingHistory = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await makeRequest('/bookings/history', 'GET')

      allBookings.value = response.data || []
    } catch (err) {
      error.value = err
      console.error('Failed to fetch bookings:', err)
    } finally {
      loading.value = false
    }
  }

  getBookingHistory()
  return {
    allBookings,
    loading,
    error,
    getBookingHistory,
  }
})
