<template>
  <div style="display: flex; flex-wrap: wrap">
    <div class="item-block">
      <h3>Single select</h3>
      <AppSelector
        :options="mountainList"
        v-model="singleSelect"
        :searchable="false"
        :close-on-select="true"
        track-by="title"
        label="title"
        :multiple="false"
        :allow-empty="false"
        placeholder="Pick a value"
      />
      <div class="option-selected">
        <p>{{ "Single selected option: " + (singleSelect?.title || "") }}</p>
      </div>
    </div>

    <div class="item-block">
      <h3>Select with search</h3>
      <AppSelector
        :options="mountainList"
        v-model="singSelectWithSearch"
        :custom-label="nameWithContinent"
        :close-on-select="true"
        track-by="title"
        label="title"
        :multiple="false"
        :allow-empty="false"
        placeholder="Pick a value"
      />
      <div class="option-selected">
        <p>
          {{
            "Select with search selected option: " +
            (singSelectWithSearch?.title || "")
          }}
        </p>
      </div>
    </div>

    <div class="item-block">
      <h3>Multiple select - with search</h3>
      <AppSelector
        :options="mountainList"
        v-model="multySelectWithSearch"
        :custom-label="nameWithContinent"
        :close-on-select="false"
        track-by="slug"
        label="title"
        :multiple="true"
      />
      <div class="option-selected">
        <p>Select with search selected option:</p>
        <ul>
          <li v-for="option in multySelectWithSearch" :id="option.slug">
            {{ option.title }}
          </li>
        </ul>
      </div>
    </div>

    <div class="item-block">
      <h3>Tagging select - with search</h3>
      <AppSelector
        :options="mountainList"
        v-model="taggingSelectWithSearch"
        :custom-label="nameWithContinent"
        :close-on-select="false"
        track-by="slug"
        label="title"
        :taggable="true"
      />
      <div class="option-selected">
        <p>Select with search selected option:</p>
        <ul>
          <li v-for="option in taggingSelectWithSearch" :id="option.slug">
            {{ option.title }}
          </li>
        </ul>
      </div>
    </div>

    <div class="item-block">
      <h3>Group select - with search</h3>
      <AppSelector
        :options="groupOptions"
        v-model="groupSelectWithSearch"
        group-values="libs"
        group-label="language"
        :group-select="true"
        placeholder="Type to search"
        track-by="name"
        label="name"
        :taggable="true"
        :multiple="true"
      />
      <div class="option-selected">
        <p>Select with search selected option:</p>
        <ul>
          <li v-for="option in groupSelectWithSearch" :id="option.name">
            {{ option.name }}
          </li>
        </ul>
      </div>
    </div>

    <div class="item-block">
      <h3>Asynchronous select - with search</h3>
      <AppSelector
        :options="countriesRender"
        v-model="asynchronousSelectWithSearch"
        label="name"
        track-by="idd"
        :taggable="true"
        :multiple="true"
        :searchable="true"
        :loading="isLoading"
        :clear-on-select="false"
        :close-on-select="false"
        :asynchronous-select="true"
        @search-change="asyncFind"
        @loadMore="onLoadMore"
      />
      <div class="option-selected">
        <p>Select with search selected option:</p>
        <ul>
          <li
            v-for="option in asynchronousSelectWithSearch"
            :id="option.name.common"
          >
            {{ option.name.common }}
          </li>
        </ul>
      </div>
    </div>

    <div class="item-block">
      <h3>Custom select - with search</h3>
      <AppSelector
        :options="mountainList"
        v-model="customSelect"
        label="title"
        :searchable="false"
        :close-on-select="true"
        :allowEmpty="true"
        :multiple="false"
        :taggable="false"
        track-by="slug"
      >
        <template slot="singleLabel" slot-scope="slotProps">
          <div style="display: flex; align-item: center">
            <img
              class="option__image"
              :src="slotProps.option.image"
              style="height: 100px; width: auto"
              alt="No Man’s Sky"
            />
            <div class="option__desc">
              <div class="option__title;">{{ slotProps.option.title }}</div>
            </div>
          </div></template
        >
        <template slot="option" slot-scope="slotProps">
          <img
            class="option__image"
            :src="slotProps.option.image"
            style="height: 100px; width: auto"
            alt="No Man’s Sky"
          />
          <div class="option__desc">
            <span class="option__title">{{ slotProps.option.title }}</span
            ><span class="option__small">{{
              slotProps.option.description
            }}</span>
          </div>
        </template>
      </AppSelector>
      <div class="option-selected">
        <p>{{ "Custom selected option: " + (customSelect?.title || "") }}</p>
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
      singleSelect: {},
      singSelectWithSearch: {},
      multySelectWithSearch: [],
      taggingSelectWithSearch: [],
      groupSelectWithSearch: [],
      asynchronousSelectWithSearch: [],
      customSelect: {},
      option: {},
      options: [],
      selectedCountries: [],
      countries: [],
      countriesRender: [],
      timeLoadMore: 1,
      perLoadMore: 20,
      isLoading: true,
      groupOptions: [
        {
          language: "Javascript",
          libs: [
            { name: "Vue.js", category: "Front-end" },
            { name: "Adonis", category: "Backend" },
          ],
        },
        {
          language: "Ruby",
          libs: [
            { name: "Rails", category: "Backend" },
            { name: "Sinatra", category: "Backend" },
          ],
        },
        {
          language: "Other",
          libs: [
            { name: "Laravel", category: "Backend" },
            { name: "Phoenix", category: "Backend" },
          ],
        },
      ],
    };
  },
  computed: {
    ...mapState(["mountainList"]),
  },
  methods: {
    nameWithContinent({ title, continent }) {
      return `${title} — [${continent}]`;
    },
    limitText(count) {
      return `and ${count} other countries`;
    },
    async asyncFind(query) {
      this.timeLoadMore = 1;
      this.isLoading = true;
      await fetch(`https://restcountries.com/v3.1/name/${query}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else return [];
        })
        .then((response) => {
          this.countries = response;
          this.countriesRender = this.countries.slice(
            0,
            this.perLoadMore * this.timeLoadMore
          );
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    onLoadMore() {
      this.timeLoadMore += 1;
      if (this.countriesRender.length === this.countries.length) {
        return;
      }
      this.countriesRender = this.countries.slice(
        0,
        this.perLoadMore * this.timeLoadMore
      );
    },
  },
};
</script>

<style>
.item-block {
  width: 50%;
  margin-bottom: 40px;
}
.multiselect {
  width: 80%;
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
