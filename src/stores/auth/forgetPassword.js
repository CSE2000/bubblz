// stores/forgetPassword.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { makeRequest } from '@/request/request'

export const useForgetPasswordStore = defineStore('forgetPassword', () => {
  const loading = ref(false)
  const error = ref(null)
  const successMessage = ref('')
  const otpSent = ref(false)
  const verified = ref(false)
  const userIdentifier = ref('')

  const sendOTP = async (identifier) => {
    loading.value = true
    error.value = null
    successMessage.value = ''
    userIdentifier.value = identifier

    try {
      const response = await makeRequest('/forgot-password', 'POST', { identifier })

      if (response?.data?.success || response?.status === 200) {
        otpSent.value = true
        successMessage.value = 'OTP sent successfully.'
        return true
      } else {
        error.value = response?.data?.message || 'Failed to send OTP.'
        return false
      }
    } catch (err) {
      error.value = err?.response?.data?.message || err.message || 'Something went wrong'
      return false
    } finally {
      loading.value = false
    }
  }

  const resetPassword = async (newPassword) => {
    loading.value = true
    error.value = null
    successMessage.value = ''

    try {
      const response = await makeRequest('/forgot-password', 'POST', {
        identifier: userIdentifier.value,
        password: newPassword,
      })

      if (response?.data?.success || response?.status === 200) {
        successMessage.value = 'Password reset successful.'
        verified.value = true
        return true
      } else {
        error.value = response?.data?.message || 'Failed to reset password.'
        return false
      }
    } catch (err) {
      error.value = err?.response?.data?.message || err.message || 'Something went wrong'
      return false
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    successMessage,
    otpSent,
    verified,
    sendOTP,
    resetPassword,
    userIdentifier,
  }
})
