<script setup>
import { useRouter } from 'vue-router'
import { defineProps, onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useServiceStore } from '@/stores/user/servicesStore'

const props = defineProps({
  vendorId: [String, Number],
  service: Object,
})

const router = useRouter()
function goToVendorDetails() {
  router.push({ name: 'VendorDetail', params: { id: props.vendorId } })
}

// Store
const serviceStore = useServiceStore()
const { allServices } = storeToRefs(serviceStore)
const { getAllServices } = serviceStore

onMounted(() => {
  getAllServices()
})

// Use first service from API if available
const service = computed(() => allServices.value?.[0] || null)
</script>

<template>
  <div
    class="bg-white rounded-lg md:p-4 p-2 shadow-sm flex flex-row gap-4 cursor-pointer hover:shadow-md transition"
    @click="goToVendorDetails"
  >
    <!-- Left Content -->
    <div class="flex-1">
      <div class="flex items-center gap-2 mb-1">
        <span class="bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded">
          RECOMMENDED
        </span>
      </div>

      <h2 class="font-semibold text-base text-gray-800 mb-1">
        {{ service?.name || 'Interior+Exterior Car Wash' }}
      </h2>

      <ul class="text-sm text-gray-600 list-disc ml-5 space-y-0.5 mb-2">
        <li v-if="service">{{ service.advantages }}</li>
        <li v-else>Wheels and alloy Cleaning</li>
        <li v-else>Exterior shine and vacuum cleaning</li>
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

    <!-- Right image -->
    <div class="shrink-0">
      <img
        v-if="service?.image_filename"
        :src="service.image_filename"
        alt="Service"
        class="w-32 h-24 object-cover rounded"
      />
      <div v-else class="bg-gray-200 md:h-24 md:w-32 h-22 w-28 rounded"></div>
    </div>
  </div>
</template>

<!-- <script setup>
import { useRouter } from 'vue-router'
import { defineProps } from 'vue'

const props = defineProps({
  vendorId: String,
  title: String,
  features: Array, 
  price: Number, 
  originalPrice: Number,
  imageUrl: String,
  isRecommended: Boolean,
})

const router = useRouter()

function goToVendorDetails() {
  router.push({ name: 'VendorDetail', params: { id: props.vendorId } })
}
</script>

<template>
  <div
    class="bg-white rounded-lg md:p-4 p-2 shadow-sm flex flex-row gap-4 cursor-pointer hover:shadow-md transition"
    @click="goToVendorDetails"
  >
    <div class="flex-1">
      <div v-if="props.isRecommended" class="flex items-center gap-2 mb-1">
        <span class="bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded">
          RECOMMENDED
        </span>
      </div>

      <h2 class="font-semibold text-base text-gray-800 mb-1">{{ props.title }}</h2>

      <ul class="text-sm text-gray-600 list-disc ml-5 space-y-0.5 mb-2">
        <li v-for="(feature, index) in props.features" :key="index">
          {{ feature }}
        </li>
      </ul>

      <div class="flex items-center gap-2 mb-1">
        <button
          class="text-xs text-gray-500 border border-gray-300 rounded-full px-3 py-0.5"
          @click.stop
        >
          +{{ props.features.length }} More
        </button>
        <button
          class="text-xs text-blue-600 font-semibold cursor-pointer"
          @click.stop="goToVendorDetails"
        >
          View Details <i class="pi pi-angle-double-right"></i>
        </button>
      </div>

      <div class="flex items-center gap-2 mt-2">
        <span class="text-black font-bold text-lg">₹{{ props.price }}</span>
        <span v-if="props.originalPrice" class="text-sm text-gray-500 line-through">
          ₹{{ props.originalPrice }}
        </span>
        <span v-if="props.originalPrice" class="text-sm text-blue-600 font-semibold">
          {{ Math.round(((props.originalPrice - props.price) / props.originalPrice) * 100) }}% off
        </span>
      </div>
    </div>

    <div class="shrink-0">
      <img
        :src="props.imageUrl"
        alt="Service"
        class="md:h-24 md:w-32 h-22 w-28 object-cover rounded bg-gray-200"
      />
    </div>
  </div>
</template> -->
