<template>
  <div class="min-h-screen flex items-center justify-center px-4">
    <div class="max-w-lg w-full bg-white md:p-6 p-2">
      <div class="flex flex-col items-center mb-10">
        <img src="/image/Bubbles.svg" alt="Bubble Logo" class="h-18 w-auto" />
        <h1 class="text-5xl font-extrabold text-[#2076E2]">bubblz</h1>
      </div>
      <h2 class="text-2xl font-semibold text-start mb-2 text-gray-800">Forgot Password</h2>
      <p class="text-xs text-gray-600 mb-4">
        We’ve sent a 6-digit code to your email. Enter it below to continue.
      </p>

      <!-- Email/Phone Input -->
      <form @submit.prevent="handleAction">
        <div v-if="!otpSent">
          <input
            v-model="identifier"
            type="text"
            placeholder="Email or Phone"
            class="w-full border rounded-md p-3 mb-4"
          />
        </div>

        <!-- OTP Input -->
        <div v-else class="space-y-4">
          <p class="text-sm text-center text-gray-600 mb-2">
            Enter the 6-digit OTP sent to your email or phone
          </p>
          <div class="flex justify-between gap-2">
            <input
              v-for="(digit, i) in otp"
              :key="i"
              v-model="otp[i]"
              maxlength="1"
              class="w-10 h-10 text-center border rounded-md"
              @input="focusNext(i)"
            />
          </div>
          <p class="text-sm text-gray-600">
            <i
              class="pi pi-info mr-1 bg-blue-500 rounded-full p-1 text-[10px] text-white font-semibold"
            ></i
            >Didn’t receive the code? Check your spam folder or
            <span class="text-[#2076E2] hover:underline cursor-pointer">Try Again</span>.
          </p>
        </div>

        <button
          class="w-full mt-6 bg-[#2076E2] text-white py-2 rounded-md transition"
          type="submit"
        >
          {{ otpSent ? 'Confirm OTP' : 'Send OTP' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useForgetPasswordStore } from '@/stores/auth/forgetPassword'

const router = useRouter()
const identifier = ref('')
const otp = ref(['', '', '', '', '', ''])

const forgetPasswordStore = useForgetPasswordStore()

function handleAction() {
  if (!forgetPasswordStore.otpSent) {
    if (!identifier.value) {
      alert('Please enter email or phone.')
      return
    }

    forgetPasswordStore.sendOTP(identifier.value).then((success) => {
      if (success) {
        alert('OTP Sent!')
      } else {
        alert(forgetPasswordStore.error)
      }
    })
  } else {
    const enteredOTP = otp.value.join('')
    if (enteredOTP.length !== 6) {
      alert('Please enter the complete 6-digit OTP.')
      return
    }

    // Skipping OTP verification logic for now
    router.push('/reset-password')
  }
}

function focusNext(index) {
  if (otp.value[index].length === 1 && index < 5) {
    const next = document.querySelectorAll('input')[index + 1]
    next?.focus()
  }
}
</script>

<!-- <script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const identifier = ref('')
const otpSent = ref(false)
const otp = ref(['', '', '', '', '', ''])

function handleAction() {
  if (!otpSent.value) {
    if (!identifier.value) {
      alert('Please enter email or phone.')
      return
    }
    // Simulate OTP sent
    otpSent.value = true
  } else {
    const enteredOTP = otp.value.join('')
    if (enteredOTP.length !== 6) {
      alert('Please enter the complete 6-digit OTP.')
      return
    }
    alert('OTP Verified!')
    router.push('/reset-password')
  }
}

function focusNext(index) {
  if (otp.value[index].length === 1 && index < 5) {
    const next = document.querySelectorAll('input')[index + 1]
    next.focus()
  }
}
</script> -->
