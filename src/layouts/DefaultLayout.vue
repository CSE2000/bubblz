<template>
  <div class="min-h-screen flex flex-col">
    <!-- Sticky Navbar -->
    <div class="fixed top-0 left-0 right-0 z-10">
      <div class="px-0 lg:px-50 xl:px-60 w-full">
        <BaseNavbar />
      </div>
    </div>

    <!-- Main content with padding-top to prevent overlap -->
    <main class="flex-grow px-0 lg:px-50 xl:px-60 w-full pt-[80px]">
      <slot />
    </main>

    <div class="px-0 lg:px-50 xl:px-60 w-full">
      <BaseFooter />
    </div>
  </div>
</template>

<script setup>
import BaseNavbar from '@/components/common/Navbar.vue'
import BaseFooter from '@/components/common/Footer.vue'
</script>
