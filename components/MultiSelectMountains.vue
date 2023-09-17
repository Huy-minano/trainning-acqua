<template>
  <div>
    <label class="typo__label">Custom option template</label>

    <!-- Sigle label , custom options-->
    <multiselect
      v-model:modelValue="modelValue"
      placeholder="Fav No Man’s Sky path"
      label="title"
      track-by="title"
      :options="mountainList"
      :option-height="104"
      :show-labels="true"
    >
      <template slot="singleLabel" slot-scope="props">
        <img
          class="option__image"
          :src="props.option.image"
          style="height: 100px; width: auto"
          alt="No Man’s Sky"
        /><span class="option__desc"
          ><span class="option__title">{{ props.option.title }}</span></span
        ></template
      >
      <template slot="option" slot-scope="props" style="display: flex"
        ><img
          class="option__image"
          :src="props.option.image"
          style="height: 100px; width: auto"
          alt="No Man’s Sky"
        />
        <div class="option__desc">
          <span class="option__title">{{ props.option.title }}</span
          ><span class="option__small">{{ props.option.description }}</span>
        </div>
      </template>
    </multiselect>
    <pre class="language-json"><code>{{ modelValue }}</code></pre>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import { mapState } from "vuex";

export default {
  components: {
    Multiselect,
  },
  props: ["modelValue"],
  emits: ["update:modelValue"],
  computed: {
    ...mapState(["mountainList"]),
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

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
