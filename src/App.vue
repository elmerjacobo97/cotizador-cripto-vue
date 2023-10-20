<script setup>
import { ref, onMounted, reactive } from 'vue';
import Alert from './components/Alert.vue';

const currencies = ref([
  { code: 'PEN', name: 'Peruvian Nuevo Sol' },
  { code: 'USD', name: 'US Dollar' },
  { code: 'MXN', name: 'Mexican Peso' },
  { code: 'EUR', name: 'Euro' },
  { code: 'GBP', name: 'British Pound' },
]);
const cryptocurrency = ref([]);
const error = ref('');
const quote = reactive({
  currency: '',
  crypto: ''
});

onMounted(() => {
  const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
  fetch(url)
    .then(res => res.json())
    .then(data => cryptocurrency.value = data.Data)
    .catch(err => console.log(err));
})

const quoteCrypto = () => {
  // validar
  if (Object.values(quote).includes('')) {
    error.value = 'Todos los campos son obligatorios';
    return;
  }

  error.value = '';

  getQuoteCrypto();

}

const getQuoteCrypto = async () => {
  const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${quote.crypto}&tsyms=${quote.currency}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
}


</script>

<template>
  <div class="container">
    <h1 class="title">Cotizador de <span>Criptomonedas</span></h1>
    <div class="content">
      <Alert v-if="error">
        {{ error }}
      </Alert>
      <form class="form" @submit.prevent="quoteCrypto">
        <div class="field">
          <label for="currency">Moneda</label>
          <select id="currency" v-model="quote.currency">
            <option value="">-- Selecciona una moneda --</option>
            <option v-for="currency in currencies" :key="currency.code" :value="currency.code">{{ currency.name }}
            </option>
          </select>
        </div>
        <div class="field">
          <label for="crypto">Moneda</label>
          <select id="crypto" v-model="quote.crypto">
            <option value="">-- Selecciona una criptomoneda --</option>
            <option v-for="crypto in cryptocurrency" :key="crypto.CoinInfo.Name" :value="crypto.CoinInfo.Name">{{
              crypto.CoinInfo.FullName }}
            </option>
          </select>
        </div>
        <input type="submit" value="Cotizar" />
      </form>
    </div>
  </div>
</template>


