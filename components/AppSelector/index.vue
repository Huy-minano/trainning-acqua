<template>
  <div
    tabindex="0"
    role="combobox"
    aria-owns="listbox-null"
    class="multiselect"
  >
    <div class="multiselect__select" @click="onShowOptions()"></div>
    <div class="multiselect__tags" @click="onShowOptions()">
      <div class="multiselect__tags-wrap" style="display: none"></div>
      <div class="multiselect__spinner" style="display: none"></div>
      <span v-if="!searchable" :class="classOptionChose">
        {{ optionChoseforDisplay }}
      </span>
      <input
        v-else
        name=""
        type="text"
        :value="optionChoseforDisplay"
        placeholder="Type to search"
      />
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
          :id="option[trackBy] || index"
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
    closeOnSelect: {
      type: Boolean,
      default: true,
    },
    showLabels: {
      type: Boolean,
      default: true,
    },
    trackBy: {
      type: String,
      default: "",
    },
    allowEmpty: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      optionChose: {},
      isShowOptions: false,
      searchData: "",
    };
  },
  computed: {
    classOptionChose() {
      return {
        multiselect__single: !!this.optionChose,
        multiselect__placeholder: !this.optionChose,
      };
    },
    optionChoseforDisplay() {
      return !!this.optionChose ? this.optionChose.title : "Pic a value";
    },
  },
  methods: {
    onShowOptions() {
      this.isShowOptions = !this.isShowOptions;
    },
    onChooseOption(item) {
      if (item.slug !== this.optionChose.slug) {
        this.optionChose = item;
      } else {
        if (this.allowEmpty && item.slug) {
          this.optionChose = {};
        } else {
          return;
        }
      }
      if (this.closeOnSelect) {
        this.onShowOptions();
      }
      this.$emit("select", item);
    },
  },
};
</script>

<style src="./index.css"></style>
