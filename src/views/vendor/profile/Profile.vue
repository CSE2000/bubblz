<template>
  <DefaultLayout class="md:px-40">
    <div class="bg-white min-h-screen w-full text-black">
      <!-- Profile Info -->
      <div class="p-4">
        <div class="flex justify-between items-center mb-2">
          <h2 class="font-semibold text-lg">Profile</h2>
          <router-link to="/vendor/editProfile" class="text-red-500 text-sm font-medium"
            >Edit Profile</router-link
          >
        </div>
        <div class="flex items-center gap-3">
          <img :src="user.image" alt="User" class="w-12 h-12 rounded-full" />
          <div>
            <p class="font-semibold text-base">{{ user.name }}</p>
            <p class="text-sm text-gray-500">{{ user.role }}</p>
          </div>
        </div>
      </div>
      <!-- Menu Items -->
      <div class="bg-white mt-2 text-sm space-y-2">
        <div
          v-for="(item, index) in menuItems"
          :key="index"
          @click="router.push(item.route)"
          class="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-50 border-b border-gray-300"
        >
          <div class="flex items-center gap-4">
            <i :class="['text-lg', item.icon]"></i>
            <span>{{ item.label }}</span>
          </div>
          <i class="pi pi-angle-right text-gray-500"></i>
        </div>
      </div>

      <!-- Logout -->
      <div class="mt-4 px-4">
        <button
          @click="handleLogout"
          class="text-red-500 font-semibold text-sm flex items-center gap-2"
        >
          <i class="pi pi-sign-out mr-2"></i>
          <span>Logout</span>
        </button>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useVendorProfileStore } from '@/stores/vendor/profileStore'
import { storeToRefs } from 'pinia'

const router = useRouter()

const vendorProfileStore = useVendorProfileStore()
const { profiles } = storeToRefs(vendorProfileStore)
const { getVendorProfile } = vendorProfileStore

const user = ref({
  name: '',
  role: '',
  image: '/image/profile-placeholder.jpg',
})

const menuItems = ref([
  { label: 'Booking History', icon: 'pi pi-stopwatch', route: '/vendor/booking-history' },
  { label: 'Language Preference', icon: 'pi pi-language', route: '' },
  { label: 'Change Password', icon: 'pi pi-lock', route: '/vendor/change-password' },
  { label: 'Terms & Condition', icon: 'pi pi-question-circle', route: '' },
  { label: 'Privacy Policy', icon: 'pi pi-address-book', route: '' },
  { label: 'Support', icon: 'pi pi-question', route: '' },
])

const handleLogout = () => {
  localStorage.clear()
  sessionStorage.clear()
  router.push('/login')
}

onMounted(async () => {
  await getVendorProfile()

  const current = profiles.value?.items?.[0] // correct reference here
  if (current && current.user) {
    user.value.name = current.user.name || 'Employee'
    user.value.role = current.specialization || 'Employee'
    user.value.image = current.user.image_url || '/image/profile-placeholder.jpg'
  }
})
</script>

<style scoped>
/* Optional: Smooth tap feedback */
button:active {
  opacity: 0.7;
}
</style>
