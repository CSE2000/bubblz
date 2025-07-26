import { defineStore } from 'pinia'
import { ref } from 'vue'
import { makeRequest } from '@/request/request'

export const useBannerStore = defineStore('bannerStore', () => {
  const banners = ref([])
  const loading = ref(false)
  const error = ref(null)
  const pagination = ref({
    page: 1,
    pages: 1,
    per_page: 20,
    total: 0,
  })

  const getBanners = async (page = 1, per_page = 20) => {
    loading.value = true
    error.value = null

    try {
      const data = await makeRequest(`/banners?page=${page}&per_page=${per_page}`, 'GET')

      // Store only the items array and filter active banners
      banners.value = data.data.items.filter((banner) => banner.status === 'active')

      // Store pagination info
      pagination.value = {
        page: data.data.page,
        pages: data.data.pages,
        per_page: data.data.per_page,
        total: data.data.total,
      }
    } catch (err) {
      console.error('Failed to load banners:', err)
      error.value = err
      banners.value = []
    } finally {
      loading.value = false
    }
  }

  // Get active banners only
  const getActiveBanners = () => {
    return banners.value.filter((banner) => banner.status === 'active')
  }

  return {
    banners,
    loading,
    error,
    pagination,
    getBanners,
    getActiveBanners,
  }
})
