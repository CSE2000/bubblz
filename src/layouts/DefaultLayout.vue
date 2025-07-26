<!-- src/layouts/DefaultLayout.vue -->
<template>
  <div class="min-h-screen flex flex-col">
    <BaseNavbar />
    <main class="flex-grow">
      <slot />
    </main>
    <BaseFooter />
  </div>
</template>

<script setup>
import BaseNavbar from '@/components/common/Navbar.vue'
import BaseFooter from '@/components/common/Footer.vue'
</script>
