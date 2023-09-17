<template>
  <div>
    <!-- Single select -->
    <div>
      <label class="typo__label">Single select</label>
      <multiselect
        v-model="value"
        :options="options"
        :searchable="false"
        :close-on-select="false"
        :show-labels="false"
        placeholder="Pick a value"
      ></multiselect>
      <pre class="language-json"><code>{{ value  }}</code></pre>
    </div>

    <!-- Single select (object) -->
    <div>
      <label class="typo__label">Single select / dropdown</label>
      <multiselect
        v-model="value"
        deselect-label="Can't remove this value"
        track-by="name"
        label="name"
        placeholder="Select one"
        :options="options"
        :searchable="false"
        :allow-empty="false"
      >
        <template slot="singleLabel" slot-scope="{ option }"
          ><strong>{{ option.name }}</strong> is written in<strong>
            {{ option.language }}</strong
          ></template
        >
      </multiselect>
      <pre class="language-json"><code>{{ value  }}</code></pre>
    </div>

    <!-- Select with search -->
    <div>
      <label class="typo__label">Select with search</label>
      <multiselect
        v-model="value"
        :options="options"
        :custom-label="nameWithLang"
        placeholder="Select one"
        label="name"
        track-by="name"
      ></multiselect>
      <pre class="language-json"><code>{{ value  }}</code></pre>
    </div>

    <!-- Multiple select -->
    <div>
      <label class="typo__label">Simple select / dropdown</label>
      <multiselect
        v-model="value"
        :options="options"
        :multiple="true"
        :close-on-select="false"
        :clear-on-select="false"
        :preserve-search="true"
        placeholder="Pick some"
        label="name"
        track-by="name"
        :preselect-first="true"
      >
        <template slot="selection" slot-scope="{ values, search, isOpen }"
          ><span
            class="multiselect__single"
            v-if="values.length"
            v-show="!isOpen"
            >{{ values.length }} options selected</span
          ></template
        >
      </multiselect>
      <pre class="language-json"><code>{{ value  }}</code></pre>
    </div>
    <!-- Asynchronous select -->
    <div>
      <label class="typo__label" for="ajax">Async multiselect</label>
      <multiselect
        v-model="selectedCountries"
        id="ajax"
        label="name"
        track-by="code"
        placeholder="Type to search"
        open-direction="bottom"
        :options="countries"
        :multiple="true"
        :searchable="true"
        :loading="isLoading"
        :internal-search="false"
        :clear-on-select="false"
        :close-on-select="false"
        :options-limit="300"
        :limit="3"
        :limit-text="limitText"
        :max-height="600"
        :show-no-results="false"
        :hide-selected="true"
        @search-change="asyncFind"
      >
        <template slot="tag" slot-scope="{ option, remove }"
          ><span class="custom__tag"
            ><span>{{ option.name }}</span
            ><span class="custom__remove" @click="remove(option)"
              >❌</span
            ></span
          ></template
        >
        <template slot="clear" slot-scope="props">
          <div
            class="multiselect__clear"
            v-if="selectedCountries.length"
            @mousedown.prevent.stop="clearAll(props.search)"
          ></div> </template
        ><span slot="noResult"
          >Oops! No elements found. Consider changing the search query.</span
        >
      </multiselect>
      <pre class="language-json"><code>{{ selectedCountries  }}</code></pre>
    </div>

    <!-- Tagging -->
    <div>
      <label class="typo__label">Tagging</label>
      <multiselect
        v-model="value"
        tag-placeholder="Add this as new tag"
        placeholder="Search or add a tag"
        label="name"
        track-by="code"
        :options="options"
        :multiple="true"
        :taggable="true"
        @tag="addTag"
      ></multiselect>
      <pre class="language-json"><code>{{ value  }}</code></pre>
    </div>

    <!-- Custom option template -->
    <div>
      <label class="typo__label">Custom option template</label>
      <multiselect
        v-model="value"
        placeholder="Fav No Man’s Sky path"
        label="title"
        track-by="title"
        :options="options"
        :option-height="104"
        :custom-label="customLabel"
        :show-labels="false"
      >
        <template slot="singleLabel" slot-scope="props"
          ><img
            class="option__image"
            :src="props.option.img"
            alt="No Man’s Sky"
          /><span class="option__desc"
            ><span class="option__title">{{ props.option.title }}</span></span
          ></template
        >
        <template slot="option" slot-scope="props"
          ><img
            class="option__image"
            :src="props.option.img"
            alt="No Man’s Sky"
          />
          <div class="option__desc">
            <span class="option__title">{{ props.option.title }}</span
            ><span class="option__small">{{ props.option.desc }}</span>
          </div>
        </template>
      </multiselect>
      <pre class="language-json"><code>{{ value  }}</code></pre>
    </div>

    <!-- Option groups -->
    <div>
      <label class="typo__label">Groups</label>
      <multiselect
        v-model="value"
        :options="options"
        :multiple="true"
        group-values="libs"
        group-label="language"
        :group-select="true"
        placeholder="Type to search"
        track-by="name"
        label="name"
        ><span slot="noResult"
          >Oops! No elements found. Consider changing the search query.</span
        ></multiselect
      >
      <pre class="language-json"><code>{{ value  }}</code></pre>
    </div>

    <div>
      <button @click="toggle" class="button button-small">Toggle</button>
      <button @click="open" class="button button-small">Open</button>
      <button @click="close" class="button button-small">Close</button>
      <pre>Multiselect Open: {{ isOpen }}</pre>
      <label class="typo__label"
        >Controlling multiselect programmatically</label
      >
      <multiselect
        ref="multiselect"
        placeholder="Pick at least one"
        :value="value"
        :options="options"
        :multiple="true"
        :searchable="true"
        :allow-empty="false"
        :hide-selected="true"
        :max-height="150"
        :max="3"
        @open="isOpen = true"
        @close="isOpen = false"
      ></multiselect>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
