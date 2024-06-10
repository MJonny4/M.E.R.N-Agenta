import React, { useEffect, useState } from 'react'
import { TMarket, TShop } from '../types/types'
import { getMarkets, createMarket, updateMarket, deleteMarket } from '../services/MarketService'
import { getShops, addShop, updateShop, deleteShop } from '../services/MarketService'
import MarketList from '../components/markets/MarketList'
import MarketForm from '../components/markets/MarketForm'
import ShopList from '../components/markets/ShopList'
import ShopForm from '../components/markets/ShopForm'

const Market: React.FC = () => {
    const [markets, setMarkets] = useState<TMarket[]>([])
    const [selectedMarket, setSelectedMarket] = useState<TMarket | null>(null)
    const [shops, setShops] = useState<TShop[]>([])

    useEffect(() => {
        fetchMarkets()
    }, [])

    useEffect(() => {
        if (selectedMarket) {
            fetchShops(selectedMarket._id)
        }
    }, [selectedMarket])

    const fetchMarkets = async () => {
        try {
            const data = await getMarkets()
            setMarkets(data)
        } catch (error) {
            console.error('Failed to fetch markets:', error)
        }
    }

    const fetchShops = async (marketId: string) => {
        try {
            const data = await getShops(marketId, {})
            setShops(data)
        } catch (error) {
            console.error('Failed to fetch shops:', error)
        }
    }

    const handleMarketSubmit = async (data: { name: string }) => {
        try {
            if (selectedMarket) {
                await updateMarket(selectedMarket._id, data.name)
            } else {
                await createMarket(data.name)
            }
            setSelectedMarket(null)
            fetchMarkets()
        } catch (error) {
            console.error('Failed to submit market:', error)
        }
    }

    const handleShopSubmit = async (data: Partial<TShop>) => {
        try {
            if (selectedMarket) {
                if (data._id) {
                    await updateShop(selectedMarket._id, data._id, data)
                } else {
                    await addShop(selectedMarket._id, data)
                }
                fetchShops(selectedMarket._id)
            }
        } catch (error) {
            console.error('Failed to submit shop:', error)
        }
    }

    const handleDeleteMarket = async (id: string) => {
        try {
            await deleteMarket(id)
            setSelectedMarket(null)
            fetchMarkets()
        } catch (error) {
            console.error('Failed to delete market:', error)
        }
    }

    const handleDeleteShop = async (shopId: string) => {
        try {
            if (selectedMarket) {
                await deleteShop(selectedMarket._id, shopId)
                fetchShops(selectedMarket._id)
            }
        } catch (error) {
            console.error('Failed to delete shop:', error)
        }
    }

    return (
        <div className='container mx-auto py-8'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                {/* Market List */}
                <div>
                    <h2 className='text-2xl font-semibold mb-4'>Markets</h2>
                    {selectedMarket ? (
                        <>
                            <MarketForm onSubmit={handleMarketSubmit} initialValues={selectedMarket} />
                            <button
                                className='bg-medium-coffee-latte text-white px-4 py-2 rounded mb-4'
                                onClick={() => setSelectedMarket(null)}
                            >
                                Stop Editing
                            </button>
                        </>
                    ) : (
                        <MarketForm onSubmit={handleMarketSubmit} initialValues={null} />
                    )}
                    <MarketList
                        markets={markets}
                        onEdit={(market) => setSelectedMarket(market)}
                        onDelete={handleDeleteMarket}
                    />
                </div>

                {/* Shop List */}
                <div>
                    <h2 className='text-2xl font-semibold mb-4'>Shops</h2>
                    {selectedMarket ? (
                        <>
                            <ShopForm onSubmit={handleShopSubmit} />
                            <ShopList
                                shops={shops}
                                onEdit={(shop) => handleShopSubmit(shop)}
                                onDelete={handleDeleteShop}
                            />
                        </>
                    ) : (
                        <p>Please select a market to view shops.</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Market
