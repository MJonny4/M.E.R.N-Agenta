import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
    withCredentials: true,
    // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    headers: {
        'Content-Type': 'application/json',
    },
})

export default axiosInstance
