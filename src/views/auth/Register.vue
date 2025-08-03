<template>
  <div class="min-h-screen flex justify-center items-center bg-gray-50 md:px-4 px-4 py-4">
    <div class="w-full max-w-lg bg-white">
      <div class="flex flex-col items-center mb-10">
        <img src="/public/image/Bubblz_logo.png" alt="logo" class="h-auto w-full" />
      </div>
      <h2 class="text-2xl font-semibold text-start text-gray-800 mb-3">Create Your Account</h2>
      <p class="mb-2 text-gray-500 text-xs font-medium">
        Join us and get services delivered right to your doorstep.
      </p>
      <form @submit.prevent="registerUser">
        <div v-for="field in fields" :key="field.key" class="mb-4">
          <input
            v-model="form[field.key]"
            :type="field.type"
            :placeholder="field.placeholder"
            class="w-full border p-3 rounded-md"
          />
          <p v-if="errors[field.key]" class="text-red-500 text-sm mt-1">{{ errors[field.key] }}</p>
        </div>

        <p class="text-sm text-gray-600 mb-4">
          <i class="text-gray-600 text-sm pi pi-shield mr-1 mt-1"></i>
          We never share your personal information.
        </p>

        <button type="submit" class="w-full bg-[#2076E2] text-white py-2 rounded-md">
          Register Now
        </button>

        <p class="mt-4 text-sm text-center">
          Already have an account?
          <router-link to="/login" class="text-blue-600 hover:underline">Login here</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useRegisterStore } from '@/stores/auth/register'

const router = useRouter()
const registerStore = useRegisterStore()

const form = reactive({
  fullName: '',
  phone: '',
  email: '',
  address: '',
  password: '',
  confirmPassword: '',
})

const errors = reactive({})

const fields = [
  { key: 'fullName', placeholder: 'Full Name', type: 'text' },
  { key: 'phone', placeholder: 'Mobile Number', type: 'text' },
  { key: 'email', placeholder: 'Email Address', type: 'email' },
  { key: 'address', placeholder: 'Address', type: 'text' },
  { key: 'password', placeholder: 'Create Password', type: 'password' },
  { key: 'confirmPassword', placeholder: 'Confirm Password', type: 'password' },
]

const validate = () => {
  let valid = true
  Object.keys(form).forEach((key) => {
    errors[key] = ''
    if (!form[key]) {
      errors[key] = 'This field is required'
      valid = false
    }
  })

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (form.email && !emailRegex.test(form.email)) {
    errors.email = 'Invalid email format'
    valid = false
  }

  if (form.password && form.password.length < 6) {
    errors.password = 'Password must be at least 6 characters'
    valid = false
  }

  if (form.password !== form.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match'
    valid = false
  }

  return valid
}

const registerUser = async () => {
  if (!validate()) return

  const userPayload = {
    name: form.fullName,
    phone: form.phone,
    email: form.email,
    address: form.address,
    password: form.password,
    confirm_password: form.confirmPassword,
  }

  const success = await registerStore.registerUser(userPayload)
  if (success) {
    alert('Registered successfully!')
    router.push('/login')
  } else {
    alert(registerStore.error || 'Registration failed')
  }
}
</script>
