<template>
  <div>
    <AppSelector
      :options="mountainList"
      @select="onSelect"
      @multySelects="onMultySelects"
      label="title"
      :searchable="false"
      :close-on-select="false"
      :allowEmpty="true"
      :multiple="false"
      :taggable="true"
      track-by="slug"
    >
      <template slot="singleLabel" slot-scope="slotProps" style="display: flex">
        <img
          class="option__image"
          :src="slotProps.option.image"
          style="height: 100px; width: auto"
          alt="No Man’s Sky"
        /><span class="option__desc"
          ><span class="option__title">{{ slotProps.option.title }}</span></span
        ></template
      >
      <template slot="option" slot-scope="slotProps" style="display: flex"
        ><img
          class="option__image"
          :src="slotProps.option.image"
          style="height: 100px; width: auto"
          alt="No Man’s Sky"
        />
        <div class="option__desc">
          <span class="option__title">{{ slotProps.option.title }}</span
          ><span class="option__small">{{ slotProps.option.description }}</span>
        </div>
      </template>
    </AppSelector>
    <div class="option-selected">
      <p>{{ option.title }}</p>
      <img :src="option.image" alt="" />
    </div>
    <div class="options-selected">
      <div v-for="option in options" :id="option.slug" class="option-selected">
        <p>{{ option.title }}</p>
        <img :src="option.image" alt="" />
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

<style>
.multiselect {
  width: 50%;
}
.multiselect__single {
  display: flex;
  align-items: center;
  gap: 10px;
}
.option__title {
  font-weight: bold;
}
.multiselect__option {
  display: flex;
  align-items: center;
  gap: 10px;
}
.option__desc span {
  display: block;
}
.option__small {
  max-width: 500px;
  word-wrap: break-word;
}
</style>
