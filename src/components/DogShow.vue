<template>
  <img :src="result && result.message" />
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  async setup() {
    const rawData = await axios.get("https://dog.ceo/api/breeds/image/1");

    return {
      result: rawData.data,
    };
  },
});
</script>
