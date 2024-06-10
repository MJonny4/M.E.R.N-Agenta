import axios from 'axios'

/* BaseUrl will be the endpoint because I already writed the full url in vite.config.js */
/**
 * Creates an instance of axios with a base URL of "/api/v1".
 * @type {import("axios").AxiosInstance}
 */
const axiosInstance = axios.create({
    baseURL: '/api/v1',
    withCredentials: true,
    // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    headers: {
        'Content-Type': 'application/json',
    },
})

export default axiosInstance
