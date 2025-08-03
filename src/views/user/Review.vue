<template>
  <div class="p-4 md:p-8 max-w-2xl mx-auto space-y-6 bg-white rounded-lg shadow">
    <!-- 1. Give Ratings -->
    <div>
      <p class="font-semibold text-gray-800 mb-2">1, Give ratings</p>
      <div class="flex space-x-2">
        <template v-for="i in 5" :key="i">
          <svg
            @mouseover="hoverRating = i"
            @mouseleave="hoverRating = 0"
            @click="setRating(i)"
            :class="[
              hoverRating >= i || rating >= i ? 'text-yellow-400' : 'text-gray-300',
              'w-8 h-8 cursor-pointer transition-colors',
            ]"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967h4.175c.969 0 1.371 1.24.588 1.81l-3.382 2.457 1.286 3.966c.3.922-.755 1.688-1.54 1.118L10 13.348l-3.382 2.457c-.784.57-1.838-.196-1.539-1.118l1.285-3.966-3.382-2.457c-.784-.57-.38-1.81.588-1.81h4.175l1.286-3.967z"
            />
          </svg>
        </template>
      </div>
    </div>

    <!-- 2. Add Photo or Video -->
    <div>
      <p class="font-semibold text-gray-800 mb-2">2, Add a Photo or Video</p>
      <div class="border border-dashed border-gray-300 rounded-lg p-6 text-center space-y-3">
        <p class="text-gray-600">Upload Photos</p>
        <p class="text-sm text-gray-500">Tap to Upload Photos from gallery or take new ones</p>
        <label
          class="inline-block px-4 py-2 bg-gray-100 border rounded cursor-pointer hover:bg-gray-200 transition"
        >
          + Add Photos
          <input type="file" accept="image/*,video/*" multiple hidden @change="handleFileUpload" />
        </label>

        <div v-if="photos.length" class="flex flex-wrap gap-3 mt-4 justify-center">
          <div
            v-for="(img, index) in photos"
            :key="index"
            class="w-20 h-20 overflow-hidden rounded shadow"
          >
            <img :src="img" alt="Preview" class="object-cover w-full h-full" />
          </div>
        </div>
      </div>
    </div>

    <!-- 3. Write Your Review -->
    <div>
      <p class="font-semibold text-gray-800 mb-2">3, Write your Review</p>
      <textarea
        v-model="reviewText"
        maxlength="400"
        placeholder="Message for the Serviceman"
        class="w-full h-24 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
      ></textarea>
      <p class="text-right text-sm text-gray-500 mt-1">{{ remainingChars }} characters remaining</p>
    </div>

    <!-- Submit Button -->
    <div>
      <button
        class="w-full bg-[#2076E2] text-white font-medium py-2 rounded-md"
        @click="handleSubmit"
      >
        Submit Review
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useReviewStore } from '@/stores/user/reviewStore'
import { useRoute } from 'vue-router'

const route = useRoute()

const reviewStore = useReviewStore()

const rating = ref(0)
const hoverRating = ref(0)
const reviewText = ref('')
const photos = ref([])
const photoFiles = ref([]) // actual File objects

const maxChars = 400
const remainingChars = computed(() => maxChars - reviewText.value.length)

const handleFileUpload = (e) => {
  const files = e.target.files
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    photoFiles.value.push(file)
    photos.value.push(URL.createObjectURL(file)) // preview
  }
}

const setRating = (value) => {
  rating.value = value
}

const handleSubmit = async () => {
  await reviewStore.submitReview({
    booking_id: 'id',
    rating: rating.value,
    message: reviewText.value,
    files: photoFiles.value,
  })
}
const bookingId = route.params.id
</script>
