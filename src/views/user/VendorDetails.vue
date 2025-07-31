<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useServiceStore } from '@/stores/user/servicesStore'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { RouterLink } from 'vue-router'

const showAllAdvantages = ref(false)
const showAllDisadvantages = ref(false)

const props = defineProps({
  id: String,
})

const serviceStore = useServiceStore()
const { allServices } = storeToRefs(serviceStore)
const { getAllServices } = serviceStore

onMounted(async () => {
  if (allServices.value.length === 0) {
    await getAllServices()
  }
})

// Get current service based on ID
const currentService = computed(() =>
  allServices.value.find((s) => String(s.id) === String(props.id)),
)

// Images fallback (or from service.image_filename later if you add multiple)
const images = computed(() => {
  const img = currentService.value?.image_filename
  return img ? [img] : ['/images/img1.jpg', '/images/img2.jpg', '/images/img3.jpg']
})

const currentIndex = ref(0)
let interval = null

onMounted(() => {
  interval = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % images.value.length
  }, 5000)
})

onBeforeUnmount(() => {
  clearInterval(interval)
})
</script>

<template>
  <DefaultLayout class="md:px-40">
    <div v-if="currentService" class="flex flex-col md:flex-row gap-6 items-stretch">
      <!-- Left Side Images -->
      <div class="w-full md:w-1/2">
        <!-- Mobile Carousel -->
        <div class="block md:hidden w-full h-48 overflow-hidden rounded-lg relative">
          <img
            :src="images[currentIndex]"
            alt="Service Image"
            class="w-full h-full object-cover transition-all duration-500 bg-gray-200"
          />
          <div class="absolute bottom-2 w-full flex justify-center items-center gap-2">
            <span
              v-for="(img, index) in images"
              :key="index"
              :class="[
                'w-2.5 h-2.5 rounded-full transition-all',
                currentIndex === index ? 'bg-blue-500' : 'bg-gray-300',
              ]"
            ></span>
          </div>
        </div>

        <!-- Desktop Image Stack -->
        <div class="hidden md:flex flex-col">
          <img
            v-for="(img, i) in images"
            :key="i"
            :src="img"
            class="w-full h-40 object-cover rounded-lg bg-gray-200 mb-4"
          />
        </div>
      </div>

      <!-- Right Side Content -->
      <div class="w-full md:w-1/2 p-2 md:p-4">
        <h2 class="text-lg font-semibold">
          {{ currentService.name }}
        </h2>

        <div class="flex items-center gap-2 mt-1">
          <span v-if="currentService.price" class="line-through text-gray-400 text-sm"
            >₹{{ currentService.price }}</span
          >
          <span class="text-lg font-bold text-black">
            ₹{{ currentService.offer_price }}<span class="text-xs text-gray-500">*</span>
          </span>
        </div>

        <p class="text-sm text-gray-600 mt-3">
          {{ currentService.description }}
        </p>

        <!-- Advantages -->
        <div class="mt-4 space-y-2 text-sm">
          <p class="text-xs font-medium text-[#686B78]">Service Included</p>
          <div
            v-for="(advantage, index) in currentService.advantages?.split(',') || []"
            :key="index"
            v-show="showAllAdvantages || index < 4"
            class="flex items-start gap-2"
          >
            <img src="/image/bluetick.svg" alt="Check" class="w-5 h-5 text-blue-500" />
            <p>{{ advantage.trim() }}</p>
          </div>
          <button
            v-if="currentService.advantages?.split(',').length > 4"
            @click="showAllAdvantages = !showAllAdvantages"
            class="text-blue-500 text-sm font-medium"
          >
            {{ showAllAdvantages ? 'See Less' : 'See More' }}
          </button>
        </div>

        <!-- Book Button -->
        <RouterLink
          :to="`/book/${currentService.id}`"
          class="mt-6 inline-block text-center w-full bg-[#2076E2] text-white font-semibold py-2 px-4 rounded-lg"
        >
          Book
        </RouterLink>

        <!-- Disadvantages -->
        <div class="mt-4 space-y-2 text-sm">
          <div
            v-for="(disadvantage, index) in currentService.disadvantages?.split(',') || []"
            :key="index"
            v-show="showAllDisadvantages || index < 4"
            class="flex items-start gap-2"
          >
            <img src="/image/redtick.svg" alt="Check" class="md:w-5 md:h-5 text-blue-500" />
            <p>{{ disadvantage.trim() }}</p>
          </div>
          <button
            v-if="currentService.disadvantages?.split(',').length > 4"
            @click="showAllDisadvantages = !showAllDisadvantages"
            class="text-blue-500 text-sm font-medium"
          >
            {{ showAllDisadvantages ? 'See Less' : 'See More' }}
          </button>
        </div>

        <div class="mt-2 gap-4">
          <strong class="font-semibold text-lg">Why Choose Us</strong>

          <div class="flex items-center gap-2 mt-2">
            <img src="/image/verfied.svg" alt="Verified" class="w-5 h-5" />
            <p>Verified and experienced professionals</p>
          </div>

          <div class="flex items-center gap-2 mt-2">
            <img src="/image/affordable.svg" alt="Affordable" class="w-5 h-5" />
            <p>Affordable & transparent pricing</p>
          </div>

          <div class="flex items-center gap-2 mt-2">
            <img src="/image/ontime.svg" alt="On-time" class="w-5 h-5" />
            <p>On-time arrival and 100% satisfaction</p>
          </div>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<!-- <script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { storeToRefs } from 'pinia'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { RouterLink } from 'vue-router'
import { useServiceStore } from '@/stores/user/servicesStore'

const serviceStore = useServiceStore()
const { allServices } = storeToRefs(serviceStore)
const { getAllServices } = serviceStore

onMounted(() => {
  getAllServices
})

// Props
const props = defineProps({
  id: String,
})

// Image Carousel Logic (mobile only)
const images = ['/images/img1.jpg', '/images/img2.jpg', '/images/img3.jpg']

const currentIndex = ref(0)
let interval = null

onMounted(() => {
  interval = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % images.length
  }, 5000)
})

onBeforeUnmount(() => {
  clearInterval(interval)
})
</script>

<template>
  <DefaultLayout class="md:px-40">
    <div class="flex flex-col md:flex-row gap-6 items-stretch">

      <div class="w-full md:w-1/2">
        <div class="block md:hidden w-full h-48 overflow-hidden rounded-lg relative">
          <img
            :src="images[currentIndex]"
            alt="Service Image"
            class="w-full h-full object-cover transition-all duration-500 bg-gray-200"
          />
      
          <div class="absolute bottom-2 w-full flex justify-center items-center gap-2">
            <span
              v-for="(img, index) in images"
              :key="index"
              :class="[
                'w-2.5 h-2.5 rounded-full transition-all',
                currentIndex === index ? 'bg-blue-500' : 'bg-gray-300',
              ]"
            ></span>
          </div>
        </div>

     
        <div class="hidden md:flex flex-col gap-4">
          <img
            v-for="(img, i) in images"
            :key="i"
            :src="img"
            class="w-full h-40 object-cover rounded-lg bg-gray-200"
          />
        </div>
      </div>

      <div class="w-full md:w-1/2 p-2 md:p-4">
        <h2 class="text-lg font-semibold">Interior + Exterior Foam Wash</h2>
        <div class="flex items-center gap-2 mt-1">
          <span class="line-through text-gray-400 text-sm">₹700</span>
          <span class="text-lg font-bold text-black">
            ₹499<span class="text-xs text-gray-500">*</span>
          </span>
        </div>

        <p class="text-sm text-gray-600 mt-3">
          Restore your car’s shine with our professional car cleaning service. From exterior wash to
          interior vacuuming — we make your ride look and feel brand new, right at your doorstep.
        </p>

        <div class="mt-4 space-y-2 text-sm">
          <div class="flex items-start gap-2">
            <span class="text-blue-500 text-xl">✔</span>
            <p>Foam Wash & Tyre Polish</p>
          </div>
          <div class="flex items-start gap-2">
            <span class="text-blue-500 text-xl">✔</span>
            <p>Interior Vacuum Cleaning</p>
          </div>
          <div class="flex items-start gap-2">
            <span class="text-blue-500 text-xl">✔</span>
            <p>Exterior High Pressure Wash</p>
          </div>
          <div class="flex items-start gap-2">
            <span class="text-blue-500 text-xl">✔</span>
            <p>Tyre Polish</p>
          </div>
        </div>

        <RouterLink
          :to="`/book/${id}`"
          class="mt-6 inline-block text-center w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-all"
        >
          Book
        </RouterLink>
      </div>
    </div>
  </DefaultLayout>
</template> -->
