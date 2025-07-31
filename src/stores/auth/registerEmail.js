// stores/auth/registerEmail.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { makeRequest } from '@/request/request' // Adjust import path as needed

export const useForgetPasswordStore = defineStore('forgetPassword', () => {
  const otpSent = ref(false)
  const error = ref('')
  const loading = ref(false)
  const userEmail = ref('')

  const sendOTP = async (email) => {
    loading.value = true
    error.value = ''

    try {
      // Replace with your actual API endpoint
      const response = await makeRequest('/send-otp', 'POST', { email })

      if (response.success || response.status === 'success') {
        otpSent.value = true
        userEmail.value = email
        return true
      } else {
        error.value = response.message || 'Failed to send OTP'
        return false
      }
    } catch (err) {
      console.error('Send OTP error:', err)
      error.value = err.message || 'Network error occurred'
      return false
    } finally {
      loading.value = false
    }
  }

  const verifyOTP = async (otpCode) => {
    loading.value = true
    error.value = ''

    try {
      // Replace with your actual API endpoint
      const response = await makeRequest('/verify-otp', 'POST', {
        email: userEmail.value,
        otp: otpCode,
      })

      if (response.success || response.status === 'success') {
        return true
      } else {
        error.value = response.message || 'Invalid OTP'
        return false
      }
    } catch (err) {
      console.error('Verify OTP error:', err)
      error.value = err.message || 'Network error occurred'
      return false
    } finally {
      loading.value = false
    }
  }

  const resetState = () => {
    otpSent.value = false
    error.value = ''
    loading.value = false
    userEmail.value = ''
  }

  return {
    otpSent,
    error,
    loading,
    userEmail,
    sendOTP,
    verifyOTP,
    resetState,
  }
})
