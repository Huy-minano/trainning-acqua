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
      <span class="multiselect__placeholder"> Pick a value </span>
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
        <li id="null-0" role="option" class="multiselect__element">
          <span
            data-select=""
            data-selected=""
            data-deselect=""
            class="multiselect__option multiselect__option--highlight"
            ><span>Select option</span></span
          >
        </li>
        <li id="null-1" role="option" class="multiselect__element">
          <span
            data-select=""
            data-selected=""
            data-deselect=""
            class="multiselect__option"
            ><span>options</span></span
          >
        </li>
        <li id="null-2" role="option" class="multiselect__element">
          <span
            data-select=""
            data-selected=""
            data-deselect=""
            class="multiselect__option"
            ><span>selected</span></span
          >
        </li>
        <li id="null-3" role="option" class="multiselect__element">
          <span
            data-select=""
            data-selected=""
            data-deselect=""
            class="multiselect__option"
            ><span>multiple</span></span
          >
        </li>
        <li id="null-4" role="option" class="multiselect__element">
          <span
            data-select=""
            data-selected=""
            data-deselect=""
            class="multiselect__option"
            ><span>label</span></span
          >
        </li>
        <li id="null-5" role="option" class="multiselect__element">
          <span
            data-select=""
            data-selected=""
            data-deselect=""
            class="multiselect__option"
            ><span>searchable</span></span
          >
        </li>
        <li id="null-6" role="option" class="multiselect__element">
          <span
            data-select=""
            data-selected=""
            data-deselect=""
            class="multiselect__option"
            ><span>clearOnSelect</span></span
          >
        </li>
        <li id="null-7" role="option" class="multiselect__element">
          <span
            data-select=""
            data-selected=""
            data-deselect=""
            class="multiselect__option"
            ><span>hideSelected</span></span
          >
        </li>
        <li id="null-8" role="option" class="multiselect__element">
          <span
            data-select=""
            data-selected=""
            data-deselect=""
            class="multiselect__option"
            ><span>maxHeight</span></span
          >
        </li>
        <li id="null-9" role="option" class="multiselect__element">
          <span
            data-select=""
            data-selected=""
            data-deselect=""
            class="multiselect__option"
            ><span>allowEmpty</span></span
          >
        </li>
        <li id="null-10" role="option" class="multiselect__element">
          <span
            data-select=""
            data-selected=""
            data-deselect=""
            class="multiselect__option"
            ><span>showLabels</span></span
          >
        </li>
        <li id="null-11" role="option" class="multiselect__element">
          <span
            data-select=""
            data-selected=""
            data-deselect=""
            class="multiselect__option"
            ><span>onChange</span></span
          >
        </li>
        <li id="null-12" role="option" class="multiselect__element">
          <span
            data-select=""
            data-selected=""
            data-deselect=""
            class="multiselect__option"
            ><span>touched</span></span
          >
        </li>
        <li style="display: none">
          <span class="multiselect__option"
            >No elements found. Consider changing the search query.</span
          >
        </li>
        <li style="display: none">
          <span class="multiselect__option">List is empty.</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      isShowOptions: false,
    }
  },
  methods: {
    onShowOptions(){
      this.isShowOptions = !this.isShowOptions
    },
  },
};
</script>

<style src="./index.css"></style>
