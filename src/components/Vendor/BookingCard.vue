<template>
  <div class="flex items-center justify-between p-2">
    <div class="flex items-center gap-4">
      <div class="text-center text-sm">
        <p class="text-lg font-semibold">{{ booking.date }}</p>
        <p class="text-gray-500">{{ booking.month }}</p>
      </div>
      <div>
        <p class="font-medium">{{ booking.service }}</p>
        <p class="text-sm text-gray-500">{{ booking.client }}</p>
      </div>
    </div>
    <div class="flex gap-2">
      <button
        class="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600"
        @click="$emit('reject')"
      >
        Reject
      </button>
      <button
        class="bg-green-500 text-white px-3 py-1 rounded-md text-sm hover:bg-green-600"
        @click="$emit('accept')"
      >
        Accept
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  booking: Object,
})
</script>
