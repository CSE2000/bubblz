<template>
  <DefaultLayout>
    <div class="bg-white space-y-4 p-4 md:p-0">
      <div>
        <h2 class="font-semibold text-sm text-gray-700 mb-2">Your Booking</h2>
        <div v-if="currentService" class="flex items-start gap-3 p-2">
          <img
            :src="currentService.image || '/image/carwash.svg'"
            alt="Service"
            class="w-20 h-20 object-cover rounded-lg"
          />
          <div>
            <span
              class="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-md inline-block mb-1"
            >
              {{ currentService.status }}
            </span>
            <h3 class="font-semibold text-sm">{{ currentService.name }}</h3>
            <p class="text-xs text-gray-500">
              {{ currentService.description || 'N/A' }}
            </p>
            <p class="font-bold text-sm mt-1">₹{{ currentService.price || 'N/A' }}</p>
          </div>
        </div>
      </div>

      <!-- Location & Map -->
      <div>
        <h2 class="font-semibold text-sm text-gray-700 mb-2">Location & Map</h2>
        <button class="w-full bg-[#2076E2] text-white py-2 rounded font-medium text-sm">
          Track Now
        </button>
        <div class="mt-3 rounded overflow-hidden">
          <iframe
            src="https://maps.google.com/maps?q=birmingham&t=&z=13&ie=UTF8&iwloc=&output=embed"
            class="w-full h-48 rounded-md border"
            allowfullscreen
          ></iframe>
        </div>
      </div>

      <!-- Service Status -->
      <div>
        <h2 class="font-semibold text-sm text-gray-700 mb-2">Service provider on the way</h2>
        <div class="space-y-3">
          <div v-for="(step, index) in steps" :key="index" class="flex items-start gap-3">
            <div class="text-blue-600">
              <div class="w-6 h-6 mt-1">
                <img :src="step.image" alt="status icon" class="w-full h-full object-contain" />
              </div>
            </div>
            <div>
              <p class="font-medium text-sm text-gray-700">{{ step.title }}</p>
              <p class="text-xs text-gray-500">{{ step.time }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Booking Info -->
      <div class="">
        <p class="font-semibold text-gray-800">
          Booking ID: <span class="mt-1 text-gray-400">{{ currentBooking?.booking_id }}</span>
        </p>
        <p class="mt-1 text-gray-800">
          Scheduled:
          <span class="mt-1 text-gray-400">
            {{ currentBooking?.slot_time }}
          </span>
        </p>
      </div>

      <!-- Buttons -->
      <div class="grid grid-cols-2 gap-3 mt-4">
        <button class="bg-gray-100 text-gray-700 py-2 rounded font-medium text-sm cursor-pointer">
          Cancel
        </button>
        <button class="bg-gray-100 text-gray-700 py-2 rounded font-medium text-sm cursor-pointer">
          Back to Home
        </button>
      </div>

      <router-link
        :to="`/booking/${currentBooking?.booking_id}/review`"
        class="block w-full text-center bg-[#2076E2] hover:bg-[#1662c4] transition duration-200 text-white py-2 rounded-md font-semibold text-sm md:text-base"
      >
        Write a Review
      </router-link>
    </div>
  </DefaultLayout>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useBookingStore } from '@/stores/user/bookingStore'
import { useServiceStore } from '@/stores/user/servicesStore'
import { storeToRefs } from 'pinia'

const route = useRoute()

const bookingStore = useBookingStore()
const { getAllBookings } = bookingStore
const { allBookings } = storeToRefs(bookingStore)

const serviceStore = useServiceStore()
const { allServices } = storeToRefs(serviceStore)
const { getAllServices } = serviceStore

const currentBooking = ref(null)
const currentService = ref(null)

onMounted(async () => {
  await getAllBookings()
  await getAllServices()

  const bookingId = parseInt(route.params.bookingId)

  // Find booking by ID
  currentBooking.value = allBookings.value.find((b) => b.booking_id === bookingId)

  if (currentBooking.value) {
    currentService.value = allServices.value.find(
      (s) => s.name.toLowerCase().trim() === currentBooking.value.service_name.toLowerCase().trim(),
    )
  }
})

const steps = [
  {
    title: 'Confirmed',
    time: '07:00 PM, 9 July 2025',
    image: '/image/Frame 81.svg',
  },
  {
    title: 'On the Way',
    time: '07:10 PM, 9 July 2025',
    image: '/image/Frame 87.svg',
  },
  {
    title: 'Service in Progress',
    time: '07:20 PM, 9 July 2025',
    image: '/image/Frame 88.svg',
  },
  {
    title: 'Completed',
    time: '07:40 PM, 9 July 2025',
    image: '/image/Frame 89.svg',
  },
]
</script>

<!-- <script setup>
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useBookingStore } from '@/stores/user/bookingStore'
import { useServiceStore } from '@/stores/user/servicesStore' 
import { storeToRefs } from 'pinia'

const bookingStore = useBookingStore()
const { lastBooking } = storeToRefs(bookingStore)

const serviceStore = useServiceStore() 
const { allServices } = storeToRefs(serviceStore)

onMounted(() => {
  bookingStore.BookingDetails()
  serviceStore.getAllServices() 
})

const steps = [
  {
    title: 'Confirmed',
    time: '07:00 PM, 9 July 2025',
    image: '/image/Frame 81.svg',
  },
  {
    title: 'On the Way',
    time: '07:10 PM, 9 July 2025',
    image: '/image/Frame 87.svg',
  },
  {
    title: 'Service in Progress',
    time: '07:20 PM, 9 July 2025',
    image: '/image/Frame 88.svg',
  },
  {
    title: 'Completed',
    time: '07:40 PM, 9 July 2025',
    image: '/image/Frame 89.svg',
  },
]
</script> -->
