<template>
  <div>
    <p v-if="$fetchState.pending">Loading....</p>
    <p v-else-if="$fetchState.error">Error while fetching mountains</p>
    <img v-else :src="dog.message" alt="" />
    <button @click="onRefreshData()">Refresh</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    dog: [],
  }),
  mounted(){
    console.log('mounted');
  },    
  async fetch() {
    console.log('fetch');
    this.dog = await fetch("https://dog.ceo/api/breeds/image/random").then(
      (res) => res.json()
    );
  },
  methods: {
    onRefreshData(){
        this.$fetch()
    }
  }
};
</script>

<style></style>
