// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router'

// Shared Auth Pages
import Login from '@/views/auth/Login.vue'
import Register from '@/views/auth/Register.vue'
import ForgetPassword from '@/views/auth/ForgetPassword.vue'
import ResetPassword from '@/views/auth/ResetPassword.vue'

// User Pages
import UserDashboard from '@/views/user/DashBoard.vue'
import ServiceList from '@/views/user/ServiceList.vue'
import VendorDetails from '@/views/user/VendorDetails.vue'
import BookService from '@/views/user/BookingService.vue'
import MyBookings from '@/views/user/MyBooking.vue'
import UserProfile from '@/views/user/profile/Profile.vue'
import PaymentSuccess from '@/views/user/PaymentSuccessfull.vue'
import BookingTracking from '@/views/user/BookingTracking.vue'
import Review from '@/views/user/Review.vue'
import EditProfile from '@/views/user/profile/EditProfile.vue'
import ChangePassword from '@/views/user/profile/ChangePassword.vue'
import BookingHistory from '@/views/user/profile/BookingHistory.vue'

// Vendor Pages
import VendorDashboard from '@/views/vendor/DashBoard.vue'
import JobDetails from '@/views/vendor/JobDetails.vue'
import StartJob from '@/views/vendor/StartJob.vue'
import CompleteJobPage from '@/views/vendor/CompleteJobPage.vue'

const routes = [
  // Shared Auth Routes
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  {
    path: '/forget-password',
    name: 'ForgetPassword',
    component: ForgetPassword,
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: ResetPassword,
  },

  // User Routes
  { path: '/', name: 'UserDashboard', component: UserDashboard },
  { path: '/services/:type', name: 'ServiceList', component: ServiceList, props: true },
  { path: '/vendor/:id', name: 'VendorDetail', component: VendorDetails, props: true },
  { path: '/book/:vendorId', name: 'BookService', component: BookService, props: true },
  { path: '/my-bookings', name: 'MyBookings', component: MyBookings, props: true },
  { path: '/profile', name: 'UserProfile', component: UserProfile, props: true },
  { path: '/payment-success', name: 'PaymentSuccess', component: PaymentSuccess, props: true },
  { path: '/booking-tracking', name: 'BookingTracking', component: BookingTracking, props: true },
  { path: '/review', name: 'UserReview', component: Review, props: true },
  { path: '/editprofile', name: 'EditProfile', component: EditProfile, props: true },
  { path: '/change-password', name: 'ChangePassword', component: ChangePassword, props: true },
  { path: '/booking-history', name: 'bookingHistory', component: BookingHistory, props: true },

  // Vendor Routes
  { path: '/vendor/dashboard', name: 'VendorDashboard', component: VendorDashboard },
  { path: '/vendor/jobDetails', name: 'JobDetails', component: JobDetails },
  { path: '/vendor/startJob', name: 'StartJob', component: StartJob, props: true },
  { path: '/vendor/completeJobPage', name: 'CompleteJobPage', component: CompleteJobPage, props: true },

  // Catch-All
  { path: '/:catchAll(.*)', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
