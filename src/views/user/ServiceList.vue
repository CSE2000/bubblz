<script setup>
import { onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import BannerPromo from '@/components/common/Banner.vue'
import PopularServices from '@/components/user/PopularServices.vue'
import { useServiceStore } from '@/stores/user/servicesStore'
import { useTypeOfServicesStore } from '@/stores/user/typeOfServices'

// Get route parameter
const route = useRoute()
const serviceType = route.params.type

// Services Store
const serviceStore = useServiceStore()
const { allServices } = storeToRefs(serviceStore)
const { getAllServices } = serviceStore

// Categories Store
const typeOfServicesStore = useTypeOfServicesStore()
const { services } = storeToRefs(typeOfServicesStore)
const { getServices } = typeOfServicesStore

// Get category ID based on service type name
const getCategoryId = computed(() => {
  const category = services.value.find(
    (service) => service.name.toLowerCase() === serviceType.toLowerCase(),
  )
  return category ? category.id : null
})

// Filter services based on category_id
const filteredServices = computed(() => {
  if (!getCategoryId.value) return []

  return allServices.value.filter((service) => service.category_id === getCategoryId.value)
})

// Get category name for display
const categoryName = computed(() => {
  const category = services.value.find(
    (service) => service.name.toLowerCase() === serviceType.toLowerCase(),
  )
  return category ? category.name : 'Services'
})

onMounted(() => {
  getServices()
  getAllServices()
})
</script>

<template>
  <DefaultLayout class="md:px-40">
    <BannerPromo />
    <section class="py-6 bg-white text-start">
      <h2 class="text-xl font-bold mb-4">{{ categoryName }} Services</h2>
      <div
        v-if="filteredServices.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4"
      >
        <PopularServices
          v-for="(service, index) in filteredServices"
          :key="index"
          :vendorId="service.id"
          :label="service.name"
          :type="service.category_id"
          :image="service.image_filename"
          :service="service"
        />
      </div>
      <div v-else class="px-4">
        <p class="text-gray-500 text-center py-8">No services available for {{ categoryName }}</p>
      </div>
    </section>
  </DefaultLayout>
</template>
