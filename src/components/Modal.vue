<template>
  <teleport to="#modal">
    <div id="center" v-if="isOpen">
      <h2>
        <slot>this is modal</slot>
        <button @click="buttonClick">Close</button>
      </h2>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Modal",
  props: {
    isOpen: Boolean,
  },
  emits: {
    "close-modal": null,
  },
  setup(_, context) {
    const buttonClick = () => {
      context.emit("close-modal");
    };

    return {
      buttonClick,
    };
  },
});
</script>
<style>
#center {
  width: 200px;
  height: 200px;
  border: 2px solid black;
  background: white;
  position: fixed;
  left: 50%;
  top: 50%;
  margin-left: -100px;
  margin-top: -100px;
}
</style>
