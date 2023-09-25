<template>
  <div>
    <h1>a funny sentence inside</h1>
    <NuxtLink to="/home">Home page</NuxtLink>
    <input type="text" @input="delaySearch($event)" />
  </div>
</template>

<script>
import debounce from "lodash/debounce";

export default {
  layout: "custom",
  name: "fun",
  methods: {
    delaySearch: (e) => {
      const delayedFunction = debounce(() => {
        console.log("search!!: ", e.target.value);
      }, 600);
      delayedFunction();
    },
  },
};
</script>
