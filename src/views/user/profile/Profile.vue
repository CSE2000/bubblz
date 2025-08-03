<template>
  <DefaultLayout>
    <div class="bg-white min-h-screen w-full text-black">
      <!-- Profile Info -->
      <div class="p-4">
        <div class="flex justify-between items-center mb-2">
          <h2 class="font-semibold text-lg">Profile</h2>
          <router-link to="/editprofile" class="text-red-500 text-sm font-medium"
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
        <button @click="logout" class="text-red-500 font-semibold text-sm flex items-center gap-2">
          <i class="pi pi-sign-out mr-2"></i>
          <span>Logout</span>
        </button>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useUserProfileStore } from '@/stores/user/profileStore'

const router = useRouter()
const profileStore = useUserProfileStore()

onMounted(() => {
  profileStore.getUserProfile()
})

const user = computed(() => ({
  name: profileStore.profile?.name,
  role: profileStore.profile?.role,
  image: profileStore.profile?.image,
}))

// Dynamic menu list
const menuItems = ref([
  { label: 'Booking History', icon: 'pi pi-stopwatch', route: '/booking-history' },
  { label: 'Language Preference', icon: 'pi pi-language', route: '' },
  { label: 'Change Password', icon: 'pi pi-lock', route: '/change-password' },
  { label: 'Terms & Condition', icon: 'pi pi-question-circle', route: '' },
  { label: 'Privacy Policy', icon: 'pi pi-address-book', route: '' },
  { label: 'Support', icon: 'pi pi-question', route: '' },
])

const logout = () => {
  localStorage.clear()
  sessionStorage.clear()
  router.push('/login')
}
</script>

<style scoped>
button:active {
  opacity: 0.7;
}
</style>
