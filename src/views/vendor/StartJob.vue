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
    </section>
  </DefaultLayout>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const video = ref(null)
const stream = ref(null)
const photo = ref(null)

onMounted(async () => {
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
  const canvas = document.createElement('canvas')
  canvas.width = video.value.videoWidth
  canvas.height = video.value.videoHeight
  const ctx = canvas.getContext('2d')
  ctx.drawImage(video.value, 0, 0, canvas.width, canvas.height)
  photo.value = canvas.toDataURL('image/png')
}
</script>

<style scoped>
/* Optional: Fullscreen or custom styling if needed */
</style>
