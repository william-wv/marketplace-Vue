<script setup>
import { ref } from 'vue'
import { postCupon } from '@/services/cupons'
import { push } from 'notivue'

const code = ref('')
const discount = ref(0)
const startDate = ref('')
const endDate = ref('')

const sendCoupon = async () => {
  if (!code.value.trim()) {
    push.error('Coupon code is required')
    return
  }

  if (discount.value <= 0) {
    push.error('Discount must be greater than zero')
    return
  }

  if (!startDate.value || !endDate.value) {
    push.error('Start and end dates are required')
    return
  }

  const payload = {
    code: code.value,
    discount_percentage: discount.value,
    start_date: new Date(startDate.value).toISOString(),
    end_date: new Date(endDate.value).toISOString()
  }

  console.log('Payload sent:', payload)

  const res = await postCupon(payload)

  if (res && res.status === 201) {
    push.success('Coupon created successfully!')
  } else {
    push.error('Error creating coupon!')
    console.error('Detailed error:', res?.data || res)
  }
}
</script>

<template>
    <div class=" h-100 d-flex align-items-center justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title text-center mb-4">Create Coupon</h4>
            <div class="mb-3">
              <label for="code" class="form-label">Coupon Name</label>
              <input v-model="code" type="text" id="code" class="form-control" placeholder="Enter coupon name" />
            </div>
            <div class="mb-3">
              <label for="discount" class="form-label">Discount (%)</label>
              <input v-model.number="discount" type="number" id="discount" class="form-control" placeholder="Discount in %" />
            </div>
            <div class="mb-3">
              <label for="startDate" class="form-label">Start Date</label>
              <input v-model="startDate" type="datetime-local" id="startDate" class="form-control" />
            </div>
            <div class="mb-3">
              <label for="endDate" class="form-label">End Date</label>
              <input v-model="endDate" type="datetime-local" id="endDate" class="form-control" />
            </div>
            <button @click="sendCoupon" class="btn btn-primary w-100">Create Coupon</button>
          </div>
        </div>
      </div>
    </div>
</template>

<style scoped>
.h-100{
  height: 100svh !important;
}
</style>
