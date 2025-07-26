<template>
  <DefaultLayout class="min-h-screen md:px-28 lg:px-64">
    <div class="p-4 md:p-6">
      <!-- Your Cart -->
      <div>
        <h2 class="text-lg font-semibold mb-4">Your Cart</h2>
        <div
          v-for="item in cartItems"
          :key="item.id"
          class="flex items-center justify-between mb-4"
        >
          <div class="flex items-center gap-3">
            <img :src="item.image" alt="item" class="w-14 h-14 object-cover rounded" />
            <div>
              <p class="text-sm font-medium">{{ item.title }}</p>
              <p class="text-sm font-semibold">₹{{ item.price }}</p>
            </div>
          </div>
          <button class="text-red-500 text-xl font-bold"><i class="pi pi-trash"></i></button>
        </div>
      </div>

      <!-- Time Slot Selection -->
      <div class="mb-6">
        <label class="text-sm font-medium block mb-2">Choose Time Slot</label>
        <div class="flex overflow-x-auto gap-2 pb-2 hide-scrollbar">
          <button
        v-for="slot in timeSlots"
        :key="slot"
        @click="selectedSlot = slot"
        :class="[
          'px-4 py-2 rounded-md text-sm font-medium transition whitespace-nowrap',
          selectedSlot === slot
            ? 'bg-[#2076E2] text-white'
            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
        ]"
          >
        {{ slot }}
          </button>
        </div>
      </div>

      <!-- Coupon Code -->
      <div class="mb-4">
        <label class="text-sm font-medium block mb-1">Coupon Code</label>
        <div class="flex gap-2">
          <input
            type="text"
            placeholder="PROMO CODE"
            class="w-full border rounded-md px-3 py-2 text-sm"
          />
          <button class="bg-[#2076E2] text-white px-4 py-2 rounded-md text-sm cursor-pointer">
            Apply
          </button>
        </div>
      </div>

      <!-- Billing Details -->
      <div class="border-t pt-4 mt-4 text-sm">
        <h3 class="font-semibold mb-2">Billing Details</h3>
        <div class="flex justify-between mb-1">
          <span>Item Total</span>
          <span>₹1398.00</span>
        </div>
        <div class="flex justify-between mb-1">
          <span>Service Charge</span>
          <span>₹12.00</span>
        </div>
        <div class="flex justify-between mb-1">
          <span>Estimated Time</span>
          <span>30 min</span>
        </div>
        <div class="flex justify-between font-semibold text-base mt-2">
          <span>To Pay</span>
          <span>₹1410.00</span>
        </div>
      </div>

      <!-- Address and Details -->
      <div class="mt-6 text-sm space-y-4">
        <div>
          <p class="font-semibold">Vehicle</p>
          <p>Hyundai Creta - White<br />Reg No - OD 04 D 4644</p>
          <button
            @click="vehicleModal = true"
            class="text-[#2076E2] text-md mt-1 font-semibold cursor-pointer"
          >
            Add New Car
          </button>
        </div>

        <div>
          <p class="font-semibold">Address</p>
          <p>541 Lexington Lodge Suite 139 Arkansas City, Kansas 74044</p>
          <button
            @click="addressModal = true"
            class="text-[#2076E2] text-md mt-1 font-semibold cursor-pointer"
          >
            Change Address
          </button>
        </div>

        <div>
          <p class="font-semibold">Contact</p>
          <p>Mr. Lalit Modi</p>
          <p>📞 +91 9877898941, +91 8887993934</p>
          <button
            @click="contactModal = true"
            class="text-[#2076E2] text-md mt-1 font-semibold cursor-pointer"
          >
            Add Alternate Number
          </button>
        </div>
      </div>

      <!-- Leave Message -->
      <div class="mt-6">
        <label class="text-sm font-semibold block mb-1">Leave Message</label>
        <textarea
          placeholder="Message for the Serviceman"
          class="w-full border rounded-md px-3 py-2 text-sm resize-none h-20"
        ></textarea>
      </div>

      <!-- Terms Checkbox -->
      <div class="mt-4 text-xs text-gray-600 flex items-start gap-2">
        <input type="checkbox" class="mt-1" />
        <p>
          I confirm that the service details, address, and contact information provided are correct.
          I agree to the terms & conditions and authorize the payment for this booking.
        </p>
      </div>

      <!-- Pay Button -->
      <div class="mt-6">
        <button
          class="bg-[#2076E2] text-white w-full py-3 rounded-md font-semibold transition cursor-pointer"
        >
          Pay Now
        </button>
      </div>
    </div>
  </DefaultLayout>

  <!-- BASE MODAL FOR VEHICLE DETAILS -->
  <BaseModal v-model="addressModal" title="Change Address">
    <div class="space-y-4">
      <!-- Location Banner -->
      <div class="h-40 bg-gray-200 w-full flex items-center justify-center">
        <p class="text-sm font-semibold text-gray-700">📍 Current Location</p>
      </div>

      <!-- Address Details -->
      <div class="space-y-1">
        <div class="flex justify-between items-start">
          <!-- Left: Icon + Address -->
          <div>
            <p class="text-sm font-medium text-gray-800 flex items-center gap-1">
              <i class="pi pi-map-marker text-[#2076E2]"></i>
              Shatabdi Nagar
            </p>
            <p class="text-xs text-gray-500">Talibhandha, Raipur</p>
          </div>

          <!-- Right: Change Button -->
          <button class="bg-[#2076E2] text-white p-2 rounded-md text-sm font-semibold">
            Change
          </button>
        </div>
      </div>

      <!-- Additional Address Info -->
      <div>
        <input
          type="text"
          placeholder="Additional address details"
          class="w-full border rounded-md px-3 py-2 text-sm mt-2"
        />
        <p class="text-xs text-gray-400 mt-1">E.g : Floor No, House No, Block Name</p>
      </div>

      <!-- Name & Contact Inputs Side by Side -->
      <div class="flex flex-col flex-row gap-2 mt-2">
        <input type="text" placeholder="Name" class="flex-1 border rounded-md md:px-3 py-2 px-1 text-sm" />
        <input
          type="text"
          placeholder="Contact No"
          class="flex-1 border rounded-md md:px-3 py-2 px-1 text-sm"
        />
      </div>

      <!-- Save as Address -->

      <div class="mt-4">
        <label class="text-sm font-semibold block mb-2">Save this address as</label>
        <div class="flex gap-2">
          <button
            v-for="type in ['Home', 'Work', 'Other']"
            :key="type"
            @click="selectedType = type"
            :class="[
              'text-sm px-4 py-2 rounded-md font-medium transition',
              selectedType === type
                ? 'bg-[#2076E2] text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200',
            ]"
          >
            {{ type }}
          </button>
        </div>
      </div>
      <button class="bg-[#2076E2] text-white w-full py-3 rounded-md font-semibold transition cursor-pointer" @click="addAddress">Save Address</button>
    </div>
  </BaseModal>

  <!-- BASE MODAL FOR ADDRESS CHANGE -->
  <BaseModal v-model="vehicleModal" title="Add Vehicle">
    <div>
      <!-- Address form placeholder -->
      <input
        type="text"
        placeholder="CG 13 TH 0001"
        class="w-full border rounded-md px-3 py-2 text-sm mb-4"
      />
    </div>
    <button class="bg-[#2076E2] text-white w-full py-3 rounded-md font-semibold transition cursor-pointer" @click="addVehicle">Save</button>
  </BaseModal>

  <!-- BASE MODAL FOR CONTACT DETAILS -->
  <BaseModal v-model="contactModal" title="Add Alternate Contact">
    <div>
      <!-- Contact form placeholder -->
      <input
        type="text"
        placeholder="Alternate Contact No"
        class="w-full border rounded-md px-3 py-2 text-sm mb-4"
      />
      <button class="bg-[#2076E2] text-white w-full py-3 rounded-md font-semibold transition cursor-pointer" @click="addContact">Save</button>
    </div>
  </BaseModal>
</template>

<script setup>
import { ref } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import BaseModal from '@/components/BaseModal.vue'

const selectedType = ref('Home')
// Modals for vehicle, address, and contact details
const vehicleModal = ref(false)
const addressModal = ref(false)
const contactModal = ref(false)

const cartItems = [
  {
    id: 1,
    title: 'Flush Tank Repair (External PVC)',
    price: 699,
    image: 'https://via.placeholder.com/100x100.png?text=Product',
  },
  {
    id: 2,
    title: 'Flush Tank Repair (External PVC)',
    price: 699,
    image: 'https://via.placeholder.com/100x100.png?text=Product',
  },
]
const addVehicle = () => {
  console.log('Vehicle added:', selectedType.value)
  vehicleModal.value = false
}

const addAddress = () => {
  console.log('Address added:', selectedType.value)
  addressModal.value = false
}

const addContact = () => {
  console.log('Contact added:', selectedType.value)
  contactModal.value = false
}

const timeSlots = [
  '09:00 AM - 10:00 AM',
  '10:00 AM - 11:00 AM',
  '11:00 AM - 12:00 PM',
  '12:00 PM - 01:00 PM',
  '01:00 PM - 02:00 PM',
  '02:00 PM - 03:00 PM',
  '03:00 PM - 04:00 PM',
  '04:00 PM - 05:00 PM',
]
const selectedSlot = ref(timeSlots[0])
</script>

<style scoped>
/* Optional: Make the mobile scroll smoother */
textarea::placeholder {
  color: #aaa;
}
</style>
