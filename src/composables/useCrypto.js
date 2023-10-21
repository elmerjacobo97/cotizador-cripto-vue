import { computed, onMounted, ref } from 'vue';

export default function useCrypto() {
  const cryptocurrency = ref([]);
  const currencies = ref([
    { code: 'USD', name: 'US Dollar' },
    { code: 'MXN', name: 'Mexican Peso' },
    { code: 'EUR', name: 'Euro' },
    { code: 'GBP', name: 'British Pound' },
  ]);
  const priceCrypto = ref({});
  const isLoading = ref(false);

  onMounted(() => {
    const url =
      'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
    fetch(url)
      .then((res) => res.json())
      .then((data) => (cryptocurrency.value = data.Data))
      .catch((err) => console.log(err));
  });

  const getQuoteCrypto = async (quote) => {
    isLoading.value = true;
    priceCrypto.value = {};
    try {
      const { currency, crypto } = quote;
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${crypto}&tsyms=${currency}`;
      const res = await fetch(url);
      const data = await res.json();
      priceCrypto.value = data.DISPLAY[crypto][currency];
    } catch (error) {
      console.log(error);
      error.value = 'Hubo un error, intenta de nuevo';
      isLoading.value = false;
    } finally {
      isLoading.value = false;
    }
  };

  const showResult = computed(
    () => Object.values(priceCrypto.value).length > 0
  );

  return {
    currencies,
    cryptocurrency,
    priceCrypto,
    isLoading,
    getQuoteCrypto,
    showResult,
  };
}
