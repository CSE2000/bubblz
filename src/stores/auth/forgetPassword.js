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

  const email = ref('')
  const otp = ref('')
  const newPassword = ref('')
  const confirmPassword = ref('')

  const sendOTP = async (userEmail) => {
    loading.value = true
    error.value = null
    successMessage.value = ''
    email.value = userEmail

    try {
      const response = await makeRequest('/send-otp-forgot-password', 'POST', { email: userEmail })

      if (response?.status === 'success') {
        otpSent.value = true
        successMessage.value = 'OTP sent successfully.'
        return true
      } else {
        error.value = response?.message || 'Failed to send OTP.'
        return false
      }
    } catch (err) {
      error.value = err?.response?.data?.message || err.message || 'Something went wrong'
      return false
    } finally {
      loading.value = false
    }
  }

  // Step 2: Reset Password
  const resetPassword = async () => {
    loading.value = true
    error.value = null
    successMessage.value = ''

    try {
      const response = await makeRequest('/forgot-password', 'POST', {
        email: email.value,
        otp: otp.value,
        new_password: newPassword.value,
        confirm_password: confirmPassword.value,
      })

      if (response?.status === 'success') {
        successMessage.value = 'Password reset successful.'
        verified.value = true
        return true
      } else {
        error.value = response?.message || 'Failed to reset password.'
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
    email,
    otp,
    newPassword,
    confirmPassword,
    sendOTP,
    resetPassword,
  }
})
