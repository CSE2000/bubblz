<script setup>
import { ref } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const form = ref({
  name: '',
  email: '',
  contact: '',
  image: null,
})

const errors = ref({
  name: '',
  email: '',
  contact: '',
})

const imagePreview = ref(null)

const validateForm = () => {
  let valid = true
  errors.value = { name: '', email: '', contact: '' }

  if (!form.value.name.trim()) {
    errors.value.name = 'Full name is required'
    valid = false
  }

  if (!form.value.email.trim()) {
    errors.value.email = 'email is required'
    valid = false
  }

  if (!form.value.contact.match(/^\+91\s\d{10}$/)) {
    errors.value.contact = 'Enter valid contact number'
    valid = false
  }

  return valid
}

const handleImageUpload = (e) => {
  const file = e.target.files[0]
  if (file) {
    form.value.image = file
    const reader = new FileReader()
    reader.onload = () => {
      imagePreview.value = reader.result
    }
    reader.readAsDataURL(file)
  }
}

const handleSubmit = () => {
  if (validateForm()) {
    console.log('Submitted', form.value)
    // Send to API or Pinia store
  }
}
</script>

<template>
  <DefaultLayout class="md:px-40">
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
        <p v-if="errors.job" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
      </div>

      <!-- Contact -->
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700">Contact Number</label>
        <input
          type="text"
          v-model="form.contact"
          class="w-full mt-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="+91 3456787654"
        />
        <p v-if="errors.contact" class="text-red-500 text-sm mt-1">{{ errors.contact }}</p>
      </div>

      <!-- Submit Button -->
      <button
        @click="handleSubmit"
        class="w-full bg-[#2076E2] text-white py-2 rounded-md"
      >
        Save
      </button>
    </div>
  </DefaultLayout>
</template>
