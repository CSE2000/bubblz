<template>
  <DefaultLayout>
    <section class="px-4 py-6 max-w-3xl mx-auto space-y-6">
      <h1 class="text-2xl font-bold text-gray-800">Start Job</h1>
      <p class="text-gray-600">
        Please take a photo of the job site or materials to verify your arrival and readiness to
        begin work.
      </p>

      <!-- Camera Preview -->
      <div class="w-full aspect-video bg-gray-200 rounded overflow-hidden shadow">
        <video ref="video" autoplay playsinline class="w-full h-full object-cover"></video>
      </div>

      <!-- Capture Button -->
      <div class="flex justify-center">
        <button
          @click="takePhoto"
          class="bg-blue-600 text-white px-6 py-2 rounded-full shadow hover:bg-blue-700 transition"
        >
          Tap to Take Photo
        </button>
      </div>

      <!-- Captured Image Preview -->
      <div v-if="photo" class="mt-4">
        <p class="font-medium text-gray-700 mb-2">Captured Photo:</p>
        <img :src="photo" alt="Captured" class="rounded shadow-md max-w-full" />
      </div>

      <!-- Upload Button -->
      <div v-if="photo" class="flex justify-center mt-4">
        <button
          @click="uploadPhoto"
          :disabled="uploading"
          class="bg-green-600 text-white px-6 py-2 rounded-full shadow hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ uploading ? 'Uploading...' : 'Upload Photo' }}
        </button>
      </div>

      <!-- Success Message -->
      <div
        v-if="uploadSuccess"
        class="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded"
      >
        Photo uploaded successfully!
      </div>

      <!-- Error Message -->
      <div
        v-if="uploadError"
        class="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded"
      >
        {{ uploadError }}
      </div>
    </section>
  </DefaultLayout>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { storeToRefs } from 'pinia'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useJobStore } from '@/stores/vendor/startJobStore'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const jobId = route.query.id

const video = ref(null)
const stream = ref(null)
const photo = ref(null)

// Job store
const jobStore = useJobStore()
const { uploading, uploadError, uploadSuccess } = storeToRefs(jobStore)
const { uploadJobStartImage, resetUploadState } = jobStore

onMounted(async () => {
  resetUploadState()

  try {
    stream.value = await navigator.mediaDevices.getUserMedia({ video: true })
    if (video.value) {
      video.value.srcObject = stream.value
    }
  } catch (err) {
    console.error('Error accessing camera:', err)
  }
})

onBeforeUnmount(() => {
  if (stream.value) {
    stream.value.getTracks().forEach((track) => track.stop())
  }
})

function takePhoto() {
  if (!video.value) return
  const canvas = document.createElement('canvas')
  canvas.width = video.value.videoWidth
  canvas.height = video.value.videoHeight
  const ctx = canvas.getContext('2d')
  ctx.drawImage(video.value, 0, 0, canvas.width, canvas.height)
  photo.value = canvas.toDataURL('image/jpeg') // Using jpeg for smaller file size is often better
}

async function uploadPhoto() {
  if (!photo.value) return

  try {
    const response = await fetch(photo.value)
    const blob = await response.blob()
    const bookingId = route.query.id

    // Make sure bookingId exists before proceeding
    if (!bookingId) {
      uploadError.value = 'Error: Booking ID is missing.'
      return
    }

    await uploadJobStartImage(blob, bookingId)

    // Check for success from the store and navigate
    if (uploadSuccess.value) {
      // 👇 This is the corrected line
      router.push({ name: 'CompleteJob', query: { id: bookingId } })
    }
  } catch (error) {
    console.error('Error uploading image:', error)
    // The store should ideally handle setting the uploadError state
  }
}
</script>

<style scoped>
/* Optional: Fullscreen or custom styling if needed */
</style>
