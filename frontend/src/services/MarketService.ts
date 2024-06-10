import { TMarket, TShop } from '../types/types'
import axiosInstance from '../utils/axios'

export const getMarkets = async (): Promise<TMarket[]> => {
    const response = await axiosInstance.get('/markets')
    return response.data.markets
}

export const getMarket = async (id: string): Promise<TMarket> => {
    const response = await axiosInstance.get(`/markets/${id}`)
    return response.data.market
}

export const createMarket = async (name: string): Promise<TMarket> => {
    const response = await axiosInstance.post('/markets', { name })
    return response.data.market
}

export const updateMarket = async (id: string, name: string): Promise<TMarket> => {
    const response = await axiosInstance.patch(`/markets/${id}`, { name })
    return response.data.market
}

export const deleteMarket = async (id: string): Promise<void> => {
    await axiosInstance.delete(`/markets/${id}`)
}

// Shops
export const getShops = async (marketId: string, filters: any): Promise<TShop[]> => {
    const queryString = new URLSearchParams(filters).toString()
    const response = await axiosInstance.get(`/markets/${marketId}/shops?${queryString}`)
    return response.data.shops
}

export const addShop = async (marketId: string, shop: Partial<TShop>): Promise<TShop> => {
    const response = await axiosInstance.post(`/markets/${marketId}/shops`, shop)
    return response.data.shop
}

export const updateShop = async (marketId: string, shopId: string, shop: Partial<TShop>): Promise<TShop> => {
    const response = await axiosInstance.patch(`/markets/${marketId}/shops/${shopId}`, shop)
    return response.data.shop
}

export const deleteShop = async (marketId: string, shopId: string): Promise<void> => {
    await axiosInstance.delete(`/markets/${marketId}/shops/${shopId}`)
}
