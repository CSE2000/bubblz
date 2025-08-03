<template>
  <div class="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-50">
    <div class="flex items-center gap-4">
      <div class="flex flex-col items-center bg-gray-200 p-2 rounded-md text-sm">
        <p class="md:text-md text-base font-semibold">{{ booking.date }}</p>
        <p class="text-gray-500 text-xs">{{ booking.month }}</p>
      </div>

      <div>
        <p class="font-medium text-xs md:text-lg">{{ booking.service }}</p>
        <p class="text-xs text-gray-500">{{ booking.client }}</p>
      </div>
    </div>

    <div class="flex gap-2">
      <!-- Rejected State -->
      <button
        v-if="booking.status === 'rejected'"
        class="bg-red-500 text-white px-3 py-1 rounded-md text-sm"
        disabled
      >
        Rejected
      </button>

      <!-- Accepted State -->
      <button
        v-else-if="booking.status === 'accepted'"
        class="bg-green-500 text-white px-3 py-1 rounded-md text-sm"
        disabled
      >
        Accepted
      </button>

      <!-- Initial Buttons -->
      <template v-else>
        <button
          class="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600"
          @click="handleReject"
          :disabled="loading"
        >
          {{ loading ? 'Processing...' : 'Reject' }}
        </button>
        <button
          class="bg-green-500 text-white px-3 py-1 rounded-md text-sm hover:bg-green-600"
          @click="handleAccept"
          :disabled="loading"
        >
          {{ loading ? 'Processing...' : 'Accept' }}
        </button>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  booking: Object,
})

const emit = defineEmits(['accept', 'reject'])

const router = useRouter()
const loading = ref(false)

// const goToDetails = () => {
//   router.push(`/vendor/jobDetails?id=${props.booking.id}`)
// }

const handleAccept = async () => {
  loading.value = true
  try {
    emit('accept', props.booking.id)
  } finally {
    loading.value = false
  }
}

const handleReject = async () => {
  loading.value = true
  try {
    emit('reject', props.booking.id)
  } finally {
    loading.value = false
  }
}
</script>
