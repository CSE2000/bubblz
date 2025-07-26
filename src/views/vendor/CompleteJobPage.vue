<script setup>
import { ref } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const photos = ref([])
const checkboxes = ref([
  { label: "Job Completed as per Client's request", checked: false },
  { label: 'All material and Tools Cleaned Up', checked: false },
  { label: 'Client Satisfied with the Service', checked: false },
])
const isDone = ref(false)

function handleFileUpload(event) {
  const files = event.target.files
  for (let file of files) {
    photos.value.push(URL.createObjectURL(file))
  }
}

function markDone() {
  isDone.value = true
}
</script>

<template>
  <DefaultLayout>
    <div class="max-w-md mx-auto p-4 space-y-6 text-gray-800">
      <!-- Title -->
      <h2 class="text-xl font-semibold">Complete Job</h2>

      <!-- Photo Upload Section -->
      <div class="space-y-2">
        <div class="flex items-center space-x-3">
          <div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
            <span class="text-2xl">📷</span>
          </div>
          <div>
            <p class="font-semibold">Photos</p>
            <p class="text-sm text-gray-500">
              Take or Upload photos of the job. Ensure Photos clearly shown the work done.
            </p>
          </div>
        </div>

        <!-- Upload Box -->
        <div class="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
          <p class="font-medium">Upload Photos</p>
          <p class="text-sm text-gray-500 mb-4">
            Tap to Upload Photos from gallery or take new Ones
          </p>
          <label
            class="inline-flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 text-sm rounded cursor-pointer"
          >
            + Add Photos
            <input type="file" multiple class="hidden" @change="handleFileUpload" />
          </label>

          <!-- Preview -->
          <div class="flex flex-wrap mt-4 gap-2">
            <img
              v-for="(src, index) in photos"
              :key="index"
              :src="src"
              class="w-20 h-20 object-cover rounded"
            />
          </div>
        </div>
      </div>

      <!-- Task Completion -->
      <div class="border-t pt-4">
        <h3 class="text-lg font-semibold mb-2">Task Completion</h3>
        <div class="space-y-3">
          <div
            v-for="(item, index) in checkboxes"
            :key="index"
            class="flex items-start justify-between"
          >
            <p class="text-sm">{{ item.label }}</p>
            <input type="checkbox" v-model="item.checked" class="w-5 h-5 accent-blue-600" />
          </div>
        </div>
      </div>

      <!-- Done Button -->
      <button
        :class="[
          'w-full py-2 rounded-md font-semibold text-white transition',
          isDone ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700',
        ]"
        @click="markDone"
      >
        {{ isDone ? 'Completed' : 'Done' }}
      </button>
    </div>
  </DefaultLayout>
</template>

<style scoped>
input[type='checkbox'] {
  transform: scale(1.2);
}
</style>
