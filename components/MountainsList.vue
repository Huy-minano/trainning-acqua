<template>
  <div>
    <ul>
      <li v-for="(mountain, index) in mountainList" :key="index">
        <NuxtLink :to="`mountains/${mountain.slug}`">
          <li>{{ mountain.title }}</li>
        </NuxtLink>
      </li>
    </ul>
    <ol>
      <li v-for="todo in todos">
        {{ todo.text }}
      </li>
    </ol>
    <div>Picked: {{ picked }}</div>
    <div v-for="(todo, index) in todos">
      <input type="radio" :id="index" :value="todo.text" v-model="picked" />
      <label for="one">{{ index }}</label>
    </div>
    <div v-if="isShow">is show or not</div>
    <button @click="onChangeIsShow">{{ isShow ? "Hide" : "Show" }}</button>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      mountains: [],
      todos: [
        { text: "Learn JavaScript" },
        { text: "Learn Vue" },
        { text: "Build something awesome" },
      ],
      picked: null,
      isShow: true,
    };
  },
  computed: {
    ...mapState(["mountainList"]),
  },
  methods: {
    onChangeIsShow() {
      this.isShow = !this.isShow;
    },
  },
};
</script>
