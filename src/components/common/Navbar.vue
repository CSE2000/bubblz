<!-- <template>
  <main>
    <section>
      <div class="flex items-center justify-between md:py-5 py-4 px-2 bg-white">
        <img src="/image/Bubblz_logo.png" alt="logo" class="h-auto w-22" />
        <router-link :to="profileRoute">
          <div class="h-12 w-12 md:h-10 md:w-10 rounded-full bg-gray-200 overflow-hidden">
            <img
              v-if="profileImage"
              :src="profileImage"
              alt="User Avatar"
              class="w-full h-full object-cover"
            />
          </div>
        </router-link>
      </div>
    </section>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { useLoginStore } from '@/stores/auth/login'
import { useUserProfileStore } from '@/stores/user/profileStore'
import { useVendorProfileStore } from '@/stores/vendor/profileStore'
import { storeToRefs } from 'pinia'

// Store setup
const loginStore = useLoginStore()
const role = computed(() => loginStore.role)

const userProfileStore = useUserProfileStore()
const { profile } = storeToRefs(userProfileStore)

const vendorProfileStore = useVendorProfileStore()
const { profiles } = storeToRefs(vendorProfileStore)

// Profile image only if available
const profileImage = computed(() => {
  if (role.value === 'user') {
    return profile.value?.image_url || ''
  }
  if (role.value === 'employee') {
    return profiles.value?.image_url || ''
  }
  return ''
})

// Profile route based on role
const profileRoute = computed(() => {
  return role.value === 'employee' ? '/vendor/profiles' : '/profile'
})
</script> -->

<template>
  <main>
    <section>
      <div class="flex items-center justify-between md:py-5 py-4 px-2 bg-white">
        <img src="/image/Bubblz_logo.png" alt="logo" class="h-auto w-22" />

        <!-- Show /profile for user -->
        <router-link v-if="role === 'user'" to="/profile">
          <div class="h-12 w-12 md:h-10 md:w-10 rounded-full bg-gray-200 overflow-hidden">
            <img
              v-if="profile?.image_url"
              :src="profile.image_url"
              alt="User Avatar"
              class="w-full h-full object-cover"
            />
          </div>
        </router-link>

        <!-- Show /vendor/profiles for employee -->
        <router-link v-else-if="role === 'employee'" to="/vendor/profiles">
          <div class="h-12 w-12 md:h-10 md:w-10 rounded-full bg-gray-200 overflow-hidden">
            <img
              v-if="profiles?.image_url"
              :src="profiles.image_url"
              alt="Employee Avatar"
              class="w-full h-full object-cover"
            />
          </div>
        </router-link>

        <!-- Fallback if no role or image -->
        <div v-else class="h-12 w-12 md:h-10 md:w-10 rounded-full bg-gray-200" />
      </div>
    </section>
  </main>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue'
import { useLoginStore } from '@/stores/auth/login'
import { useUserProfileStore } from '@/stores/user/profileStore'
import { useVendorProfileStore } from '@/stores/vendor/profileStore'
import { storeToRefs } from 'pinia'

// Get stores and reactive refs
const loginStore = useLoginStore()
const role = computed(() => loginStore.role)

const userProfileStore = useUserProfileStore()
const { profile } = storeToRefs(userProfileStore)

const vendorProfileStore = useVendorProfileStore()
const { profiles } = storeToRefs(vendorProfileStore)

onMounted(async () => {
  if (role.value === 'user') {
    await userProfileStore.getUserProfile()
  } else if (role.value === 'employee') {
    await vendorProfileStore.getVendorProfile()
  }
})

watch(
  role,
  async (newRole) => {
    if (newRole === 'user') {
      await userProfileStore.getUserProfile()
    } else if (newRole === 'employee') {
      await vendorProfileStore.getVendorProfile()
    }
  },
  { immediate: true },
)
</script>
