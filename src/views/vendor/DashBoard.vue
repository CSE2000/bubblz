<template>
  <div class="p-4 md:p-8 space-y-6 max-w-2xl mx-auto">
    <!-- Today's Schedule -->
    <section class="p-4 space-y-2">
      <h2 class="text-lg font-semibold">Today's Schedule</h2>
      <div class="flex flex-col sm:flex-row sm:items-center justify-between pt-3">
        <div>
          <p class="text-sm text-gray-500">Upcoming</p>
          <p class="font-medium text-black">{{ todaySchedule.date }}</p>
          <p class="text-sm text-gray-600">Client : {{ todaySchedule.client }}</p>
        </div>
        <div class="mt-3 sm:mt-0">
          <span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
            {{ todaySchedule.service }}
          </span>
        </div>
      </div>
    </section>

    <!-- New Bookings -->
    <section class="p-4 space-y-4">
      <div class="flex justify-between items-center">
        <h2 class="text-lg font-semibold">New Bookings</h2>
        <p class="text-sm text-gray-500">{{ newBookings.length }} Requests</p>
      </div>

      <div class="space-y-3">
        <BookingCard
          v-for="(booking, index) in newBookings"
          :key="index"
          :booking="booking"
          @accept="acceptBooking(index)"
          @reject="rejectBooking(index)"
        />
      </div>

      <div class="text-center">
        <button class="w-full py-2 text-sm">View all Requests</button>
      </div>
    </section>

    <!-- My Bookings -->
    <section class="p-4 space-y-4">
      <!-- Tabs -->
      <div class="flex gap-4 pb-2">
        <button
          @click="selectedTab = 'current'"
          :class="[
            'px-4 py-1 rounded-full font-medium',
            selectedTab === 'current'
              ? 'text-white bg-blue-600'
              : 'text-gray-700 bg-gray-100 hover:bg-gray-200',
          ]"
        >
          Current
        </button>
        <button
          @click="selectedTab = 'completed'"
          :class="[
            'px-4 py-1 rounded-full font-medium',
            selectedTab === 'completed'
              ? 'text-white bg-blue-600'
              : 'text-gray-700 bg-gray-100 hover:bg-gray-200',
          ]"
        >
          Completed
        </button>
      </div>

      <!-- Booking List -->
      <BookingList v-for="(item, index) in filteredBookings" :key="index" :booking="item" />
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import BookingCard from '@/components/Vendor/BookingCard.vue'
import BookingList from '@/components/Vendor/BookingList.vue'

const todaySchedule = ref({
  date: 'Saturday 12 July, 2025',
  client: 'Seyyeeeeee',
  service: 'AC Service & Repair',
})

const newBookings = ref([
  {
    date: '9',
    month: 'July',
    service: 'AC Repair & Service',
    client: 'Alok Kumar',
  },
  {
    date: '9',
    month: 'July',
    service: 'AC Repair & Service',
    client: 'Alok Kumar',
  },
])

const selectedTab = ref('current')

const myBookings = ref([
  {
    id: 1,
    avatar: 'https://i.pravatar.cc/40?u=1',
    service: 'Wardrobe Cleaning',
    date: 'Saturday 9 July, 2025',
    client: 'Seyyeeeeee',
    status: 'current',
  },
  {
    id: 2,
    avatar: 'https://i.pravatar.cc/40?u=2',
    service: 'AC Repair',
    date: 'Monday 8 July, 2025',
    client: 'John Doe',
    status: 'completed',
  },
  {
    id: 3,
    avatar: 'https://i.pravatar.cc/40?u=3',
    service: 'Kitchen Cleaning',
    date: 'Tuesday 7 July, 2025',
    client: 'Jane Smith',
    status: 'current',
  },
])

const filteredBookings = computed(() =>
  myBookings.value.filter((b) => b.status === selectedTab.value),
)

const acceptBooking = (index) => {
  alert(`Accepted booking ${index + 1}`)
}

const rejectBooking = (index) => {
  alert(`Rejected booking ${index + 1}`)
}
</script>
