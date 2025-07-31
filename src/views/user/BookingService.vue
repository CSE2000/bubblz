<template>
  <DefaultLayout class="min-h-screen md:px-28 lg:px-64">
    <div class="p-4 md:p-6">
      <!-- Your Cart -->
      <div>
        <h2 class="text-lg font-semibold mb-4">Your Cart</h2>
        <div
          v-for="item in selectedServices"
          :key="item.id"
          class="flex items-center justify-between mb-4"
        >
          <div class="flex items-center gap-3">
            <img :src="item.image_filename" alt="item" class="w-14 h-14 object-cover rounded" />
            <div>
              <p class="text-sm font-medium">{{ item.name }}</p>
              <p class="text-sm font-semibold">₹{{ item.offer_price }}</p>
            </div>
          </div>
          <button @click="removeItem(item.id)" class="text-red-500 text-xl font-bold">
            <i class="pi pi-trash"></i>
          </button>
        </div>
      </div>

      <!-- Time Slot Selection -->
      <div class="mb-6">
        <label class="text-sm font-medium block mb-2">Choose Time Slot </label>
        <div class="flex overflow-x-auto gap-2 pb-2 hide-scrollbar">
          <button
            v-for="slot in timeSlots"
            :key="slot"
            @click="selectedSlot = slot"
            :class="[
              'px-4 py-2 rounded-md text-sm font-medium transition whitespace-nowrap',
              selectedSlot === slot
                ? 'bg-[#2076E2] text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200',
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
            v-model="couponCode"
            type="text"
            placeholder="PROMO CODE"
            class="w-full border rounded-md px-3 py-2 text-sm"
          />
          <button
            @click="applyCoupon"
            class="bg-[#2076E2] text-white px-4 py-2 rounded-md text-sm cursor-pointer"
          >
            Apply
          </button>
        </div>
      </div>

      <!-- Billing Details -->
      <div class="border-t pt-4 mt-4 text-sm">
        <h3 class="font-semibold mb-2">Billing Details</h3>
        <div class="flex justify-between mb-1">
          <span>Item Total</span>
          <span>₹{{ itemTotal }}</span>
        </div>
        <div class="flex justify-between mb-1">
          <span>Service Charge</span>
          <span>₹{{ serviceCharge }}</span>
        </div>
        <div class="flex justify-between mb-1">
          <span>Estimated Time</span>
          <span>30 min</span>
        </div>
        <div class="flex justify-between font-semibold text-base mt-2">
          <span>ToTal Pay</span>
          <span>₹{{ toPay }}</span>
        </div>
      </div>
      <!-- Address and Details -->
      <div class="mt-4 text-sm space-y-4">
        <div>
          <p class="font-semibold"><i class="pi pi-car mr-2 text-black font-bold"></i>Vehicle</p>
          <p>{{ vehicle?.name }}<br />Reg No - {{ vehicle?.regNo }}</p>

          <button
            @click="vehicleModal = true"
            class="text-[#2076E2] text-md mt-1 font-semibold cursor-pointer"
          >
            Add New Car
          </button>
        </div>

        <div>
          <p class="font-semibold">
            <i class="pi pi-map-marker mr-2 text-black font-bold"></i> Address
          </p>
          <p>
            {{ userAddresses[0]?.address_line }}, {{ userAddresses[0]?.city }},
            {{ userAddresses[0]?.state }} - {{ userAddresses[0]?.pincode }}
          </p>

          <button
            @click="addressModal = true"
            class="text-[#2076E2] text-md mt-1 font-semibold cursor-pointer"
          >
            Change Address
          </button>
        </div>

        <div>
          <p class="font-semibold text-lg text-sm">
            <i class="pi pi-address-book mr-2 text-black font-semibold"></i> Contact
          </p>
          <p>{{ contact.name }}</p>
            <p>
            <i class="pi pi-phone mr-2 text-black font-bold"></i>
            {{ contact.numbers.join(', ') }}
            </p>

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
          v-model="userMessage"
          placeholder="Message for the Serviceman"
          class="w-full border rounded-md px-3 py-2 text-sm resize-none h-20"
        ></textarea>
      </div>

      <!-- Terms Checkbox -->
      <div class="mt-4 text-xs text-gray-600 flex items-start gap-2">
        <input v-model="confirmDetails" type="checkbox" class="mt-1" />
        <p>
          I confirm that the service details, address, and contact information provided are correct.
          I agree to the terms & conditions and authorize the payment for this booking.
        </p>
      </div>

      <!-- Pay Button -->
      <div class="mt-6">
        <button
          @click="handlePayment"
          class="bg-[#2076E2] text-white w-full py-3 rounded-md font-semibold transition cursor-pointer"
          :disabled="!confirmDetails"
          :class="{ 'opacity-50 cursor-not-allowed': !confirmDetails }"
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
          v-model="address_line"
          type="text"
          placeholder="Additional address details"
          class="w-full border rounded-md px-3 py-2 text-sm mt-2"
        />
        <p class="text-xs text-gray-400 mt-1">E.g : Floor No, House No, Block Name</p>
      </div>

      <!-- Name & Contact Inputs Side by Side -->
      <div class="grid gap-2 mt-2 grid-cols-1 lg:grid-cols-3">
        <input
          v-model="city"
          type="text"
          placeholder="City"
          class="border rounded-md px-3 py-2 text-sm"
        />
        <input
          v-model="state"
          type="text"
          placeholder="State"
          class="border rounded-md px-3 py-2 text-sm"
        />
        <input
          v-model="pincode"
          type="text"
          placeholder="Pincode"
          class="border rounded-md px-3 py-2 text-sm"
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
      <button
        class="bg-[#2076E2] text-white w-full py-3 rounded-md font-semibold transition cursor-pointer"
        @click="addAddress"
      >
        Save Address
      </button>
    </div>
  </BaseModal>

  <!-- BASE MODAL FOR ADDRESS CHANGE -->
  <BaseModal v-model="vehicleModal" title="Add Vehicle">
    <div>
      <input
        v-model="brand"
        type="text"
        placeholder="Brand (e.g., Hyundai)"
        class="w-full border rounded-md px-3 py-2 text-sm mb-2"
      />
      <input
        v-model="registration_number"
        type="text"
        placeholder="Registration No (e.g., MH12BB1234)"
        class="w-full border rounded-md px-3 py-2 text-sm mb-4"
      />
    </div>
    <button
      class="bg-[#2076E2] text-white w-full py-3 rounded-md font-semibold transition cursor-pointer"
      @click="addVehicle"
    >
      Save
    </button>
  </BaseModal>

  <!-- BASE MODAL FOR CONTACT DETAILS -->
  <BaseModal v-model="contactModal" title="Add Alternate Contact">
    <div>
      <!-- Contact form placeholder -->
      <input
        v-model="alternateContactNumber"
        type="text"
        placeholder="Alternate Contact No"
        class="w-full border rounded-md px-3 py-2 text-sm mb-4"
      />
      <button
        class="bg-[#2076E2] text-white w-full py-3 rounded-md font-semibold transition cursor-pointer"
        @click="addContact"
      >
        Save
      </button>
    </div>
  </BaseModal>
</template>

<script setup>
import { ref, computed, onMounted, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import BaseModal from '@/components/BaseModal.vue'
import { useBookingStore } from '@/stores/user/bookingStore'
import { useServiceStore } from '@/stores/user/servicesStore'
import { useRouter, useRoute } from 'vue-router'
import { useUserProfileStore } from '@/stores/user/profileStore'

const userProfileStore = useUserProfileStore()
const { profile } = storeToRefs(userProfileStore)
const { getUserProfile } = userProfileStore

const bookingStore = useBookingStore()
const { getCars, userCars, userAddresses, alternateNumbers } = storeToRefs(bookingStore)

const router = useRouter()
const route = useRoute()

// Get the service ID from route params
const props = defineProps({
  vendorId: [String, Number],
})

// Services Store
const serviceStore = useServiceStore()
const { allServices } = storeToRefs(serviceStore)
const { getAllServices } = serviceStore

onMounted(async () => {
  if (allServices.value.length === 0) {
    await getAllServices()
  }
  await Promise.all([
    bookingStore.getCars(),
    bookingStore.getAddresses(),
    bookingStore.getAlternateNumbers(),
    userProfileStore.getUserProfile(), // Add this line
  ])
  // Set the latest car
  if (userCars.value.length > 0) {
    latestCar = [...userCars.value].sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at),
    )[0]
    vehicle.value = {
      name: latestCar.brand,
      regNo: latestCar.registration_number,
    }
  }
})

// State
const selectedType = ref('Home')
const vehicleModal = ref(false)
const addressModal = ref(false)
const contactModal = ref(false)
const couponCode = ref('')
const userMessage = ref('')
const confirmDetails = ref(false)
const discountApplied = ref(false)
const brand = ref('')
const registration_number = ref('')
const alternateContactNumber = ref('')

// Get the specific service based on route parameter
const selectedServices = computed(() => {
  const serviceId = props.vendorId || route.params.vendorId
  if (serviceId) {
    const service = allServices.value.find((s) => String(s.id) === String(serviceId))
    return service ? [service] : []
  }
  return []
})

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

// Billing
const itemTotal = computed(() =>
  selectedServices.value.reduce((sum, item) => sum + Number(item.offer_price || 0), 0),
)

const serviceCharge = computed(() =>
  selectedServices.value.reduce((sum, item) => sum + Number(item.service_charge || 0), 0),
)

const toPay = computed(() => itemTotal.value + serviceCharge.value)

// Vehicle
const vehicle = ref({
  name: 'Hyundai Creta - White',
  regNo: 'OD 04 D 4644',
})

// Address
const address_line = ref('')
const city = ref('')
const state = ref('')
const pincode = ref('')

// Contact
const contact = computed(() => {
  const temp = {
    name: profile.value?.name,
    numbers: [profile.value?.phone],
  }

  temp.numbers.push(alternateNumbers.value.alternate_phone)

  return temp

  // const numbers = [profile.value?.phone_number].filter(
  //   (num) => typeof num === 'string' && num.trim() !== '',
  // )

  // if (alternateNumbers.value && Array.isArray(alternateNumbers.value)) {
  //   alternateNumbers.value.forEach((alt) => {
  //     if (alt && typeof alt.alternate_number === 'string' && alt.alternate_number.trim() !== '') {
  //       numbers.push(alt.alternate_number)
  //     }
  //   })
  // }

  // return {
  //   name: profile.value?.name || 'User',
  //   numbers: numbers.length > 0 ? numbers : ['+91 XXXXXXXXXX'],
  // }
})

// Handlers
const removeItem = (id) => {
  // Navigate back to services or show empty cart message
  router.push({ name: 'UserDashboard' })
}

const addVehicle = async () => {
  try {
    if (!brand.value || !registration_number.value) {
      alert('Please fill in both fields')
      return
    }

    await bookingStore.addCar({
      brand: brand.value,
      registration_number: registration_number.value,
    })

    vehicle.value = {
      name: brand.value,
      regNo: registration_number.value,
    }

    alert('Car added successfully!')
    brand.value = ''
    registration_number.value = ''
    vehicleModal.value = false
  } catch (error) {
    console.error('Add car error:', error)
    alert('Failed to add car. Please try again.')
  }
}

const addAddress = async () => {
  if (!address_line.value || !city.value || !state.value || !pincode.value) {
    alert('Please fill all fields')
    return
  }

  try {
    await bookingStore.addAddress({
      address_line: address_line.value,
      city: city.value,
      state: state.value,
      pincode: pincode.value,
    })

    await bookingStore.getAddresses()
    alert('Address added successfully!')
    addressModal.value = false

    // Clear fields after saving
    address_line.value = ''
    city.value = ''
    state.value = ''
    pincode.value = ''
  } catch (error) {
    alert('Failed to save address')
  }
}

const addContact = async () => {
  if (!alternateContactNumber.value.trim()) {
    alert('Please enter a valid phone number')
    return
  }

  try {
    await bookingStore.addAlternateNumber(alternateContactNumber.value)
    alternateContactNumber.value = ''
    contactModal.value = false
    alert('Alternate number added successfully!')
  } catch (error) {
    console.error('Failed to add alternate number:', error)
    alert('Failed to add alternate number. Please try again.')
  }
}

const applyCoupon = () => {
  if (couponCode.value === 'DISCOUNT50') {
    discountApplied.value = true
  }
}

const handlePayment = async () => {
  if (!confirmDetails.value) {
    alert('Please confirm your details and agree to terms.')
    return
  }

  if (selectedServices.value.length === 0) {
    alert('Please select at least one service.')
    return
  }

  try {
    const payload = {
      service_id: selectedServices.value[0]?.id || 1,
      employee_id: 2, // Replace with dynamic value if available
      scheduled_date: new Date().toISOString().split('T')[0], // e.g., 2025-08-01
      slot_time: selectedSlot.value.replace(' ', ''), // format: "10:00-11:00"
    }

    const res = await bookingStore.createBooking(payload)

    if (res) {
      alert('Booking successful!')
      router.push({ name: 'PaymentSuccess' })
    }
  } catch (err) {
    alert('Booking failed. Please try again.')
  }
}
</script>
