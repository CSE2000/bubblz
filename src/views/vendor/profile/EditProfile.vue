<template>
  <DefaultLayout class="md:px-40">
    <!-- {{ profiles }} -->
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
        <label class="block text-sm font-medium text-gray-700">Job</label>
        <input
          type="text"
          v-model="form.job"
          class="w-full mt-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Your Job"
        />
        <p v-if="errors.job" class="text-red-500 text-sm mt-1">{{ errors.job }}</p>
      </div>

      <!-- phone -->
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
import { ref, onMounted } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useVendorProfileStore } from '@/stores/vendor/profileStore'
import { storeToRefs } from 'pinia'

const vendorStore = useVendorProfileStore()
const { profiles } = storeToRefs(vendorStore)

const form = ref({
  name: '',
  job: '',
  phone: '',
  image: null,
})

const errors = ref({
  name: '',
  job: '',
  phone: '',
})

onMounted(async () => {
  await vendorStore.getVendorProfile()

  // Load first employee profile from items array safely
  const current = profiles.value?.items?.[0]

  if (current && current.user) {
    form.value.name = current.user.name || ''
    form.value.job = current.specialization || ''
    form.value.phone = current.user.phone || ''
    imagePreview.value = user.image_url ? user.image_url.replace(/\\/g, '/') : null
  }
})

const validateForm = () => {
  let valid = true
  errors.value = { name: '', job: '', phone: '' }

  if (!form.value.name.trim()) {
    errors.value.name = 'Full name is required'
    valid = false
  }
  if (!form.value.phone.trim() || !/^\+?\d{7,15}$/.test(form.value.phone.replace(/\s+/g, ''))) {
    errors.value.phone = 'Enter valid phone number'
    valid = false
  }

  return valid
}

const imagePreview = ref(null)

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    form.value.image = file
    imagePreview.value = URL.createObjectURL(file)
  }
}

const handleSubmit = async () => {
  if (!validateForm()) return

  const formData = new FormData()
  formData.append('name', form.value.name)
  formData.append('specialization', form.value.job)
  formData.append('phone', form.value.phone)
  if (form.value.image) {
    formData.append('image', form.value.image)
  }

  try {
    await vendorStore.updateVendorProfile(formData)
    await vendorStore.getVendorProfile()
    alert('Profile updated successfully')
  } catch (err) {
    alert('Failed to update profile')
  }
}
</script>
