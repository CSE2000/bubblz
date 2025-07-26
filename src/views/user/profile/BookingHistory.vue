<template>
  <DefaultLayout class="md:px-40">
    <main class="p-4 max-w-md mx-auto">
      <!-- Heading -->
      <h2 class="text-lg font-semibold mb-4">Booking History</h2>

      <!-- Booking Cards -->
      <div v-for="(item, index) in filteredBookings" :key="index" class="mb-4">
        <div class="flex justify-between items-center p-3 border-b border-gray-200">
          <div class="flex items-center gap-3">
            <img :src="item.image" alt="Client" class="w-12 h-12 rounded-full object-cover" />
            <div>
              <h3 class="font-semibold text-sm">{{ item.service }}</h3>
              <p class="text-xs text-gray-600">{{ item.date }}</p>
              <p class="text-xs text-gray-600">Client : {{ item.client }}</p>
            </div>
          </div>
          <button class="bg-[#2076E2] text-white px-4 py-1 rounded-md text-sm">View</button>
        </div>
      </div>

      <!-- Done Button -->
      <button class="w-full bg-[#2076E2] text-white py-2 rounded-md font-medium mt-6">Done</button>
    </main>
  </DefaultLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const tab = ref('Completed')

const bookings = ref([
  {
    service: 'Wardrobe Cleaning',
    date: 'Saturday 9 July, 2025',
    client: 'Seyyeeeeee',
    image: '/image/avatar1.jpg',
    status: 'Completed',
  },
  {
    service: 'Wardrobe Cleaning',
    date: 'Saturday 9 July, 2025',
    client: 'Seyyeeeeee',
    image: '/image/avatar1.jpg',
    status: 'Completed',
  },
  {
    service: 'Room Cleaning',
    date: 'Sunday 10 July, 2025',
    client: 'Another Client',
    image: '/image/avatar2.jpg',
    status: 'Current',
  },
])

const filteredBookings = computed(() => bookings.value.filter((b) => b.status === tab.value))
</script>

<style scoped>
/* Optional: Add any specific styles here */
</style>
