<template>
  <div>
    <AppSelector
      :options="mountainList"
      @select="onSelect"
      @multySelects="onMultySelects"
      label="title"
      :searchable="true"
      :close-on-select="true"
      :allowEmpty="true"
      :custom-label="nameWithContinent"
      :multiple="true"
      track-by="slug"
    />
    {{ option?.title }} 
    <span v-for="option in options">{{ option.title }}</span>
  </div>
</template>

<script>
import AppSelector from "../../components/AppSelector";
import { mapState } from "vuex";

export default {
  layout: "custom",
  components: { AppSelector },
  data() {
    return {
      option: {},
      options: [],
    };
  },
  computed: {
    ...mapState(["mountainList"]),
  },
  methods: {
    onSelect(item) {
      this.option = item;
    },
    onMultySelects(multiItem) {
      this.options = multiItem
    },
    nameWithContinent({ title, continent }) {
      return `${title} — [${continent}]`;
    },
  },
};
</script>
