<template>
  <div
    class="flex-shrink-0 w-40 sm:w-48 rounded-lg bg-white text-center shadow-sm inline-block cursor-pointer hover:shadow-md transition"
    @click="goToServiceList"
  >
    <img :src="image" alt="Vehicle Image" class="w-full h-28 sm:h-32 object-cover rounded-t-lg" />
    <div class="p-2">
      <p class="text-sm font-medium text-gray-800">{{ label }}</p>
      <p class="text-sm font-semibold text-black">Start with ₹199*</p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  label: String,
  type: String,
  image: String,
})

const router = useRouter()

const goToServiceList = () => {
  router.push({ name: 'ServiceList', params: { type: props.type } })
}
</script>
