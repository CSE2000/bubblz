<template>
  <DefaultLayout>
    <div class="p-4 md:p-8 space-y-6 max-w-2xl mx-auto">
      <!-- Loading State -->
      <div v-if="jobStore.loading" class="text-center py-8">
        <p class="text-gray-500">Loading job details...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="jobStore.error" class="text-center py-8">
        <p class="text-red-500">{{ jobStore.error }}</p>
      </div>

      <!-- Job Details -->
      <div v-else-if="jobStore.job">
        <!-- Client Info -->
        <section class="bg-white rounded-lg shadow p-4 space-y-4">
          <h2 class="text-lg font-semibold">Client Info</h2>
          <div class="flex items-start gap-4">
            <img
              :src="jobStore.job.client.image_url || 'https://via.placeholder.com/56'"
              alt="Client"
              class="w-14 h-14 rounded-full object-cover"
            />
            <div class="space-y-1">
              <p class="font-medium">{{ jobStore.job.service.name }}</p>
              <p class="text-sm text-gray-500">
                {{ jobStore.job.scheduled_date }} • {{ jobStore.job.slot_time }}
              </p>
              <p class="text-sm text-gray-500">Client: {{ jobStore.job.client.name }}</p>
              <p class="text-sm text-gray-500">Phone: {{ jobStore.job.client.phone }}</p>
            </div>
          </div>

          <div class="space-y-3 text-sm text-gray-700">
            <div class="flex items-start gap-2">
              <span class="text-xl">📍</span>
              <p>
                <strong>Address</strong><br />
                {{ getFullAddress() }}
              </p>
            </div>

            <div v-if="jobStore.job.message_by_client" class="flex items-start gap-2">
              <span class="text-xl">💬</span>
              <p>
                <strong>Message by Client</strong><br />
                {{ jobStore.job.message_by_client }}
              </p>
            </div>
          </div>
        </section>

        <!-- Map Section -->
        <section
          v-if="jobStore.job.map.latitude && jobStore.job.map.longitude"
          class="bg-white rounded-lg shadow p-4 space-y-3"
        >
          <h2 class="text-lg font-semibold">Location & Map</h2>
          <iframe
            :src="getMapEmbedUrl()"
            width="100%"
            height="200"
            class="rounded-md border"
            allowfullscreen
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
          <a
            :href="getMapNavigationUrl()"
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
              <p>
                <strong>Service Instruction</strong><br />
                {{ jobStore.job.service_instruction || 'No specific instructions provided' }}
              </p>
            </div>

            <div class="flex items-start gap-2">
              <span class="text-xl">💰</span>
              <p>
                <strong>Payments</strong><br />
                Payment Status: {{ jobStore.job.payment.status }}<br />
                Payment Method: {{ jobStore.job.payment.method }}<br />
                Total Amount: ₹{{ jobStore.job.payment.amount }}
              </p>
            </div>
          </div>
        </section>

        <!-- Action Buttons -->
        <div class="space-y-3 mt-4">
          <router-link
            :to="{ name: 'StartJob', query: { id: jobId } }"
            class="block w-full text-center py-2 rounded-md font-medium transition-colors duration-200 bg-blue-600 text-white hover:bg-blue-700"
          >
            Start Job
          </router-link>

          <button
            v-if="jobStore.job.actions.can_connect_to_customer"
            @click="connectToCustomer"
            class="w-full border border-blue-600 text-blue-600 py-2 rounded-md font-medium hover:bg-blue-50"
          >
            <i class="pi pi-phone mr-2"></i> Connect to Customer
          </button>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useJobDetailStore } from '@/stores/vendor/jobDetailStore'

const route = useRoute()
const jobStore = useJobDetailStore()
const jobId = route.query.id

const jobStarted = ref(false)

function handleStartJob() {
  if (jobStarted.value) {
    console.log('Completing job...')
  } else {
    jobStarted.value = true
    console.log('Starting job...')
  }
}

function connectToCustomer() {
  if (jobStore.job?.client?.phone) {
    window.open(`tel:${jobStore.job.client.phone}`)
  }
}

function getFullAddress() {
  const addr = jobStore.job?.address
  if (!addr) return 'Address not provided'

  const parts = [addr.line, addr.city, addr.state, addr.pincode].filter(Boolean)
  return parts.length > 0 ? parts.join(', ') : 'Address not provided'
}

function getMapEmbedUrl() {
  const { latitude, longitude } = jobStore.job.map
  return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM!5e0!3m2!1sen!2sin!4v1632938405057!5m2!1sen!2sin`
}

function getMapNavigationUrl() {
  const { latitude, longitude } = jobStore.job.map
  return `https://maps.google.com?q=${latitude},${longitude}`
}

onMounted(() => {
  if (jobId) {
    jobStore.fetchJobDetail(jobId)
  }
})
</script>

<!-- <template>
  <DefaultLayout>
    <div class="p-4 md:p-8 space-y-6 max-w-2xl mx-auto">

      <section class="bg-white rounded-lg shadow p-4 space-y-4">
        <h2 class="text-lg font-semibold">Client Info</h2>
        <div class="flex items-start gap-4">
          <img :src="job.client.avatar" alt="Client" class="w-14 h-14 rounded-full object-cover" />
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

   
      <div class="space-y-3">
        <button
          @click="handleStartJob"
          class="block w-full text-center py-2 rounded-md font-medium transition-colors duration-200"
          :class="
            jobStarted
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          "
        >
          {{ jobStarted ? 'Complete Job' : 'Start Job' }}
        </button>

        <button
          class="w-full border border-blue-600 text-blue-600 py-2 rounded-md font-medium hover:bg-blue-50"
        >
          <i class="pi pi-phone mr-2"></i> Connect to Customer
        </button>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup>
import { useRoute } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useJobDetailStore } from '@/stores/vendor/jobDetailStore'

const route = useRoute()
const jobStore = useJobDetailStore()
const jobId = route.query.id

console.log('Job ID:', jobId)

const jobStarted = ref(false)

function handleStartJob() {
  jobStarted.value = true
}

onMounted(() => {
  if (jobId) {
    jobStore.fetchJobDetail(jobId)
  }
})

const job = jobStore.job

// Use jobId to fetch job details if needed
// const job = {
//   service: 'Wardrobe Cleaning',
//   date: 'Saturday 9 July, 2025',
//   client: {
//     name: 'Seyyeeeeee',
//     avatar: 'https://i.pravatar.cc/100?u=client123',
//   },
//   address: 'Street Connaught Place, Mumbai - 191',
//   message: 'Please call on arrival. Parking is available in Basement 2.',
//   instructions: 'Please insure all windows are cleaned, including my vehicle',
//   amount: 948,
//   mapUrl:
//     'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7619.576618367029!2d-1.9044963!3d52.4810735!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4870bd2f2d2e2f79%3A0x7c6b56c4ad37f4fc!2sBirmingham!5e0!3m2!1sen!2sin!4v1632938405057!5m2!1sen!2sin',
//   mapNavUrl: 'https://maps.google.com?q=Birmingham',
// }
</script> -->
