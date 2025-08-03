<template>
  <DefaultLayout>
    <div class="p-6 md:p-10">
      <h2 class="text-xl font-semibold mb-6">Edit Profile</h2>

      <!-- Image Upload -->
      <div class="flex flex-col items-center mb-6">
        <div class="relative">
          <img
            :src="imagePreview || '/image/profile-placeholder.jpg'"
            alt="Profile"
            class="w-24 h-24 rounded-full object-cover border"
          />
          <label class="absolute bottom-0 right-0 bg-white p-1 rounded-full cursor-pointer">
            <input type="file" accept="image/*" class="hidden" @change="handleImageUpload" />
            <i class="pi pi-camera h-4 w-4 text-blue-400"></i>
          </label>
        </div>
      </div>

      <!-- Full Name -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700">Full Name</label>
        <input
          type="text"
          v-model="form.name"
          class="w-full mt-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter full name"
        />
        <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</p>
      </div>

      <!-- Job Profile -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700">Email Id</label>
        <input
          type="text"
          v-model="form.email"
          class="w-full mt-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Your Email Id"
        />
        <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
      </div>

      <!-- Contact -->
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700">Phone Number</label>
        <input
          type="text"
          v-model="form.phone"
          class="w-full mt-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="+91 3456787654"
        />
        <p v-if="errors.phone" class="text-red-500 text-sm mt-1">{{ errors.phone }}</p>
      </div>

      <!-- Submit Button -->
      <button @click="handleSubmit" class="w-full bg-[#2076E2] text-white py-2 rounded-md">
        Save
      </button>
    </div>
  </DefaultLayout>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useUserProfileStore } from '@/stores/user/profileStore'

const profileStore = useUserProfileStore()
const { profile } = storeToRefs(profileStore)
const { getUserProfile } = profileStore

const form = ref({
  name: '',
  email: '',
  phone: '',
  image: null,
})

const errors = ref({
  name: '',
  email: '',
  phone: '',
})

const imagePreview = ref(null)

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    form.value.image = file
    imagePreview.value = URL.createObjectURL(file)
  }
}

const validateForm = () => {
  let valid = true
  errors.value = { name: '', email: '', phone: '' }

  if (!form.value.name.trim()) {
    errors.value.name = 'Full name is required'
    valid = false
  }

  if (!form.value.email.trim()) {
    errors.value.email = 'email is required'
    valid = false
  }

  if (!form.value.phone.trim()) {
    errors.value.phone = 'Phone number is required'
    valid = false
  }

  return valid
}

onMounted(async () => {
  await getUserProfile()
  const user = profile.value
  if (user) {
    form.value.name = user.name || ''
    form.value.email = user.email || ''
    form.value.phone = user.phone || ''
    imagePreview.value = user.image_url ? user.image_url.replace(/\\/g, '/') : null
  }
})

const handleSubmit = async () => {
  if (!validateForm()) return

  const formData = new FormData()
  formData.append('name', form.value.name)
  formData.append('email', form.value.email)
  formData.append('phone', form.value.phone)
  if (form.value.image) {
    formData.append('image', form.value.image)
  }
  try {
    await profileStore.updateUserProfile(formData)
    alert('Profile updated successfully!')
  } catch (err) {
    console.error(err)
    alert('Failed to update profile.')
  }
}
</script>
