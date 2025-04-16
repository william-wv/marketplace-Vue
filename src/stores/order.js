import { computed, ref} from 'vue';
import { defineStore } from 'pinia';
import { sendOrders } from '@/service/HttService';
import { useCartProducts } from './cartStore';
export const useOrder = defineStore('order', ()=>{
    const address = ref()
    const coupom = ref(null)
    const order_socket = ref([])
    const useCart = useCartProducts()
    const informationOrder = computed(() => ({
        address_id: address.value, 
        coupon_id: coupom.value
    }));
    
    async function addOrder() {
        try{
            // console.log(informationOrder.value)
            const response = await sendOrders(informationOrder.value)
            if(response.status === 201 ){
                useCart.itemsCart = {
                    items: [],
                    total_amount: 0
                };
                useCart.isApplyCupon = false
                useCart.discountCouponView = null
                useCart.isCheckout = false
            }
            return response
        }catch(error){
            console.log("não foi possivel realizat o pedido" + error )
        }
    }
    return{
        address,
        coupom,
        order_socket,
        addOrder,
    }
    
},{persist: true})