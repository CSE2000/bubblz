<template>
  <DefaultLayout>
    <div class="min-h-screen bg-white p-4 mx-auto space-y-6">
      <h2 class="text-lg font-semibold">Complete Job</h2>

      <!-- Success/Error Messages -->
      <div
        v-if="jobDoneStore.success"
        class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded"
      >
        {{ jobDoneStore.success }}
      </div>

      <div
        v-if="jobDoneStore.error"
        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
      >
        {{ jobDoneStore.error }}
      </div>

      <!-- Upload Section -->
      <div class="border border-dashed border-gray-300 rounded-md p-6">
        <div class="flex flex-col items-center space-y-2 text-center">
          <div class="text-gray-400 text-3xl">
            <i class="pi pi-camera"></i>
          </div>
          <p class="text-sm text-gray-600">
            Take or Upload photos of the job. Ensure photos clearly show the work done.
          </p>

          <label
            for="photoUpload"
            class="mt-2 border border-gray-300 px-4 py-2 rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100 text-sm font-medium"
            :class="{ 'opacity-50 cursor-not-allowed': jobDoneStore.loading }"
          >
            + Add Photos
            <input
              id="photoUpload"
              type="file"
              class="hidden"
              multiple
              accept="image/*"
              @change="handleFileUpload"
              :disabled="jobDoneStore.loading"
            />
          </label>

          <div class="text-xs text-gray-400">
            Tap to Upload Photos from gallery or take new ones
          </div>

          <!-- Photo Previews -->
          <div v-if="form.photos.length" class="grid grid-cols-3 gap-2 mt-4">
            <div
              v-for="(photo, index) in form.photos"
              :key="index"
              class="w-full aspect-square relative border rounded overflow-hidden"
            >
              <img :src="photo.preview" alt="Photo" class="object-cover w-full h-full" />
              <button
                @click="removePhoto(index)"
                class="absolute top-1 right-1 bg-red-600 text-white text-xs px-1 rounded"
                :disabled="jobDoneStore.loading"
              >
                <i class="pi pi-times"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Checklist -->
      <div class="space-y-4">
        <h3 class="text-sm font-semibold">Task Completion</h3>

        <div
          v-for="(task, index) in taskList"
          :key="index"
          class="flex items-center justify-between px-4 py-2 text-sm"
        >
          <span>{{ task.label }}</span>
          <input type="checkbox" v-model="form.tasks[task.key]" :disabled="jobDoneStore.loading" />
        </div>
      </div>

      <!-- Submit -->
      <button
        @click="submitForm"
        class="w-full bg-[#2076E2] text-white py-2 rounded-md font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="jobDoneStore.loading || !canSubmit"
      >
        <span v-if="jobDoneStore.loading" class="flex items-center justify-center">
          <i class="pi pi-spin pi-spinner mr-2"></i>
          Uploading...
        </span>
        <span v-else>Done</span>
      </button>
    </div>
  </DefaultLayout>
</template>

<script setup>
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { reactive, computed, onUnmounted } from 'vue'
import { useUploadJobStore } from '@/stores/vendor/jobDoneStore'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const bookingId = route.query.booking_id

const jobDoneStore = useUploadJobStore()

const taskList = [
  { label: "Job Completed as per Client's request", key: 'completed' },
  { label: 'All material and Tools Cleaned Up', key: 'cleaned' },
  { label: 'Client Satisfied with the Service', key: 'satisfied' },
]

const form = reactive({
  tasks: {
    completed: false,
    cleaned: false,
    satisfied: false,
  },
  photos: [],
})

// Computed property to check if form can be submitted
const canSubmit = computed(() => {
  const allTasksCompleted = Object.values(form.tasks).every((task) => task === true)
  const hasPhotos = form.photos.length > 0
  return allTasksCompleted && hasPhotos
})

const handleFileUpload = (e) => {
  const files = Array.from(e.target.files)
  files.forEach((file) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select only image files')
      return
    }

    // Validate file size (e.g., max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size should be less than 5MB')
      return
    }

    const preview = URL.createObjectURL(file)
    form.photos.push({ file, preview })
  })
  e.target.value = ''
}

const removePhoto = (index) => {
  URL.revokeObjectURL(form.photos[index].preview)
  form.photos.splice(index, 1)
}

const submitForm = async () => {
  jobDoneStore.clearMessages()

  if (!canSubmit.value) {
    alert('Please complete all tasks and upload at least one photo')
    return
  }

  try {
    const formData = new FormData()
    form.photos.forEach((item) => {
      formData.append('image', item.file)
    })

    Object.entries(form.tasks).forEach(([key, value]) => {
      formData.append(key, value)
    })

    formData.append('booking_id', bookingId)

    // Submit the request
    const response = await jobDoneStore.uploadJobImages(formData)
    router.push('/vendor/dashboard')
    console.log('Form submitted successfully:', response)
  } catch (error) {
    console.error('Submission failed:', error)
  }
}

onUnmounted(() => {
  form.photos.forEach((photo) => {
    URL.revokeObjectURL(photo.preview)
  })
})
</script>
