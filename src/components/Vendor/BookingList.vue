<template>
  <div class="flex items-center justify-between border-b pb-3">
    <div class="flex items-center gap-3">
      <img :src="booking.avatar" alt="Client Avatar" class="w-10 h-10 rounded-full object-cover" />
      <div>
        <p class="font-medium">{{ booking.service }}</p>
        <p class="text-sm text-gray-500">{{ booking.date }}</p>
        <p class="text-sm text-gray-500">Client : {{ booking.client }}</p>
      </div>
    </div>
    <router-link
      :to="`/vendor/jobDetails?id=${booking.id}`"
      class="bg-blue-500 text-white px-4 py-1 rounded-md text-sm hover:bg-blue-600"
    >
      View
    </router-link>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
defineProps({
  booking: Object,
})
</script>
