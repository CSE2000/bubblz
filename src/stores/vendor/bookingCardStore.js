// stores/vendorBookingStore.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { makeRequest } from '@/request/request'

export const useVendorBookingStore = defineStore('vendorBooking', () => {
  const todaySchedule = ref(null)
  const newBookings = ref([])
  const allBookings = ref([])
  const currentBookingsData = ref([])
  const loading = ref(false)

  // Updated fetchTodaySchedule() with no employeeId
  const fetchTodaySchedule = async () => {
    loading.value = true
    try {
      const res = await makeRequest('/employee/todays-schedule', 'GET')
      if (res?.status === 'success' && res?.data) {
        todaySchedule.value = res.data
      }
    } catch (err) {
      console.error('Failed to fetch today schedule:', err)
    } finally {
      loading.value = false
    }
  }

  // Fetch upcoming bookings (new bookings)
  const fetchNewBookings = async () => {
    loading.value = true
    try {
      const res = await makeRequest('/bookings/upcoming', 'GET')
      if (res?.status === 'success' && res?.data) {
        newBookings.value = res.data
      }
    } catch (err) {
      console.error('Failed to fetch new bookings:', err)
    } finally {
      loading.value = false
    }
  }

  const fetchAllBookings = async () => {
    loading.value = true
    try {
      const res = await makeRequest('/bookings/upcoming', 'GET')
      if (res?.status === 'success' && res?.data) {
        allBookings.value = res.data
      }
    } catch (err) {
      console.error('Failed to fetch all bookings:', err)
    } finally {
      loading.value = false
    }
  }

  // Accept booking
  const acceptBooking = async (bookingId) => {
    try {
      const payload = {
        booking_id: bookingId,
        action: 'accept',
      }

      const res = await makeRequest('/bookings/respond', 'POST', payload)

      if (res?.status === 'success') {
        const booking = newBookings.value.find((b) => b.id === bookingId)
        if (booking) {
          booking.status = 'accepted'
        }

        // Optionally refresh the bookings
        await fetchNewBookings()
      }
    } catch (err) {
      console.error('Accept failed:', err)
    }
  }

  // Reject booking
  const rejectBooking = async (bookingId) => {
    try {
      const payload = {
        booking_id: bookingId,
        action: 'reject',
      }

      const res = await makeRequest('/bookings/respond', 'POST', payload)

      if (res?.status === 'success') {
        const booking = newBookings.value.find((b) => b.id === bookingId)
        if (booking) {
          booking.status = 'rejected'
        }
      }
    } catch (err) {
      console.error('Reject failed:', err)
    }
  }

  const fetchCurrentBookings = async () => {
    loading.value = true
    try {
      const res = await makeRequest(
        '/bookings/history/vendor',
        'GET',
        {},
        {},
        { status: 'current' },
      )
      if (res?.status === 'success' && res?.data) {
        currentBookingsData.value = res.data
      }
    } catch (err) {
      console.error('Failed to fetch current bookings:', err)
    } finally {
      loading.value = false
    }
  }

  // Computed properties for filtering bookings
  const currentBookings = computed(() => allBookings.value.filter((b) => b.status === 'current'))

  const completedBookings = computed(() =>
    allBookings.value.filter((b) => b.status === 'completed'),
  )

  return {
    todaySchedule,
    newBookings,
    allBookings,
    currentBookings,
    completedBookings,
    loading,
    currentBookingsData,
    fetchTodaySchedule,
    fetchNewBookings,
    fetchAllBookings,
    acceptBooking,
    rejectBooking,
    fetchCurrentBookings,
  }
})
