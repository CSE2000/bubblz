<template>
  <section class="w-full">
    <div class="overflow-hidden">
      <div class="relative w-full h-[220px] md:h-[400px] p-4">
        <!-- Loading state -->
        <div
          v-if="bannerStore.loading"
          class="w-full h-full bg-gray-200 rounded-md flex items-center justify-center"
        >
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>

        <!-- Error state -->
        <div
          v-else-if="bannerStore.error"
          class="w-full h-full bg-red-100 rounded-md flex items-center justify-center"
        >
          <p class="text-red-500 text-center">Failed to load banners</p>
        </div>

        <!-- Banner display -->
        <div v-else-if="activeBanners.length > 0" class="relative w-full h-full">
          <img
            :src="activeBanners[currentIndex].image_full_url"
            :alt="activeBanners[currentIndex].name"
            class="w-full h-full object-cover rounded-md transition-opacity duration-700"
            @error="handleImageError"
          />

          <!-- Banner indicators (dots) -->
          <div
            v-if="activeBanners.length > 1"
            class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2"
          >
            <button
              v-for="(banner, index) in activeBanners"
              :key="banner.id"
              @click="currentIndex = index"
              :class="[
                'w-3 h-3 rounded-full transition-all duration-300',
                currentIndex === index ? 'bg-white' : 'bg-white/50',
              ]"
            ></button>
          </div>

          <!-- Navigation arrows -->
          <div
            v-if="activeBanners.length > 1"
            class="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4"
          >
            <button
              @click="previousBanner"
              class="bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors duration-200"
            >
              ←
            </button>
            <button
              @click="nextBanner"
              class="bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors duration-200"
            >
              →
            </button>
          </div>

          <!-- Banner info overlay -->
          <div
            class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 rounded-b-md"
          >
            <h3 class="text-white text-lg font-semibold">{{ activeBanners[currentIndex].name }}</h3>
          </div>
        </div>

        <!-- No banners state -->
        <div v-else class="w-full h-full bg-gray-100 rounded-md flex items-center justify-center">
          <p class="text-center text-gray-500">No active banners found.</p>
        </div>
      </div>
    </div>

    <!-- Pagination for admin/dashboard -->
    <div
      v-if="showPagination && bannerStore.pagination.pages > 1"
      class="flex justify-center mt-4 space-x-2"
    >
      <button
        v-for="page in bannerStore.pagination.pages"
        :key="page"
        @click="loadPage(page)"
        :class="[
          'px-3 py-1 rounded',
          page === bannerStore.pagination.page
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
        ]"
      >
        {{ page }}
      </button>
    </div>
  </section>
</template>

<script setup>
import { watch } from 'vue'
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useBannerStore } from '@/stores/user/bannerStore'

// Props
const props = defineProps({
  showPagination: {
    type: Boolean,
    default: false,
  },
  autoSlide: {
    type: Boolean,
    default: true,
  },
  slideInterval: {
    type: Number,
    default: 5000,
  },
})

const bannerStore = useBannerStore()
const currentIndex = ref(0)
let intervalId = null

// Computed property to get only active banners
const activeBanners = computed(() => {
  return bannerStore.banners.filter((banner) => banner.status === 'active')
})

// Navigation methods
const nextBanner = () => {
  if (activeBanners.value.length > 0) {
    currentIndex.value = (currentIndex.value + 1) % activeBanners.value.length
  }
}

const previousBanner = () => {
  if (activeBanners.value.length > 0) {
    currentIndex.value =
      currentIndex.value === 0 ? activeBanners.value.length - 1 : currentIndex.value - 1
  }
}

// Handle image loading errors
const handleImageError = (event) => {
  console.error('Failed to load banner image:', event.target.src)
  event.target.src = '/placeholder-banner.jpg' // Fallback image
}

// Pagination method
const loadPage = async (page) => {
  await bannerStore.getBanners(page)
  currentIndex.value = 0 // Reset to first banner when loading new page
}

// Auto-slide functionality
const startAutoSlide = () => {
  if (props.autoSlide && activeBanners.value.length > 1) {
    intervalId = setInterval(() => {
      nextBanner()
    }, props.slideInterval)
  }
}

const stopAutoSlide = () => {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
}

onMounted(async () => {
  await bannerStore.getBanners()

  // Reset current index if it's out of bounds
  if (currentIndex.value >= activeBanners.value.length) {
    currentIndex.value = 0
  }

  startAutoSlide()
})

onUnmounted(() => {
  stopAutoSlide()
})

// Restart auto-slide when activeBanners change
watch(
  activeBanners,
  () => {
    stopAutoSlide()
    startAutoSlide()
  },
  { deep: true },
)
</script>
