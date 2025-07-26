<template>
  <main>
    <section>
      <div class="flex items-center justify-between md:p-5 p-2 bg-white">
        <h1 class="font-extrabold md:text-4xl text-2xl text-[#2076E2]">bubblz</h1>
        <router-link to="/profile">
          <img
            src="/image/user-avatar.svg"
            alt="User Avatar"
            class="h-8 w-8 lg:h-10 lg:w-10 rounded-full bg-gray-200"
          />
        </router-link>
      </div>
    </section>
  </main>
</template>
<script setup>
import { RouterLink } from 'vue-router'
</script>
