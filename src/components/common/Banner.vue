<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useBannerStore } from '@/stores/user/bannerStore'
import { storeToRefs } from 'pinia'
import { buildUrl } from '@/utils/buildUrl'

const router = useRouter()
const bannerStore = useBannerStore()
const { banners } = storeToRefs(bannerStore)
const { getBanners } = bannerStore

const currentIndex = ref(0)
let interval = null

const activeBanners = computed(() => banners.value.filter((b) => b.status === 'active'))

const getImageUrl = () => {
  const banner = activeBanners.value[currentIndex.value]
  return buildUrl(banner?.image_url || '')
}

const getSlugUrl = () => {
  const slug = activeBanners.value[currentIndex.value]?.slug
  return slug ? (slug.startsWith('/') ? slug : `/${slug}`) : '#'
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

const handleBannerClick = () => {
  const slug = activeBanners.value[currentIndex.value]?.slug
  if (slug) {
    router.push(`/services/${slug}`)
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
        <!-- <a :href="getSlugUrl()" :key="activeBanners[currentIndex]?.id || currentIndex"> -->
        <img
          :key="activeBanners[currentIndex]?.id || currentIndex"
          :src="getImageUrl()"
          :alt="activeBanners[currentIndex]?.name || 'Banner'"
          class="w-full h-full object-cover"
          @error="handleImageError"
        />
        <!-- </a> -->
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
