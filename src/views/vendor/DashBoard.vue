<template>
  <DefaultLayout class="md:px-40">
    <div class="space-y-6 max-w-2xl mx-auto">
      <!-- Today's Schedule -->
      <section class="p-4 space-y-2">
        <h2 class="text-lg font-semibold">Today's Schedule</h2>
        <div
          v-if="todaySchedule"
          class="flex flex-col sm:flex-row sm:items-center justify-between pt-3"
        >
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
        <div v-else class="text-center py-4 text-gray-500">No schedule for today</div>
      </section>

      <!-- New Bookings -->
      <section class="p-4 space-y-4">
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-semibold">New Bookings</h2>
          <p class="text-sm text-gray-500">{{ bookingStore.newBookings?.length || 0 }} Requests</p>
        </div>

        <div class="space-y-3">
          <BookingCard
            v-for="booking in visibleBookings"
            :key="booking.id"
            :booking="booking"
            @accept="acceptBooking"
            @reject="rejectBooking"
          />
        </div>

        <div v-if="bookingStore.newBookings.length > 2" class="text-center">
          <button class="w-full py-2 text-sm text-blue-600 font-medium" @click="toggleShowAll">
            {{ showAllBookings ? 'Hide Requests' : 'View all Requests' }}
          </button>
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
        <BookingList v-for="item in filteredBookings" :key="item.id" :booking="item" />
      </section>
    </div>
  </DefaultLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import BookingCard from '@/components/Vendor/BookingCard.vue'
import BookingList from '@/components/Vendor/BookingList.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useVendorBookingStore } from '@/stores/vendor/bookingCardStore'

const bookingStore = useVendorBookingStore()

const selectedTab = ref('current')
const showAllBookings = ref(false)

// Computed properties
const todaySchedule = computed(() => bookingStore.todaySchedule)

const visibleBookings = computed(() => {
  const sorted = [...bookingStore.newBookings].reverse()
  return showAllBookings.value ? sorted : sorted.slice(0, 2)
})

const filteredBookings = computed(() =>
  selectedTab.value === 'current' ? bookingStore.currentBookings : bookingStore.completedBookings,
)

// Methods
const toggleShowAll = () => {
  showAllBookings.value = !showAllBookings.value
}

const acceptBooking = async (bookingId) => {
  await bookingStore.acceptBooking(bookingId)
}

const rejectBooking = async (bookingId) => {
  await bookingStore.rejectBooking(bookingId)
}

// Load data on mount
onMounted(() => {
  // Pass employee ID (you might want to get this from auth store or route params)
  bookingStore.fetchTodaySchedule() // Replace 10 with actual employee ID
  bookingStore.fetchNewBookings()
  bookingStore.fetchAllBookings()
})
</script>
