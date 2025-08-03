<template>
  <div class="min-h-screen bg-white flex flex-col items-center text-center md:px-40">
    <!-- Header -->
    <div class="w-full max-x-md bg-[#1D75DE] text-white px-6 py-8 rounded-b-3xl">
      <div class="flex items-center gap-2">
        <h1 class="text-3xl font-bold">bubblz</h1>
      </div>
      <img src="/image/Tick.svg" alt="Success" class="h-12 w-12 mt-2" />
      <div class="text-start mt-2">
        <p class="text-lg mt-6">Hi {{ profile.name }},</p>
        <p class="font-bold text-2xl mt-1">Thank you for purchasing our services</p>
        <p class="text-lg mt-2">
          BOOKING ID: <span class="font-semibold">JSUDS#{{ bookingDetails?.id || 'N/A' }}</span>
        </p>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="w-full px-6 mt-6">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2076E2] mx-auto"></div>
      <p class="mt-4 text-gray-600">Loading booking details...</p>
    </div>

    <!-- Body -->
    <div v-else-if="serviceDetails" class="w-full px-6 mt-6">
      <h2 class="text-left text-sm font-semibold text-gray-700 mb-3">Included Service:</h2>

      <!-- Service card -->
      <div class="flex items-start gap-2">
        <img
          :src="serviceDetails.image_filename"
          :alt="serviceDetails.name"
          class="w-20 h-20 object-cover rounded-lg"
        />
        <div class="flex flex-col text-left">
          <h3 class="font-bold text-base">{{ serviceDetails.name }}</h3>
          <p class="text-xs text-gray-500 mt-1">Estimated Time: 30–45 Minutes</p>
          <p class="text-lg font-semibold text-black mt-2">₹{{ serviceDetails.offer_price }}</p>
        </div>
      </div>

      <!-- Description -->
      <p class="text-gray-600 text-sm mt-6 leading-relaxed text-start">
        Sit back and relax — your service expert is on the way! They'll connect with you shortly.
        Just a 2-minute breather before the magic begins.
      </p>
      <p class="text-sm text-gray-700 mt-4 text-start">Happy Invoking!</p>

      <!-- Buttons -->
      <div class="mt-6 space-y-3">
        <div class="flex flex-col space-y-2 w-full">
          <router-link
            :to="`/booking-tracking/${bookingDetails.id}`"
            class="w-full bg-[#2076E2] text-white py-2 rounded-lg font-medium cursor-pointer hover:bg-blue-700 transition text-center"
          >
            Track Booking
          </router-link>

          <router-link
            to="/"
            class="w-full text-gray-500 py-2 font-medium transition hover:text-gray-700 text-center"
          >
            Back to Home
          </router-link>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else class="w-full px-6 mt-6 text-center">
      <p class="text-gray-600 mb-4">Unable to load booking details</p>
      <button
        @click="retryLoading"
        class="bg-[#2076E2] text-white py-2 px-6 rounded-lg font-medium"
      >
        Try Again
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter, useRoute, RouterLink } from 'vue-router'
import { useBookingStore } from '@/stores/user/bookingStore'
import { useServiceStore } from '@/stores/user/servicesStore'
import { useUserProfileStore } from '@/stores/user/profileStore'

const userProfile = useUserProfileStore()
const { profile, getUserProfile } = storeToRefs(userProfile)

const router = useRouter()
const route = useRoute()

// Stores
const bookingStore = useBookingStore()
const { bookingSuccess, lastBooking } = storeToRefs(bookingStore)
const serviceStore = useServiceStore()
const { allServices } = storeToRefs(serviceStore)
const { getAllServices } = serviceStore

// State
const loading = ref(true)
const bookingDetails = ref(null)
const serviceDetails = ref(null)

// Methods
const loadBookingAndServiceDetails = async () => {
  try {
    loading.value = true

    // Get booking details from route params or store
    const bookingData = route.params.bookingData ||
      lastBooking.value || {
        id: 287482,
        service_id: 2,
      }

    bookingDetails.value = bookingData

    // Load services if not already loaded
    if (allServices.value.length === 0) {
      await getAllServices()
    }

    // Find the service details based on service_id from booking
    const service = allServices.value.find((s) => s.id === bookingData.service_id)

    if (service) {
      serviceDetails.value = service
    }
  } catch (err) {
    console.error('Error loading booking details:', err)
  } finally {
    loading.value = false
  }
}

const retryLoading = () => {
  loadBookingAndServiceDetails()
}

// const trackBooking = () => {
//   router.push({ name: '/booking-tracking', params: { bookingId: bookingDetails.value?.id } })
// }

// Lifecycle
onMounted(() => {
  loadBookingAndServiceDetails()
})
</script>

<style scoped>
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
