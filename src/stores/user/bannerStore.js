// stores/useBannerStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { makeRequest } from '@/request/request'

export const useBannerStore = defineStore('banner', () => {
  const banners = ref([])
  const loading = ref(false)
  const error = ref(null)
  const pagination = ref({ page: 1, pages: 1, per_page: 20, total: 0 })

  const getBanners = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await makeRequest('/banners', 'GET')     
      let data
      if (response?.data?.data) {
        data = response.data.data
      } else if (response?.data) {
        data = response.data
      } else {
        data = response
      }
      
      if (data && data.items && Array.isArray(data.items)) {
        banners.value = data.items
        pagination.value = {
          page: data.page || 1,
          pages: data.pages || 1,
          per_page: data.per_page || 20,
          total: data.total || 0,
        }
      } else {
        console.warn('Invalid data structure received:', data)
        banners.value = []
        error.value = 'Invalid response format'
      }
    } catch (err) {
      console.error('Failed to fetch banners:', err)
      error.value = err.message || 'Failed to fetch banners'
      banners.value = []
    } finally {
      loading.value = false
    }
  }

  const getActiveBanners = () => {
    return banners.value.filter(banner => banner.status === 'active')
  }
  const getBannerById = (id) => {
    return banners.value.find(banner => banner.id === id)
  }

  return {
    banners,
    loading,
    error,
    pagination,
    getBanners,
    getActiveBanners,
    getBannerById,
  }
})