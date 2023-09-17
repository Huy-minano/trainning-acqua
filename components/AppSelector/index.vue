<template>
  <div
    tabindex="0"
    role="combobox"
    aria-owns="listbox-null"
    class="multiselect"
  >
    <div class="multiselect__select" @click="onShowOptions()"></div>
    <div class="multiselect__tags">
      <div class="multiselect__tags-wrap" style="display: none"></div>
      <div class="multiselect__spinner" style="display: none"></div>
      <span v-if="!searchable" :class="classOptionChossed">
        {{ optionChossed }}
      </span>
      <input v-else name="" type="text" />
    </div>
    <div
      tabindex="-1"
      class="multiselect__content-wrapper"
      style="max-height: 300px"
      v-if="isShowOptions"
    >
      <ul
        role="listbox"
        id="listbox-null"
        class="multiselect__content"
        style="display: inline-block"
      >
        <li
          v-for="(option, index) in options"
          :id="option.slug"
          role="option"
          class="multiselect__element"
          @click="onChooseOption(option)"
        >
          <span
            data-select=""
            data-selected=""
            data-deselect=""
            class="multiselect__option multiselect__option--highlight"
            ><span>{{ option.title }}</span></span
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["select"],
  props: {
    options: Array,
    searchable: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      optionChoosed: "",
      isShowOptions: false,
    };
  },
  computed: {
    classOptionChossed() {
      return {
        multiselect__single: !!this.optionChoosed,
        multiselect__placeholder: !this.optionChoosed,
      };
    },
    optionChossed() {
      return !!this.optionChoosed ? this.optionChoosed : "Pic a value";
    },
  },
  methods: {
    onShowOptions() {
      this.isShowOptions = !this.isShowOptions;
    },
    onChooseOption(item) {
      this.optionChoosed = item.title;
      this.onShowOptions();
      this.$emit("select", item);
    },
  },
};
</script>

<style src="./index.css"></style>
