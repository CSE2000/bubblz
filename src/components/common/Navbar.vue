<template>
  <main>
    <section>
      <div class="flex items-center justify-between md:py-5 py-4 px-2 bg-white">
        <h1 class="font-extrabold md:text-4xl text-3xl text-[#2076E2]">bubblz</h1>
        <router-link :to="profileRoute">
          <img
            src="/image/user-avatar.svg"
            alt="User Avatar"
            class="h-12 w-12 md:h-10 md:w-10 rounded-full bg-gray-200"
          />
        </router-link>
      </div>
    </section>
  </main>
</template>
<script setup>
import { computed } from 'vue'
import { useRouter, RouterLink } from 'vue-router'

const useRoute = useRouter()

// get role from localStorage safely
const user = JSON.parse(localStorage.getItem('user') || '{}')
const role = computed(() => user?.role || 'user')

// decide profile route based on role
const profileRoute = computed(() => {
  return role.value === 'user' ? '/profile' : '/vendor/profiles'
})
</script>
