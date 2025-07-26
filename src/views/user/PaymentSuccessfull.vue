<template>
  <div class="min-h-screen bg-white flex flex-col items-center text-center md:px-40">
    <!-- Header -->
    <div class="w-full max-x-md bg-[#1D75DE] text-white px-6 py-8 rounded-b-3xl">
      <div class="flex items-center gap-2">
        <h1 class="text-3xl font-bold">bubblz</h1>
      </div>
      <img src="/image/Tick.svg" alt="Logo" class="h-12 w-12 mt-2" />
      <div class="text-start mt-2">
        <p class="text-lg mt-6">Hi Dee,</p>
        <p class="font-bold text-2xl mt-1">Thank you for purchasing our services</p>
        <p class="text-lg mt-2">BOOKING ID: <span class="font-semibold">JSUDS#287482</span></p>
      </div>
    </div>

    <!-- Body -->
    <div class="w-full px-6 mt-6">
      <h2 class="text-left text-sm font-semibold text-gray-700 mb-3">Included Service:</h2>

      <!-- Service card -->
      <div class="flex items-start gap-2">
        <img src="/image/carwash.svg" alt="Service" class="w-20 h-20 object-cover rounded-lg" />
        <div class="flex flex-col text-left">
          <h3 class="font-bold text-base">Interior + Exterior Foam Wash</h3>
          <p class="text-xs text-gray-500 mt-1">Estimated Time: 30–45 Minutes</p>
          <p class="text-lg font-semibold text-black mt-2">₹499</p>
        </div>
      </div>

      <!-- Description -->
      <p class="text-gray-600 text-sm mt-6 leading-relaxed text-start">
        Sit back and relax — your service expert is on the way! They’ll connect with you shortly.
        Just a 2-minute breather before the magic begins.
      </p>
      <p class="text-sm text-gray-700 mt-4 text-start">Happy Invoking!</p>

      <!-- Buttons -->
      <div class="mt-6 space-y-3">
        <button
          class="w-full bg-[#2076E2] text-white py-2 rounded-lg font-medium cursor-pointer"
        >
          Track Booking
        </button>
        <router-link
          to="/"
          class="w-full text-gray-500 py-2 font-medium  transition"
        >
          Back to Home
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup></script>
