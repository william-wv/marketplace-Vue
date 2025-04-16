import { defineStore } from 'pinia'
import { postOrders } from '@/services/http'
import { ref } from 'vue'

export const useOrder = defineStore('order', () => {
    const isLoading = ref(false)
    const error = ref(null)

    async function addOrder({ address_id, coupon_id }) {
        isLoading.value = true
        error.value = null

        try {
            const order = {
                address_id,
                coupon_id,
            }
            await postOrders(order)
        } catch (err) {
            console.error('Erro ao enviar pedido:', err)
            error.value = err
        } finally {
            isLoading.value = false
        }
    }

    return {
        addOrder,
        isLoading,
        error,
    }
})
