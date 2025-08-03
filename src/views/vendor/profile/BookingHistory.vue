<template>
  <DefaultLayout>
    <main class="p-4 max-w-md mx-auto">
      <h2 class="text-lg font-semibold mb-4">Booking History</h2>

      <!-- Tabs -->
      <div class="flex gap-4 mb-4">
        <button
          class="px-3 py-1 rounded-full text-sm"
          :class="tab === 'current' ? 'bg-blue-600 text-white' : 'bg-gray-200'"
          @click="changeTab('current')"
        >
          Current
        </button>
        <button
          class="px-3 py-1 rounded-full text-sm"
          :class="tab === 'completed' ? 'bg-blue-600 text-white' : 'bg-gray-200'"
          @click="changeTab('completed')"
        >
          Completed
        </button>
      </div>

      <!-- Loading and Error States -->
      <div v-if="bookingStore.loading">Loading...</div>
      <div v-else-if="bookingStore.error" class="text-red-500">{{ bookingStore.error }}</div>

      <!-- Booking Cards -->
      <div v-else-if="filteredBookings.length > 0">
        <div v-for="(item, index) in filteredBookings" :key="index" class="mb-4">
          <div class="flex justify-between items-center p-3 border-b border-gray-200">
            <div class="flex items-center gap-3">
              <img
                :src="item.image || '/image/default-avatar.jpg'"
                alt="Client"
                class="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 class="font-semibold text-sm">{{ item.service }}</h3>
                <p class="text-xs text-gray-600">{{ item.date }}</p>
                <p class="text-xs text-gray-600">Client : {{ item.client }}</p>
              </div>
            </div>
            <button class="bg-[#2076E2] text-white px-4 py-1 rounded-md text-sm">View</button>
          </div>
        </div>
      </div>

      <div v-else class="text-sm text-gray-500">No bookings found.</div>
    </main>
  </DefaultLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useVendorBookingStore } from '@/stores/vendor/BookingHistory'
import { storeToRefs } from 'pinia'

const bookingStore = useVendorBookingStore()
const {bookings, fetchBookingHistory} =storeToRefs(bookingStore)
const tab = ref('current')

const changeTab = (status) => {
  tab.value = status
  bookingStore.fetchBookingHistory(status)
}

onMounted(() => {
  bookingStore.fetchBookingHistory('current')
})

const filteredBookings = computed(() => {
  if (tab.value === 'current') {
    return bookingStore.bookings.filter((b) => b.status === 'pending')
  }
  return bookingStore.bookings.filter((b) => b.status === 'completed')
})
</script>

<style scoped>
/* Optional: Add any specific styles here */
</style>
