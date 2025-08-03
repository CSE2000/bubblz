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
        <div class="space-y-3 mt-5">
          <button
            @click="handleCompleteJob"
            :disabled="completing"
            class="block w-full text-center py-2 rounded-md font-medium transition-colors duration-200 bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
          >
            {{ completing ? 'Completing...' : 'Mark As Complete' }}
          </button>

          <button
            v-if="jobStore.job.actions.can_connect_to_customer"
            @click="connectToCustomer"
            class="w-full border border-blue-600 text-blue-600 py-2 rounded-md font-medium hover:bg-blue-50"
          >
            <i class="pi pi-phone mr-2"></i> Connect to Customer
          </button>

          <p v-if="completionError" class="text-red-500 text-sm text-center mt-2">
            {{ completionError }}
          </p>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useJobDetailStore } from '@/stores/vendor/jobDetailStore'
import { useJobStore } from '@/stores/vendor/startJobStore'

const route = useRoute()
const router = useRouter()
const jobStore = useJobDetailStore()
const startJobStore = useJobStore()

const jobId = route.query.id
const completing = ref(false)
const completionError = ref(null)

const handleCompleteJob = async () => {
  completing.value = true
  completionError.value = null

  try {
    await startJobStore.completeJob(jobId)
    router.push({ path: '/vendor/jobDone', query: { booking_id: jobId } })
  } catch (err) {
    completionError.value = err.message || 'Failed to complete job.'
  } finally {
    completing.value = false
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

// 👇 CORRECTED FUNCTION
function getMapEmbedUrl() {
  const { latitude, longitude } = jobStore.job.map
  return `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`
}

// 👇 CORRECTED FUNCTION
function getMapNavigationUrl() {
  const { latitude, longitude } = jobStore.job.map
  return `https://www.google.com/maps?q=${latitude},${longitude}`
}

onMounted(() => {
  if (jobId) {
    jobStore.fetchJobDetail(jobId)
  }
})
</script>
