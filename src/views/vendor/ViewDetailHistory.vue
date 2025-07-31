<template>
  <DefaultLayout class="md:px-40">
    <div class="space-y-6 mx-auto md:pb-8 pb-4">  <!-- max-w-2x l -->
      <!-- Client Info -->
      <section class="bg-white rounded-lg shadow p-4 space-y-4">
        <h2 class="text-lg font-semibold">Client Info</h2>
        <div class="flex items-start gap-4">
          <!-- <img :src="job.client.avatar" alt="Client" class="w-14 h-14 rounded-full object-cover" /> -->
          <div class="space-y-1">
            <p class="font-medium">{{ job.service }}</p>
            <p class="text-sm text-gray-500">{{ job.date }}</p>
            <p class="text-sm text-gray-500">Client : {{ job.client.name }}</p>
          </div>
        </div>

        <div class="space-y-3 text-sm text-gray-700">
          <div class="flex items-start gap-2">
            <span class="text-xl">📍</span>
            <p><strong>Address</strong><br />{{ job.address }}</p>
          </div>

          <div class="flex items-start gap-2">
            <span class="text-xl">💬</span>
            <p><strong>Message by Client</strong><br />{{ job.message }}</p>
          </div>
        </div>
      </section>

      <!-- Map Section -->
      <section class="bg-white rounded-lg shadow p-4 space-y-3">
        <h2 class="text-lg font-semibold">Location & Map</h2>
        <iframe
          :src="job.mapUrl"
          width="100%"
          height="200"
          class="rounded-md border"
          allowfullscreen
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
        <a
          :href="job.mapNavUrl"
          target="_blank"
          class="block text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Navigate via Map
        </a>
      </section>

      <!-- Service Instruction -->
      <section class="bg-white rounded-lg shadow p-4 space-y-4">
        <h2 class="text-lg font-semibold">Service Instruction</h2>

        <div class="space-y-3 text-sm text-gray-700">
          <div class="flex items-start gap-2">
            <span class="text-xl">📝</span>
            <p><strong>Service Instruction</strong><br />{{ job.instructions }}</p>
          </div>

          <div class="flex items-start gap-2">
            <span class="text-xl">💰</span>
            <p>
              <strong>Payments</strong><br />
              Payable upon Completion<br />
              Total Amount: ₹{{ job.amount }}
            </p>
          </div>
        </div>
      </section>
    </div>
  </DefaultLayout>
</template>

<script setup>
import { useRoute } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useJobDetailStore } from '@/stores/vendor/jobDetailStore'

const route = useRoute()
const jobStore = useJobDetailStore()

// const job = jobStore.job

// Use jobId to fetch job details if needed
const job = {
  service: 'Wardrobe Cleaning',
  date: 'Saturday 9 July, 2025',
  client: {
    name: 'Seyyeeeeee',
    avatar: 'https://i.pravatar.cc/100?u=client123',
  },
  address: 'Street Connaught Place, Mumbai - 191',
  message: 'Please call on arrival. Parking is available in Basement 2.',
  instructions: 'Please insure all windows are cleaned, including my vehicle',
  amount: 948,
  mapUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7619.576618367029!2d-1.9044963!3d52.4810735!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4870bd2f2d2e2f79%3A0x7c6b56c4ad37f4fc!2sBirmingham!5e0!3m2!1sen!2sin!4v1632938405057!5m2!1sen!2sin',
  mapNavUrl: 'https://maps.google.com?q=Birmingham',
}
</script>
