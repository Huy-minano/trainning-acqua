<template>
  <input :value="text" v-on:input="inputText" />
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: "hehe",
    },
  },
  model: {
    prop: 'text',
    event: 'update:text'
  },
  methods:{
    inputText(e){
        this.$emit('update:text', e.target.value)
    }
  }
};
</script>
