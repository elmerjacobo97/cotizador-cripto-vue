<script setup>
defineProps({
  priceCrypto: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="result-container">
    <h2>Cotización</h2>

    <div class="result">
      <img :src="`https://cryptocompare.com/${priceCrypto.IMAGEURL}`" alt="imagen criptomoneda" />
      <div>
        <p>
          El precio es de: <span>{{ priceCrypto.PRICE }}</span>
        </p>
        <p>
          Precio más alto del día: <span>{{ priceCrypto.HIGHDAY }}</span>
        </p>
        <p>
          Precio más bajo del día: <span>{{ priceCrypto.LOWDAY }}</span>
        </p>
        <p>
          Variación en las últimas 24 horas:
          <span>{{ priceCrypto.CHANGEPCT24HOUR }}%</span>
        </p>
        <p>
          Última actualización: <span>{{ priceCrypto.LASTUPDATE }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
