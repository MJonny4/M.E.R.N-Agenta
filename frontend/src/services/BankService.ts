import { TBank, TMovement } from '../types/types'
import axiosInstance from '../utils/axios'

export const getBanks = async (): Promise<TBank[]> => {
    const response = await axiosInstance.get('/banks')
    return response.data.banks
}

export const getBank = async (id: string): Promise<TBank> => {
    const response = await axiosInstance.get(`/banks/${id}`)
    return response.data.bank
}

export const createBank = async (name: string, balance: number): Promise<TBank> => {
    const response = await axiosInstance.post('/banks', { name, balance })
    return response.data.bank
}

export const updateBank = async (id: string, name: string, balance: number): Promise<TBank> => {
    const response = await axiosInstance.patch(`/banks/${id}`, { name, balance })
    return response.data.bank
}

export const deleteBank = async (id: string): Promise<void> => {
    await axiosInstance.delete(`/banks/${id}`)
}

// Movements
export const getMovements = async (bankId: string, filters: any): Promise<TMovement[]> => {
    const queryString = new URLSearchParams(filters).toString()
    const response = await axiosInstance.get(`/banks/${bankId}/movements?${queryString}`)
    return response.data.movements
}

export const addMovement = async (bankId: string, movement: Partial<TMovement>): Promise<TMovement> => {
    const response = await axiosInstance.post(`/banks/${bankId}/movements`, movement)
    return response.data.movement
}

export const updateMovement = async (
    bankId: string,
    movementId: string,
    movement: Partial<TMovement>,
): Promise<TMovement> => {
    const response = await axiosInstance.patch(`/banks/${bankId}/movements/${movementId}`, movement)
    return response.data.movement
}

export const deleteMovement = async (bankId: string, movementId: string): Promise<void> => {
    await axiosInstance.delete(`/banks/${bankId}/movements/${movementId}`)
}

export const exportMovementsToExcel = async (bankId: string, filters: any): Promise<void> => {
    const queryString = new URLSearchParams(filters).toString()
    const response = await axiosInstance.get(`/banks/${bankId}/movements/export?${queryString}`, {
        responseType: 'blob',
    })

    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'movements.xlsx')
    document.body.appendChild(link)
    link.click()
    link.remove()
}
