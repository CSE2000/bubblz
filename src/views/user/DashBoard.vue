<template>
  <DefaultLayout>
    <BannerPromo />

    <!-- Vehicle Type Section -->
    <section class="py-6 bg-white text-start px-2">
      <h2 class="text-xl font-bold mb-4">What's Your Vehicle Type</h2>

      <div class="relative">
        <div class="overflow-x-auto whitespace-nowrap hide-scrollbar">
          <div class="inline-flex gap-4">
            <ServiceCard
              v-for="(service, index) in services"
              :key="index"
              :label="service.name"
              :type="service.name.toLowerCase()"
              :image="service.image_url || '/default-image.jpg'"
            />
          </div>
        </div>
      </div>
    </section>

    <FAQ class="py-6" />

    <!-- Popular Services -->
    <section class="py-4 px-2">
      <h3 class="text-lg font-bold mb-4 text-start">Popular Service booked Recently</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 px-2">
        <PopularServices
          v-for="(service, index) in allServices"
          :key="index"
          :vendorId="service.id"
          :label="service.name"
          :type="service.category_id"
          :image="service.image_filename"
          :service="service"
        />
      </div>
    </section>
  </DefaultLayout>
</template>

<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import BannerPromo from '@/components/common/Banner.vue'
import PopularServices from '@/components/user/PopularServices.vue'
import ServiceCard from '@/components/user/TypeOfServices.vue'
import FAQ from '@/components/user/FAQ.vue'
import { useTypeOfServicesStore } from '@/stores/user/typeOfServices'
import { useServiceStore } from '@/stores/user/servicesStore'

// Categories Store
const typeOfServicesStore = useTypeOfServicesStore()
const { services } = storeToRefs(typeOfServicesStore)
const { getServices } = typeOfServicesStore

// Services Store
const serviceStore = useServiceStore()
const { allServices } = storeToRefs(serviceStore)
const { getAllServices } = serviceStore

onMounted(() => {
  getServices()
  getAllServices()
})
</script>
