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
      :taggable="true"
      track-by="slug"
    />
    {{ option?.title }}
    <div class="options-selected">
      <div v-for="option in options" :id="option.slug" class="option-selected">
        <p>{{ option.title }}</p>
        <img :src="option.image" alt="">
      </div>
    </div>
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
      this.options = multiItem;
    },
    nameWithContinent({ title, continent }) {
      return `${title} — [${continent}]`;
    },
  },
};
</script>

