<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="max-w-sm w-full bg-white p-2">
      <div class="flex flex-col items-center mb-10">
        <img src="/public/image/Bubblz_logo.png" alt="logo" class="h-auto w-full" />
      </div>
      <h2 class="text-2xl font-semibold text-start mb-4 text-gray-800">Reset Password</h2>

      <form @submit.prevent="handleReset">
        <!-- Password -->
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

        <!-- Confirm Password -->
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

        <!-- Password Hint -->
        <p class="text-xs text-gray-600 mb-4">
          <i class="text-gray-600 pi pi-shield mr-1 mt-1"></i>
          Use at least 8 characters for your password using number and email.
        </p>

        <!-- Accept Terms Checkbox -->
        <div class="flex items-center mb-4">
          <input id="terms" type="checkbox" v-model="termsAccepted" class="mr-2" />
          <label for="terms" class="text-sm text-gray-700">I accept the terms & conditions</label>
        </div>

        <!-- Submit Button -->
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
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useForgetPasswordStore } from '@/stores/auth/forgetPassword'

const router = useRouter()
const store = useForgetPasswordStore()

const password = computed({
  get: () => store.newPassword,
  set: (val) => (store.newPassword = val),
})
const confirmPassword = computed({
  get: () => store.confirmPassword,
  set: (val) => (store.confirmPassword = val),
})

const showPassword = ref(false)
const showConfirmPassword = ref(false)
const termsAccepted = ref(true)

onMounted(() => {
  // Fetch from localStorage if not already in store
  if (!store.email) {
    store.email = localStorage.getItem('reset_email') || ''
  }
  if (!store.otp) {
    store.otp = localStorage.getItem('reset_otp') || ''
  }
})

async function handleReset() {
  if (!store.email || !store.otp) {
    alert('Missing email or OTP. Please retry the process.')
    router.push('/forget-password')
    return
  }

  if (!password.value || password.value.length < 6) {
    alert('Password must be at least 6 characters.')
    return
  }

  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match.')
    return
  }

  const success = await store.resetPassword()
  if (success) {
    alert('Password updated successfully.')
    router.push('/login')
  } else {
    alert(store.error || 'Failed to reset password. Please try again.')
  }
}
</script>

<!-- <template>
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
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useForgetPasswordStore } from '@/stores/auth/forgetPassword'

const router = useRouter()
const store = useForgetPasswordStore()

const password = computed({
  get: () => store.newPassword,
  set: (val) => (store.newPassword = val),
})
const confirmPassword = computed({
  get: () => store.confirmPassword,
  set: (val) => (store.confirmPassword = val),
})

const showPassword = ref(false)
const showConfirmPassword = ref(false)

onMounted(() => {
  if (!store.email) {
    store.email = localStorage.getItem('reset_email') || ''
  }
  if (!store.otp) {
    store.otp = localStorage.getItem('reset_otp') || ''
  }
})
async function handleReset() {
  if (!password.value || password.value.length < 6) {
    alert('Password must be at least 6 characters.')
    return
  }
  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match.')
    return
  }

  const success = await store.resetPassword()
  if (success) {
    alert('Password updated successfully.')
    router.push('/login')
  } else {
    alert(store.error)
  }
}
</script> -->
