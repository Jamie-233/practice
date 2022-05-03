<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <h1>{{count}}</h1>
  <h1>{{double}}</h1>
  <h1>X: {{x}}</h1>
  <h1>Y: {{y}}</h1>
  <pre>
    {{error}}
  </pre>
  <h1 v-if="loading">Loading ...</h1>
  <img v-if="loaded" :src="result && result[0].url" />
  <button @click="increase">+1</button>
  <button @click="updateGreetings">Update Title</button>
  <button @click="openModal">Open Modal</button>
  <Suspense>
    <template #default>
      <!-- <template> -->
      <div>
        <async-show />
        <dog-show />
      </div>
      <!-- </template> -->
    </template>
    <template #fallback>
      <h1>Loading ...</h1>
    </template>
  </Suspense>
  <modal :isOpen="modalIsOpen" @close-modal="onModalClose">My Modal</modal>
  <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
</template>

<script lang="ts">
// onRenderTriggered
import {
  ref,
  computed,
  reactive,
  toRefs,
  watch,
  onErrorCaptured,
  // onMounted,
  // onUnmounted,
} from "vue";
import useMousePosition from "./hooks/useMousePosition";
import useURLLoader from "./hooks/useURLLoader";
import Modal from "./components/Modal.vue";
import AsyncShow from "./components/AsyncShow.vue";
import DogShow from "./components/DogShow.vue";
// import HelloWorld from './components/HelloWorld.vue';

interface DataProps {
  count: number;
  double: number;
  increase: () => void;
}

// interface DogResult {
//   message: string;
//   status: string;
// }

interface CatResult {
  // https://api.thecatapi.com/v1/images/search?limit=1
  id: string;
  url: string;
  weight: number;
  height: number;
}

export default {
  name: "App",
  components: {
    Modal,
    DogShow,
    AsyncShow,
  },
  setup() {
    // const count = ref(0)
    // const double = computed(() => {
    //   return count.value * 2
    // })
    // const increase = () => {
    //   count.value++
    // }

    // compose
    const data: DataProps = reactive({
      count: 0,
      double: computed(() => data.count * 2),
      increase: () => {
        data.count++;
      },
    });

    const greetings = ref("");
    const updateGreetings = () => {
      greetings.value += "hello";
    };

    const { x, y } = useMousePosition();
    const { loaded, loading, result } = useURLLoader<CatResult[]>(
      // "https://dog.ceo/api/breeds/image/random"
      "https://api.thecatapi.com/v1/images/search?limit=1"
    );

    watch(result, () => {
      if (result.value) {
        console.log("value", result.value[0].url);
      }
    });

    // watch([greetings, () => data.count], (newValue, oldValue) => {
    //   console.log("oldValue:", oldValue);
    //   console.log("newValue:", newValue);
    //   document.title = "updated " + greetings.value + data.count;
    // });

    // onRenderTriggered((event) => {
    //   console.log('event', event);
    // })

    // Responsive object
    const refData = toRefs(data);

    const modalIsOpen = ref(false);

    const openModal = () => {
      modalIsOpen.value = true;
    };

    const onModalClose = () => {
      console.log("----");
      modalIsOpen.value = false;
    };

    const error = ref(null);
    onErrorCaptured((e: never) => {
      error.value = e;
    });

    return {
      // ...data,
      ...refData,
      updateGreetings,
      x,
      y,
      loaded,
      loading,
      error,
      result,
      openModal,
      onModalClose,
      modalIsOpen,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
