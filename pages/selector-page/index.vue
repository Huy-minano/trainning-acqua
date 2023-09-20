<template>
  <div>
    <AppSelector
      :options="mountainList"
      @select="onSelect"
      @multySelects="onMultySelects"
      label="title"
      :searchable="true"
      :close-on-select="false"
      :allowEmpty="true"
      :multiple="false"
      :taggable="false"
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

    <h3>Asynchronous select</h3>
    <AppSelector
      :options="countries"
      @select="onSelectCountry"
      @multySelects="onMultySelectCountry"
      label="name"
      track-by="code"
      :taggable="true"
      :multiple="true"
      :searchable="true"
      :loading="isLoading"
      :clear-on-select="false"
      :close-on-select="false"
      :asynchronous-select="true"
      @search-change="asyncFind"
    >
    </AppSelector>
    <div class="options-selected">
      <div
        v-for="option in selectedCountries"
        :id="option.slug"
        class="option-selected"
      >
        <p>{{ option.name.common }}</p>
        <img :src="option.flags.png" alt="" />
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
      country: {},
      selectedCountries: [],
      countries: [],
      isLoading: true,
    };
  },
  computed: {
    ...mapState(["mountainList"]),
  },
  methods: {
    onSelect(item) {
      this.option = item;
    },
    onSelectCountry(item) {
      this.country = item;
    },
    onMultySelects(multiItem) {
      this.options = multiItem;
    },
    onMultySelectCountry(multiItem) {
      console.log("multiItem", multiItem);
      this.selectedCountries = multiItem;
    },
    nameWithContinent({ title, continent }) {
      return `${title} — [${continent}]`;
    },
    limitText(count) {
      return `and ${count} other countries`;
    },
    async asyncFind(query) {
      this.isLoading = true;
      await fetch(`https://restcountries.com/v3.1/name/${query}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else return [];
        })
        .then((response) => {
          this.countries = response;
        })
        .finally(() => {
          this.isLoading = false;
        });
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
