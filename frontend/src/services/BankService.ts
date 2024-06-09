import { Bank, Movement } from '../types/types'
import axiosInstance from '../types/axios'

export const getBanks = async (): Promise<Bank[]> => {
    const response = await axiosInstance.get('/banks')
    return response.data.banks
}

export const getBank = async (id: string): Promise<Bank> => {
    const response = await axiosInstance.get(`/banks/${id}`)
    return response.data.bank
}

export const createBank = async (name: string, balance: number): Promise<Bank> => {
    const response = await axiosInstance.post('/banks', { name, balance })
    return response.data.bank
}

export const updateBank = async (id: string, name: string, balance: number): Promise<Bank> => {
    const response = await axiosInstance.patch(`/banks/${id}`, { name, balance })
    return response.data.bank
}

export const deleteBank = async (id: string): Promise<void> => {
    await axiosInstance.delete(`/banks/${id}`)
}

// Movements
export const getMovements = async (bankId: string): Promise<Movement[]> => {
    const response = await axiosInstance.get(`/banks/${bankId}/movements`)
    return response.data.movements
}

// export const getMovements = async (bankId: string, filters: any): Promise<Movement[]> => {
//     const queryString = new URLSearchParams(filters).toString()
//     const response = await axios.get(`${API_URL}/banks/${bankId}/movements?${queryString}`, { withCredentials: true })
//     return response.data.movements
// }

// export const addMovement = async (bankId: string, movement: Partial<Movement>): Promise<Movement> => {
//     const response = await axios.post(`${API_URL}/banks/${bankId}/movements`, movement)
//     return response.data.movement
// }

// export const updateMovement = async (
//     bankId: string,
//     movementId: string,
//     movement: Partial<Movement>,
// ): Promise<Movement> => {
//     const response = await axios.put(`${API_URL}/banks/${bankId}/movements/${movementId}`, movement)
//     return response.data.movement
// }

// export const deleteMovement = async (bankId: string, movementId: string): Promise<void> => {
//     await axios.delete(`${API_URL}/banks/${bankId}/movements/${movementId}`)
// }

// export const exportMovementsToExcel = async (bankId: string, filters: any): Promise<void> => {
//     const queryString = new URLSearchParams(filters).toString()
//     const response = await axios.get(`${API_URL}/banks/${bankId}/movements/export?${queryString}`, {
//         responseType: 'blob',
//     })

//     const url = window.URL.createObjectURL(new Blob([response.data]))
//     const link = document.createElement('a')
//     link.href = url
//     link.setAttribute('download', 'movements.xlsx')
//     document.body.appendChild(link)
//     link.click()
//     link.remove()
// }
