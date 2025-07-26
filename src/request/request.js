import axios from 'axios'

// === BASE URL CONFIGURATION ===
const BASE_URL = 'https://z48fp069-5000.inc1.devtunnels.ms' // Replace with your backend URL
axios.defaults.baseURL = BASE_URL
axios.defaults.withCredentials = true

// === HARDCODED AUTH TOKEN (for now) ===
const AUTH_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc1MzUxMDcxNywianRpIjoiZTA1MDEzZDgtNGVmNC00N2RlLWE3NGUtMWI4NzczNjRmYTU2IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjIiLCJuYmYiOjE3NTM1MTA3MTcsImNzcmYiOiI1YjBjYjcyNy0wNGQyLTQzMDktYjUwNS04NDZlZTRlOGEwYTkiLCJleHAiOjE3NTM1OTcxMTcsInJvbGUiOiJhZG1pbiJ9.mdOOiT5hOGp3ibW7YKF1zeGKQqzH7e0s63i9_BVwuWk'

// === REQUEST INTERCEPTOR ===
axios.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${AUTH_TOKEN}`
    return config
  },
  (error) => Promise.reject(error),
)

// === RESPONSE INTERCEPTOR ===
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('401 Unauthorized – clearing token and redirecting')
      localStorage.removeItem('access_token')
      // window.location.href = '/login'; // optional redirect
    }
    return Promise.reject(error)
  },
)

/**
 * Universal API Request
 *
 * @param {string} path - Endpoint path (e.g., 'users')
 * @param {'GET' | 'POST' | 'PUT' | 'DELETE'} method - HTTP method
 * @param {Object} data - Request body (for POST/PUT)
 * @param {Object} params - Query parameters
 * @param {number} wait - Optional artificial delay (ms)
 * @param {string|number|null} id - Optional ID to append
 * @param {string} subPath - Optional sub-path
 * @returns {Promise<any>}
 */
export async function makeRequest(
  path,
  method = 'GET',
  data = {},
  params = {},
  wait = 0,
  id = null,
  subPath = '',
) {
  try {
    if (!path) throw new Error('Path is required')

    // Optional artificial delay
    if (wait > 0) {
      await new Promise((resolve) => setTimeout(resolve, wait))
    }

    // Construct full URL
    let url = path.startsWith('http') ? path : `${BASE_URL}/${path}`
    if (subPath) url += `/${subPath}`
    if (id !== null && id !== undefined) url += `/${id}`

    const response = await axios({
      url,
      method: method.toUpperCase(),
      data,
      params,
    })

    return response.data
  } catch (error) {
    console.error(`[${method}] Request failed at ${path}`, error)
    throw error
  }
}

export { BASE_URL }

// // src/utils/request.js
// import axios from 'axios'

// // === BASE CONFIG ===
// export const BASE_URL = 'https://z48fp069-5000.inc1.devtunnels.ms'
// axios.defaults.baseURL = BASE_URL

// // ✅ Allow credentials (for cookies if used)
// axios.defaults.withCredentials = true

// // === REQUEST INTERCEPTOR ===
// // Automatically adds token to headers
// axios.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token')
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
//   },
//   (error) => Promise.reject(error)
// )

// // === RESPONSE INTERCEPTOR ===
// axios.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       console.warn('Unauthorized – logging out')
//       localStorage.removeItem('token')
//       window.location.href = '/login'
//     }
//     return Promise.reject(error)
//   }
// )

// /**
//  * Reusable function to make API calls
//  *
//  * @param {string} endpoint - API endpoint (e.g. 'user/login')
//  * @param {string} method - HTTP method ('GET', 'POST', etc.)
//  * @param {Object} data - Request body (for POST/PUT)
//  * @param {Object} config - Extra axios config (optional)
//  * @param {Object} params - URL query params
//  * @param {number} [wait=0] - Optional delay in ms
//  * @param {string|number} [id=null] - Optional resource ID (e.g. user/:id)
//  * @param {string} [subPath=''] - Optional sub-path (e.g. '/admin')
//  * @returns {Promise<any>}
//  */
// export async function makeRequest(
//   endpoint,
//   method = 'GET',
//   data = {},
//   config = {},
//   params = {},
//   wait = 0,
//   id = null,
//   subPath = ''
// ) {
//   try {
//     if (!endpoint) throw new Error('Endpoint is required')

//     if (wait > 0) {
//       await new Promise((res) => setTimeout(res, wait))
//     }

//     let fullPath = endpoint
//     if (subPath) fullPath += `${subPath}`
//     if (id !== null && id !== undefined) fullPath += `/${id}`

//     const response = await axios({
//       url: fullPath,
//       method: method.toUpperCase(),
//       data,
//       params,
//       ...config,
//     })

//     return response.data
//   } catch (error) {
//     console.error(`[API Error] ${method} ${endpoint}`, error)
//     throw error
//   }
// }
