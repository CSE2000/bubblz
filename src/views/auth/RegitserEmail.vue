<template>
  <div class="min-h-screen flex items-center justify-center px-4">
    <div class="max-w-lg w-full bg-white md:p-6 p-2">
      <div class="flex flex-col items-center mb-10">
        <img src="/image/Bubbles.svg" alt="Bubble Logo" class="h-18 w-auto" />
        <h1 class="text-5xl font-extrabold text-[#2076E2]">bubblz</h1>
      </div>
      <h2 class="text-2xl font-semibold text-start mb-2 text-gray-800">Forgot Password</h2>
      <p class="text-xs text-gray-600 mb-4">
        We've sent a 6-digit code to your email. Enter it below to continue.
      </p>

      <!-- Email/Phone Input -->
      <form @submit.prevent="handleAction">
        <div v-if="!otpSent">
          <input
            v-model="email"
            type="text"
            placeholder="Email"
            class="w-full border rounded-md p-3 mb-4"
          />
        </div>

        <!-- OTP Input -->
        <div v-if="otpSent" class="space-y-4">
          <p class="text-sm text-center text-gray-600 mb-2">
            Enter the 6-digit OTP sent to your email
          </p>
          <div class="flex justify-between gap-2">
            <input
              v-for="(digit, i) in otp"
              :key="i"
              v-model="otp[i]"
              maxlength="1"
              class="w-10 h-10 text-center border rounded-md"
              @input="focusNext(i)"
              type="text"
            />
          </div>
          <p class="text-sm text-gray-600">
            <i
              class="pi pi-info mr-1 bg-blue-500 rounded-full p-1 text-[10px] text-white font-semibold"
            ></i>
            Didn't receive the code? Check your spam folder or
            <span class="text-[#2076E2] hover:underline cursor-pointer" @click="resendOTP">
              Try Again
            </span>.
          </p>
        </div>

        <button
          class="w-full mt-6 bg-[#2076E2] text-white py-2 rounded-md transition hover:bg-blue-600"
          type="submit"
          :disabled="loading"
        >
          {{ loading ? 'Processing...' : (otpSent ? 'Confirm OTP' : 'Send OTP') }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useForgetPasswordStore } from '@/stores/auth/registerEmail'

const router = useRouter()
const forgetPasswordStore = useForgetPasswordStore()

const email = ref('')
const otp = ref(['', '', '', '', '', ''])
const loading = ref(false)

// Use computed to reactively get otpSent from store
const otpSent = computed(() => forgetPasswordStore.otpSent)

async function handleAction() {
  if (loading.value) return
  
  loading.value = true
  
  try {
    if (!otpSent.value) {
      // Send OTP
      if (!email.value.trim()) {
        alert('Please enter email.')
        return
      }

      const success = await forgetPasswordStore.sendOTP(email.value)
      if (success) {
        alert('OTP Sent!')
        // The store should now set otpSent to true
      } else {
        alert(forgetPasswordStore.error || 'Failed to send OTP')
      }
    } else {
      // Verify OTP
      const enteredOTP = otp.value.join('')
      if (enteredOTP.length !== 6) {
        alert('Please enter the complete 6-digit OTP.')
        return
      }

      const success = await forgetPasswordStore.verifyOTP(enteredOTP)
      if (success) {
        alert('OTP Verified!')
        router.push('/register')
      } else {
        alert(forgetPasswordStore.error || 'Invalid OTP')
      }
    }
  } catch (error) {
    console.error('Error:', error)
    alert('Something went wrong. Please try again.')
  } finally {
    loading.value = false
  }
}

function focusNext(index) {
  if (otp.value[index].length === 1 && index < 5) {
    // Use setTimeout to ensure the DOM is updated
    setTimeout(() => {
      const inputs = document.querySelectorAll('input[maxlength="1"]')
      if (inputs[index + 1]) {
        inputs[index + 1].focus()
      }
    }, 0)
  }
}

async function resendOTP() {
  if (loading.value) return
  
  loading.value = true
  
  try {
    // Reset OTP inputs
    otp.value = ['', '', '', '', '', '']
    
    const success = await forgetPasswordStore.sendOTP(email.value)
    if (success) {
      alert('OTP Resent!')
    } else {
      alert(forgetPasswordStore.error || 'Failed to resend OTP')
    }
  } catch (error) {
    console.error('Error resending OTP:', error)
    alert('Failed to resend OTP. Please try again.')
  } finally {
    loading.value = false
  }
}
</script>