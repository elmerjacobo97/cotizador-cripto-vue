<script setup>
import { ref, reactive } from "vue";
import Alert from "./components/Alert.vue";
import Spinner from "./components/Spinner.vue";
import PriceCryptoResult from "./components/PriceCryptoResult.vue";
import useCrypto from "./composables/useCrypto.js";

const error = ref("");
const quote = reactive({
  currency: "",
  crypto: "",
});

const {
  currencies = [],
  cryptocurrency = [],
  isLoading,
  getQuoteCrypto,
  priceCrypto,
  showResult,
} = useCrypto();

const quoteCrypto = () => {
  // validar
  if (Object.values(quote).includes("")) {
    error.value = "Todos los campos son obligatorios";
    return;
  }
  error.value = "";
  getQuoteCrypto(quote);
};
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
            <option v-for="currency in currencies" :key="currency.code" :value="currency.code">
              {{ currency.name }}
            </option>
          </select>
        </div>
        <div class="field">
          <label for="crypto">Moneda</label>
          <select id="crypto" v-model="quote.crypto">
            <option value="">-- Selecciona una criptomoneda --</option>
            <option v-for="crypto in cryptocurrency" :key="crypto.CoinInfo.Name" :value="crypto.CoinInfo.Name">
              {{ crypto.CoinInfo.FullName }}
            </option>
          </select>
        </div>
        <input type="submit" value="Cotizar" />
      </form>
      <Spinner v-if="isLoading" />
      <PriceCryptoResult v-if="showResult" :priceCrypto="priceCrypto" />
    </div>
  </div>
</template>
