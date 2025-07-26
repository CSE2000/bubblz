<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import BannerPromo from '@/components/common/Banner.vue'
import PopularServices from '@/components/user/PopularServices.vue'
import { useServiceStore } from '@/stores/user/servicesStore'

// Services Store
const serviceStore = useServiceStore()
const { allServices } = storeToRefs(serviceStore)
const { getAllServices } = serviceStore

onMounted(() => {
  getAllServices()
})
</script>

<template>
  <DefaultLayout class="md:px-40">
    <BannerPromo />
    <section class="py-6 bg-white text-start">
      <h2 class="text-xl font-bold mb-4">Car Cleaning Services</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
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
