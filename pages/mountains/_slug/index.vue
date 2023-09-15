<template>
  <div>
    <h1>{{ getMountain.title }}</h1>
    <img :src="getMountain.image" alt="">
  </div>
</template>

<script>
export default {
  layout: "custom",
  validate({ params }) {
    // Must be a string not include 0-9
    return /^([^0-9]*)$/.test(params.slug)
  },
  asyncData({ params }) {
    return {
      slug: params.slug,
    };
  },
  computed: {
    getMountain() {
      return this.$store.getters.getMountain(this.slug);
    },
  },
};
</script>

<style></style>
