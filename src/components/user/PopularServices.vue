<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { defineProps } from 'vue'
import { storeToRefs } from 'pinia'
import { useServiceStore } from '@/stores/user/servicesStore'
import { buildUrl } from '@/utils/buildUrl'

// Store
const serviceStore = useServiceStore()
const { allServices } = storeToRefs(serviceStore)

const props = defineProps({
  vendorId: [String, Number],
  service: Object,
})

// State for image handling
const isImageLoading = ref(true)
const imageError = ref(false)

const router = useRouter()

const getServiceImageUrl = () => {
  return buildUrl(props.service?.image_filename)
}

const handleImageLoad = () => {
  isImageLoading.value = false
  imageError.value = false
  // console.log('Service image loaded successfully:', getServiceImageUrl())
}

const handleImageError = (event) => {
  isImageLoading.value = false
  imageError.value = true
  // console.error('Failed to load service image:', getServiceImageUrl())
  // console.error('Error event:', event)
}

function goToVendorDetails() {
  router.push({ name: 'VendorDetail', params: { id: props.vendorId } })
}

onMounted(() => {
  if (!props.service?.image_filename) {
    isImageLoading.value = false
    imageError.value = true
  }
})
</script>

<template>
  <div
    class="bg-white rounded-lg md:p-4 p-2 shadow-sm flex flex-row gap-4 cursor-pointer hover:shadow-md transition"
    @click="goToVendorDetails"
  >
    <!-- Left Content -->
    <div class="flex-1">
      <div class="flex items-center gap-2 mb-1">
        <span
          class="text-white text-xs font-semibold px-2 py-0.5 rounded"
          :style="{ backgroundColor: service?.color || '#3B82F6' }"
        >
          {{ service?.tag?.toUpperCase() }}
        </span>
      </div>

      <h2 class="font-semibold text-base text-gray-800 mb-1">
        {{ service?.name }}
      </h2>

      <ul class="text-sm text-gray-600 list-disc ml-5 space-y-0.5 mb-2">
        <li v-if="service?.advantages">{{ service.advantages }}</li>
        <li v-else>Wheels and alloy Cleaning</li>
        <li v-if="!service?.advantages">Exterior shine and vacuum cleaning</li>
      </ul>

      <div class="flex items-center gap-2 mb-1">
        <button
          class="text-xs text-gray-500 border border-gray-300 rounded-full px-3 py-0.5"
          @click.stop
        >
          +12 More
        </button>
        <button
          class="text-xs text-blue-600 font-semibold cursor-pointer"
          @click.stop="goToVendorDetails"
        >
          View Details <i class="pi pi-angle-double-right"></i>
        </button>
      </div>

      <div class="flex items-center gap-2 mt-2">
        <span class="text-black font-bold text-lg"> ₹{{ service?.offer_price || 199 }} </span>
        <span v-if="service?.price" class="text-sm text-gray-500 line-through">
          ₹{{ service.price }}
        </span>
        <span v-if="service?.price" class="text-sm text-blue-600 font-semibold">
          {{ Math.round(((service.price - service.offer_price) / service.price) * 100) }}% off
        </span>
      </div>
    </div>

    <div class="shrink-0 relative">
      <div class="md:w-32 md:h-24 w-28 h-22 rounded overflow-hidden">
        <!-- Loading state -->
        <div
          v-if="isImageLoading && service?.image_filename"
          class="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center"
        >
          <div
            class="w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"
          ></div>
        </div>

        <div
          v-else-if="imageError || !service?.image_filename"
          class="w-full h-full bg-gray-100 flex flex-col items-center justify-center"
        >
          <svg
            class="w-6 h-6 text-gray-400 mb-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span class="text-xs text-gray-500 text-center px-1">No Image</span>
        </div>

        <img
          v-show="!isImageLoading && !imageError && service?.image_filename"
          :src="getServiceImageUrl()"
          :alt="`${service?.name || 'Service'} Image`"
          class="w-full h-full object-cover"
          @load="handleImageLoad"
          @error="handleImageError"
          loading="lazy"
        />
      </div>
    </div>
  </div>
</template>