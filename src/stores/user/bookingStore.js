import { defineStore } from 'pinia'
import { ref } from 'vue'
import { makeRequest } from '@/request/request'

export const useBookingStore = defineStore('bookingStore', () => {
  const bookingSuccess = ref(false)
  const bookingError = ref(null)
  const loading = ref(false)
  const lastBooking = ref(null)
  const userCars = ref([])
  const userAddresses = ref([])
  const alternateNumbers = ref([])
  const allBookings = ref([])

  const createBooking = async ({ service_id, employee_id, scheduled_date, slot_time }) => {
    loading.value = true
    bookingError.value = null

    try {
      const response = await makeRequest('/bookings', 'POST', {
        service_id,
        employee_id,
        scheduled_date,
        slot_time,
      })
      bookingSuccess.value = true
      lastBooking.value = response?.data
      return response?.data
    } catch (err) {
      console.error('Booking failed:', err)
      bookingError.value = err
      throw err
    } finally {
      loading.value = false
    }
  }

  const getAllBookings = async () => {
    try {
      const response = await makeRequest('/bookings', 'GET')
      allBookings.value = response.data
      return response.data
    } catch (err) {
      console.log('BookingDetails response:', response)
      console.error('Booking Details:', err)
      throw err
    }
  }

  // Car related functions
  const addCar = async ({ brand, registration_number }) => {
    try {
      const response = await makeRequest('/cars', 'POST', {
        brand,
        registration_number,
      })
      return response?.data
    } catch (err) {
      console.error('Add car failed:', err)
      throw err
    }
  }

  const getCars = async () => {
    try {
      const res = await makeRequest('/cars', 'GET')
      userCars.value = res.data
      return userCars.value
    } catch (err) {
      console.error('Get cars failed:', err)
      userCars.value = []
    }
  }

  // Address related functions
  const addAddress = async ({ address_line, city, state, pincode }) => {
    try {
      const response = await makeRequest('/user/address', 'POST', {
        address_line,
        city,
        state,
        pincode,
      })
      return response?.data
    } catch (err) {
      console.error('Add address failed:', err)
      throw err
    }
  }

  const getAddresses = async () => {
    try {
      const res = await makeRequest('/user/address', 'GET')
      userAddresses.value = res.data || []
      return userAddresses.value
    } catch (err) {
      console.error('Get addresses failed:', err)
      userAddresses.value = []
    }
  }

  const getAlternateNumbers = async () => {
    try {
      const res = await makeRequest('/alternate-number', 'GET')
      alternateNumbers.value = res.data || []
      return alternateNumbers.value
    } catch (err) {
      console.error('GET /alternate-number failed:', err)
      alternateNumbers.value = []
      return alternateNumbers.value
    }
  }

  // Add or update an alternate number
  const addAlternateNumber = async (number) => {
    try {
      const payload = { alternate_number: number }
      const res = await makeRequest('/alternate-number', 'PUT', payload)
      await getAlternateNumbers()
      return res.data
    } catch (err) {
      console.error('PUT /alternate-number failed:', err)
      throw err
    }
  }
  // Utility function to get latest item from array
  const getLatestItem = (array) => {
    if (!array || array.length === 0) return null
    return [...array].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0]
  }

  // Return all functions and state
  return {
    // State
    bookingSuccess,
    bookingError,
    loading,
    lastBooking,
    userCars,
    userAddresses,
    alternateNumbers,
    createBooking,
    addCar,
    getCars,

    addAddress,
    getAddresses,

    getLatestItem,
    getAlternateNumbers,
    getLatestItem,
    getAlternateNumbers,
    addAlternateNumber,
    getAllBookings,
    allBookings,
  }
})
// import { ref } from 'vue'
// import { makeRequest } from '@/request/request'

// export const useBookingStore = defineStore('bookingStore', () => {
//   const bookingSuccess = ref(false)
//   const bookingError = ref(null)
//   const loading = ref(false)
//   const lastBooking = ref(null)

//   const createBooking = async ({ service_id, employee_id, scheduled_date, slot_time }) => {
//     loading.value = true
//     bookingError.value = null

//     try {
//       const response = await makeRequest('/bookings', 'POST', {
//         service_id,
//         employee_id,
//         scheduled_date,
//         slot_time,
//       })
//       bookingSuccess.value = true
//       lastBooking.value = response?.data
//     } catch (err) {
//       console.error('Booking failed:', err)
//       bookingError.value = err
//     } finally {
//       loading.value = false
//     }
//   }

//   const addCar = async ({ brand, registration_number }) => {
//     try {
//       const response = await makeRequest('/cars', 'POST', {
//         brand,
//         registration_number,
//       })
//       return response?.data
//     } catch (err) {
//       console.error('Add car failed:', err)
//       throw err
//     }
//   }

//   return {
//     bookingSuccess,
//     bookingError,
//     loading,
//     createBooking,
//     addCar,
//     lastBooking,
//   }
// })
