<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="max-w-sm w-full bg-white p-2">
      <div class="flex flex-col items-center mb-10">
        <img src="/image/Bubbles.svg" alt="Bubble Logo" class="h-18 w-auto" />
        <h1 class="text-5xl font-extrabold text-[#2076E2]">bubblz</h1>
      </div>
      <h2 class="text-2xl font-semibold text-start mb-4 text-gray-800">Reset Password</h2>
      <form @submit.prevent="handleReset">
        <div class="relative mb-4">
          <input
            :type="showPassword ? 'text' : 'password'"
            v-model="password"
            placeholder="New Password"
            class="w-full border p-3 rounded-md pr-10"
          />
          <span
            class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            @click="showPassword = !showPassword"
          >
            <i :class="showPassword ? 'pi pi-eye' : 'pi pi-eye-slash'"></i>
          </span>
        </div>
        <div class="relative mb-4">
          <input
            :type="showConfirmPassword ? 'text' : 'password'"
            v-model="confirmPassword"
            placeholder="Confirm Password"
            class="w-full border p-3 rounded-md pr-10"
          />
          <span
            class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            @click="showConfirmPassword = !showConfirmPassword"
          >
            <i :class="showConfirmPassword ? 'pi pi-eye' : 'pi pi-eye-slash'"></i>
          </span>
        </div>
        <p class="text-xs text-gray-600 mb-4">
          <i class="text-gray-600 pi pi-shield mr-1 mt-1"></i>
          Use at least 8 characters for your password using number and email.
        </p>

        <button
          type="submit"
          :disabled="
            !termsAccepted || !password || !confirmPassword || password !== confirmPassword
          "
          class="w-full bg-[#2076E2] text-white py-2 rounded-md"
        >
          Save Password
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
const forgetPasswordStore = useForgetPasswordStore()

const password = ref('')
const confirmPassword = ref('')
const termsAccepted = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)

async function handleReset() {
  if (!password.value || password.value.length < 6) {
    alert('Password must be at least 6 characters.')
    return
  }
  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match.')
    return
  }

  const success = await forgetPasswordStore.resetPassword(password.value)
  if (success) {
    alert('Password updated successfully.')
    router.push('/login')
  } else {
    alert(forgetPasswordStore.error)
  }
}
</script>

<!-- <script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const password = ref('')
const confirmPassword = ref('')
const termsAccepted = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)

function handleReset() {
  if (!password.value || password.value.length < 6) {
    alert('Password must be at least 6 characters.')
    return
  }
  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match.')
    return
  }

  // You would update password via API here
  alert('Password updated successfully.')
  router.push('/login')
}
</script> -->
