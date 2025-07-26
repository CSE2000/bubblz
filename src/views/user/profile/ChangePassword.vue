<script setup>
import { ref } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const form = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})

const errors = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})

// Toggle visibility
const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

const validateForm = () => {
  let valid = true
  errors.value = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  }

  if (!form.value.currentPassword.trim()) {
    errors.value.currentPassword = 'Current password is required'
    valid = false
  }

  if (!form.value.newPassword.trim()) {
    errors.value.newPassword = 'New password is required'
    valid = false
  } else if (form.value.newPassword.length < 6) {
    errors.value.newPassword = 'New password must be at least 6 characters'
    valid = false
  }

  if (form.value.confirmPassword !== form.value.newPassword) {
    errors.value.confirmPassword = 'Passwords do not match'
    valid = false
  }

  return valid
}

const handleSubmit = () => {
  if (validateForm()) {
    console.log('Password Change Submitted', form.value)
    // Call API here
  }
}
</script>

<template>
  <DefaultLayout class="md:px-40">
    <div class="max-w-md mx-auto p-6 md:p-10 bg-white shadow-sm rounded-md">
      <h2 class="text-xl font-semibold mb-6">Change Password</h2>

      <!-- Current Password -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700">Current Password</label>
        <div class="relative">
          <input
            :type="showCurrentPassword ? 'text' : 'password'"
            v-model="form.currentPassword"
            class="w-full mt-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
            placeholder="Enter current password"
          />
          <span
            class="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-500"
            @click="showCurrentPassword = !showCurrentPassword"
          >
            <i :class="showCurrentPassword ? 'pi pi-eye-slash' : 'pi pi-eye'"></i>
          </span>
        </div>
        <p v-if="errors.currentPassword" class="text-red-500 text-sm mt-1">{{ errors.currentPassword }}</p>
      </div>

      <!-- New Password -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700">New Password</label>
        <div class="relative">
          <input
            :type="showNewPassword ? 'text' : 'password'"
            v-model="form.newPassword"
            class="w-full mt-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
            placeholder="Enter new password"
          />
          <span
            class="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-500"
            @click="showNewPassword = !showNewPassword"
          >
            <i :class="showNewPassword ? 'pi pi-eye-slash' : 'pi pi-eye'"></i>
          </span>
        </div>
        <p v-if="errors.newPassword" class="text-red-500 text-sm mt-1">{{ errors.newPassword }}</p>
      </div>

      <!-- Confirm Password -->
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700">Confirm New Password</label>
        <div class="relative">
          <input
            :type="showConfirmPassword ? 'text' : 'password'"
            v-model="form.confirmPassword"
            class="w-full mt-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
            placeholder="Re-enter new password"
          />
          <span
            class="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-500"
            @click="showConfirmPassword = !showConfirmPassword"
          >
            <i :class="showConfirmPassword ? 'pi pi-eye-slash' : 'pi pi-eye'"></i>
          </span>
        </div>
        <p v-if="errors.confirmPassword" class="text-red-500 text-sm mt-1">{{ errors.confirmPassword }}</p>
      </div>

      <!-- Submit Button -->
      <button
        @click="handleSubmit"
        class="w-full bg-[#2076E2] text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Save
      </button>
    </div>
  </DefaultLayout>
</template>
