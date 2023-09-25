<template>
  <div>
    <h1>a funny sentence inside</h1>
    <NuxtLink to="/home">Home page</NuxtLink>
    <CustomInput v-model:text="searchText" /> {{ 'searchText: ' + searchText }}
    <CustomInput v-model:text="message" /> {{ 'message: ' + message }}
  </div>
</template>

<script>

export default {
  layout: "custom",
  name: "fun",
  data(){
    return{
      searchText:'hehehe',
      message: 'message'
    }
  },
  methods: {},
};
</script>
