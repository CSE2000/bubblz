<!-- src/layouts/VendorLayout.vue -->
<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <header class="bg-blue-600 text-white px-6 py-4 shadow">
      <h1 class="text-xl font-bold">Vendor Dashboard</h1>
    </header>

    <main class="flex-grow px-6 py-4">
      <slot />
    </main>

    <footer class="bg-gray-100 text-center py-4 text-sm text-gray-500 border-t">
      &copy; 2025 Vendor Panel. All rights reserved.
    </footer>
  </div>
</template>

<script setup></script>
