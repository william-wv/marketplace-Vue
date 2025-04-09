import { ref } from 'vue';

export function useConversorDolar() {
  const taxaDeCambio = ref(0.17);

  function converterParaDolar(precoBRL) {
    if (!precoBRL) return '$ 0.00';

    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(precoBRL * taxaDeCambio.value);
  }

  return {
    taxaDeCambio,
    converterParaDolar
  };
}
