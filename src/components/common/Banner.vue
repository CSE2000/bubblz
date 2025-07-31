<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useBannerStore } from '@/stores/user/bannerStore'
import { storeToRefs } from 'pinia'

const bannerStore = useBannerStore()
const { banners } = storeToRefs(bannerStore)
const { getBanners } = bannerStore

const baseImageUrl = 'https://jxtqdwlv-5000.inc1.devtunnels.ms/uploads/banners'
const currentIndex = ref(0)
let interval = null

// Only active banners
const activeBanners = computed(() => banners.value.filter((b) => b.status === 'active'))

const getImageUrl = () => {
  const banner = activeBanners.value[currentIndex.value]
  if (!banner) return ''
  return banner.image_url.startsWith('http')
    ? banner.image_url
    : `${baseImageUrl}/${banner.image_url}`
}

const handleImageError = () => {
  const failedId = activeBanners.value[currentIndex.value]?.id
  banners.value = banners.value.filter((b) => b.id !== failedId)
  currentIndex.value = 0
}

const startRotation = () => {
  if (interval) clearInterval(interval)
  if (activeBanners.value.length > 1) {
    interval = setInterval(() => {
      currentIndex.value = (currentIndex.value + 1) % activeBanners.value.length
    }, 5000)
  }
}

onMounted(async () => {
  await getBanners()
  startRotation()
})

onBeforeUnmount(() => {
  if (interval) clearInterval(interval)
})
</script>

<template>
  <div v-if="activeBanners.length" class="w-full py-4 px-2">
    <div class="relative w-full h-48 sm:h-64 md:h-72 lg:h-80 rounded-lg overflow-hidden shadow">
      <transition name="fade" mode="out-in">
        <img
          :src="getImageUrl()"
          :alt="activeBanners[currentIndex]?.name || 'Banner'"
          :key="activeBanners[currentIndex]?.id || currentIndex"
          class="w-full h-full object-cover"
          @error="handleImageError"
        />
      </transition>
    </div>
  </div>

  <div v-else class="text-center text-gray-400 py-6">No banners available</div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<!-- <script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useBannerStore } from '@/stores/user/bannerStore'
import { storeToRefs } from 'pinia'

const bannerStore = useBannerStore()
const { banners } = storeToRefs(bannerStore)
const { getBanners } = bannerStore

const baseImageUrl = 'https://jxtqdwlv-5000.inc1.devtunnels.ms/uploads'
const currentIndex = ref(0)
let interval = null

const startRotation = () => {
  interval = setInterval(() => {
    if (banners.value.length > 0) {
      currentIndex.value = (currentIndex.value + 1) % banners.value.length
    }
  }, 5000)
}

onMounted(async () => {
  await getBanners()
  console.log('Loaded banners:', banners.value)
  startRotation()
})

onBeforeUnmount(() => {
  clearInterval(interval)
})
</script>

<template>
  <div v-if="banners.length" class="w-full overflow-hidden py-4">
    <div class="relative w-full h-48 sm:h-64 md:h-72 lg:h-80 rounded-lg overflow-hidden shadow">
      <transition name="fade" mode="out-in">
        <img
          :src="baseImageUrl + banners[currentIndex].image_url"
          :alt="banners[currentIndex].name"
          :key="banners[currentIndex].id"
          class="w-full h-full object-cover"
        />
      </transition>
    </div>
  </div>

  <div v-else class="text-center text-gray-400 py-6">No banners available</div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style> -->
