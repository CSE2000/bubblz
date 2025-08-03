<template>
  <DefaultLayout>
    <main class="p-4 max-w-md mx-auto">
      <h2 class="text-xl font-semibold mb-6">Booking History</h2>
      <div v-if="loading" class="text-center text-sm text-gray-500">Loading...</div>

      <div
        v-for="(item, index) in allBookings"
        :key="index"
        class="mb-6 overflow-hidden"
      >
        <!-- Header Section -->
        <div class="p-4">
          <div class="flex items-center space-x-4">
            <div class="w-14 h-14 rounded-full bg-gray-200"></div>
            <!-- <img
              src="/image/profile-placeholder.jpg"
              alt="Profile"
              class="w-14 h-14 rounded-full object-cover"
            /> -->
            <div>
              <h3 class="text-md font-semibold">
                {{ item.employee.name || 'Employee Not Assigned' }}
              </h3>
              <p class="text-sm text-gray-600">{{ formatDate(item.scheduled_date) }}</p>
              <p class="text-sm text-gray-500">
                Job profile :
                {{ item.employee.specialization || 'Not Available' }}
              </p>
            </div>
          </div>

          <!-- Address Section -->
          <div class="mt-4 flex items-start space-x-2">
            <i class="pi pi-map-marker text-lg text-gray-600 ml-1 bg-gray-100 p-3 rounded-md"></i>
            <div class="text-sm text-gray-700">{{ item.address || Null }}</div>
          </div>
        </div>

        <!-- Service & Payment Section -->
        <div class="p-4 space-y-4">
          <div>
            <h4 class="text-sm font-semibold mb-1">Service Done</h4>
            <ul class="text-sm text-gray-700 list-decimal list-inside space-y-1">
              <li>{{ item.service }}</li>
              <li>Cleaning scheduled at {{ item.slot_time }}</li>
              <li>Status: {{ item.booking_status }}</li>
            </ul>
          </div>

          <div>
            <h4 class="text-sm font-semibold mb-1">Payments</h4>
            <p class="text-sm text-gray-700">Payable upon Completion</p>
            <p class="text-sm font-semibold">Total Amount: ₹{{ item.total_price }}</p>
          </div>
        </div>
      </div>
    </main>
  </DefaultLayout>
</template>

<script setup>
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useBookingStore } from '@/stores/user/bookingHistoryStore'
import { storeToRefs } from 'pinia'

const store = useBookingStore()
const { allBookings, loading } = storeToRefs(store)


const formatDate = (datetime) => {
  const date = new Date(datetime)
  return date.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
</script>
