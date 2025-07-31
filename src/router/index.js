// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// Shared Auth Pages
import Login from '@/views/auth/Login.vue'
import Register from '@/views/auth/Register.vue'
import ForgetPassword from '@/views/auth/ForgetPassword.vue'
import ResetPassword from '@/views/auth/ResetPassword.vue'
import RegitserEmail from '@/views/auth/RegitserEmail.vue'

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
import VendorProfile from '@/views/vendor/profile/Profile.vue'
import VendorEditProfile from '@/views/vendor/profile/EditProfile.vue'
import VendorChangePassword from '@/views/vendor/profile/ChangePassword.vue'
import VendorBookingHistory from '@/views/vendor/profile/BookingHistory.vue'
import ViewDetailHistory from '@/views/vendor/ViewDetailHistory.vue'
import AfterJobDone from '@/views/vendor/AfterJobDone.vue'

const routes = [
  // Shared Auth Routes
  { path: '/login', name: 'Login', component: Login },
  { path: '/register-email', name: 'RegisterEmail', component: RegitserEmail },
  { path: '/register', name: 'Register', component: Register },
  { path: '/forget-password', name: 'ForgetPassword', component: ForgetPassword },
  { path: '/reset-password', name: 'ResetPassword', component: ResetPassword },

  // User Routes (requiresAuth)
  { path: '/', name: 'UserDashboard', component: UserDashboard, meta: { requiresAuth: true } },
  {
    path: '/services/:type',
    name: 'ServiceList',
    component: ServiceList,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/vendor/:id',
    name: 'VendorDetail',
    component: VendorDetails,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/book/:vendorId',
    name: 'BookService',
    component: BookService,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/my-bookings',
    name: 'MyBookings',
    component: MyBookings,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/profile',
    name: 'UserProfile',
    component: UserProfile,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/payment-success',
    name: 'PaymentSuccess',
    component: PaymentSuccess,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/booking-tracking/:bookingId',
    name: 'BookingTracking',
    component: BookingTracking,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/review/:bookingId',
    name: 'UserReview',
    component: Review,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/editprofile',
    name: 'EditProfile',
    component: EditProfile,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/change-password',
    name: 'ChangePassword',
    component: ChangePassword,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/booking-history',
    name: 'BookingHistory',
    component: BookingHistory,
    props: true,
    meta: { requiresAuth: true },
  },

  // Vendor Routes (requiresAuth)
  {
    path: '/vendor/dashboard',
    name: 'VendorDashboard',
    component: VendorDashboard,
    meta: { requiresAuth: true },
  },
  {
    path: '/vendor/jobDetails',
    name: 'JobDetails',
    component: JobDetails,
    meta: { requiresAuth: true },
  },
  {
    path: '/vendor/startJob',
    name: 'StartJob',
    component: StartJob,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/vendor/jobDone',
    name: 'AfterJobDone',
    component: AfterJobDone,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/vendor/completeJobPage',
    name: 'CompleteJobPage',
    component: CompleteJobPage,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/vendor/editProfile',
    name: 'VendorEditProfile',
    component: VendorEditProfile,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/vendor/change-password',
    name: 'VendorChangePassword',
    component: VendorChangePassword,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/vendor/booking-history',
    name: 'VendorBookingHistory',
    component: VendorBookingHistory,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/vendor/profiles',
    name: 'VendorProfile',
    component: VendorProfile,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/vendor/history',
    name: 'ViewDetailHistory',
    component: ViewDetailHistory,
    props: true,
    meta: { requiresAuth: true },
  },

  { path: '/:catchAll(.*)', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const role = user.role || null

  if (to.meta.requiresAuth && !token) {
    return next('/login')
  }

  if (to.path.startsWith('/') && to.path !== '/' && role === 'employee') {
    return next('/vendor/dashboard')
  }

  if (to.path.startsWith('/vendor') && role === 'user') {
    return next('/')
  }

  next()
})

export default router
