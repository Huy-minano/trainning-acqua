<template>
  <div
    tabindex="0"
    role="combobox"
    aria-owns="listbox-null"
    class="multiselect"
  >
    <div @click="onShowOptions()">
      <div class="multiselect__select"></div>
      <div class="multiselect__tags">
        <slot name="singleLabel" :option="optionChose">
          <div v-if="taggable" class="multiselect__tags-wrap">
            <span
              v-for="option in optionsChose"
              :id="option[trackBy]"
              v-on:click.stop
              class="multiselect__tag"
              ><span>{{ option[label] }}</span>
              <i
                tabindex="1"
                class="multiselect__tag-icon"
                v-on:click.stop
                @click="removeOptionFromOptionsChose(option)"
              ></i
            ></span>
            <input
              name=""
              type="text"
              style="display: block"
              :v-model="searchData"
              @input="onSearchByKeyWork($event.target.value)"
              v-on:click.stop
              placeholder="Type to search"
            />
          </div>
          <div v-else>
            <span v-if="!isShowInput" :class="classOptionChose">
              {{ optionChoseforDisplay }}
            </span>
            <input
              v-else
              name=""
              type="text"
              :v-model="searchData"
              @input="onSearchByKeyWork($event.target.value)"
              v-on:click.stop
              placeholder="Type to search"
            />
          </div>
        </slot>
        <span
          v-if="!isEmptySelected"
          class="multiselect__clear"
          v-on:click.stop
          @click="onClearAll()"
          >X</span
        >
        <div class="multiselect__spinner" style="display: none"></div>
      </div>
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
          v-for="(option, index) in optionsForShow"
          :id="option[trackBy] || index"
          role="option"
          :class="[
            'multiselect__element',
            option[trackBy] === optionChose[trackBy] ||
            optionsChose.includes(option)
              ? ' multiselect__option--selected'
              : '',
          ]"
          @click="onChooseOption(option)"
        >
          <div
            class="multiselect__option"
            @mouseenter="addClass(option, $event)"
            @mouseleave="removeClass(option, $event)"
          >
            <slot name="option" :option="option">
              <span
                >{{ option[label] }}
                <span
                  v-if="!allowEmpty && option[trackBy] === optionChose[trackBy]"
                  class="multiselect__note--deselect"
                  >{{ deselectLabel }}</span
                ></span
              >
            </slot>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["select", "multySelects", "search-change"],
  props: {
    options: Array,
    label: {
      type: String,
      default: "title",
    },
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
      default: false,
    },
    deselectLabel: {
      type: String,
      default: "Can't remove this value",
    },
    customLabel: {
      type: Function,
      default: function () {
        return this.optionChose[this.label];
      },
    },
    multiple: {
      type: Boolean,
      default: true,
    },
    taggable: {
      type: Boolean,
      default: false,
    },
    hideSelected: {
      type: Boolean,
      default: false,
    },
    limit: {
      type: Number,
      default: 99999,
    },
    limitText: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      optionsForShow: [],
      optionChose: {},
      optionsChose: [],
      isShowOptions: false,
      isShowInput: false,
      searchData: "",
    };
  },
  mounted() {
    this.optionsForShow = this.options;
    console.log(this.$emit("search-change"));
  },
  computed: {
    classOptionChose() {
      return {
        multiselect__single: !!this.optionChose || !!this.optionsForShow.length,
        multiselect__placeholder:
          !this.optionChose || !this.optionsForShow.length,
      };
    },
    optionChoseforDisplay() {
      if (!this.multiple) {
        return Object.keys(this.optionChose).length === 0
          ? "Select One"
          : this.customLabel(this.optionChose);
      } else {
        return this.options.length === 0
          ? "Select Some"
          : this.customLabel(this.optionChose);
      }
    },
    isEmptySelected() {
      return !Object.keys(this.optionChose).length && !this.optionsChose.length;
    },
  },
  methods: {
    addClass: function (option, e) {
      if (!this.multiple) {
        const className =
          option[this.trackBy] === this.optionChose[this.trackBy]
            ? "multiselect__option--highlight-deselect"
            : "multiselect__option--highlight";
        if (!e.target.classList.contains(className)) {
          e.target.classList.add(className);
        }
      } else {
        const className = this.optionsChose.includes(option)
          ? "multiselect__option--highlight-deselect"
          : "multiselect__option--highlight";
        if (!e.target.classList.contains(className)) {
          e.target.classList.add(className);
        }
      }
    },
    removeClass: function (option, e) {
      if (!this.multiple) {
        const className =
          option[this.trackBy] === this.optionChose[this.trackBy]
            ? "multiselect__option--highlight-deselect"
            : "multiselect__option--highlight";
        if (e.target.classList.contains(className)) {
          e.target.classList.remove(className);
        }
      } else {
        const className = this.optionsChose.includes(option)
          ? "multiselect__option--highlight-deselect"
          : "multiselect__option--highlight";
        if (e.target.classList.contains(className)) {
          e.target.classList.remove(className);
        }
      }
    },
    onShowOptions() {
      this.isShowOptions = !this.isShowOptions;
      if (this.searchable) {
        this.isShowInput = !this.isShowInput;
      }
    },
    addOptionToOptionsChose(item) {
      this.optionsChose.push(item);
      this.searchData = "";
      this.optionsForShow = this.options;
      this.$emit("multySelects", this.optionsChose);
    },
    removeOptionFromOptionsChose(item) {
      this.optionsChose = this.optionsChose.filter(
        (option) => option[this.trackBy] !== item[this.trackBy]
      );
      this.searchData = "";
      this.optionsForShow = this.options;
      this.$emit("multySelects", this.optionsChose);
    },
    onChooseOption(item) {
      if (!this.multiple) {
        if (item[this.trackBy] !== this.optionChose[this.trackBy]) {
          this.optionChose = item;
          this.searchData = "";
          this.optionsForShow = this.options;
        } else {
          if (this.allowEmpty && item.slug) {
            this.optionChose = {};
            this.searchData = "";
            this.optionsForShow = this.options;
          } else {
            return;
          }
        }
        if (this.closeOnSelect) {
          this.onShowOptions();
        }
        this.$emit("select", this.optionChose);
      } else {
        if (!this.optionsChose.includes(item)) {
          this.addOptionToOptionsChose(item);
        } else {
          this.removeOptionFromOptionsChose(item);
        }
        this.$emit("multySelects", this.optionsChose);
      }
    },
    onClearAll() {
      this.optionsChose = [];
      this.optionChose = {};
      this.$emit("multySelects", this.optionsChose);
      this.$emit("select", this.optionChose);
    },
    onSearchByKeyWork(keyword = "") {
      this.searchData = keyword;
      let result = [];
      for (let i = 0; i < this.options.length; i++) {
        if (this.options[i][this.label].includes(keyword)) {
          result.push(this.options[i]);
        }
      }
      this.optionsForShow = result;
    },
  },
};
</script>

<style src="./index.css"></style>
