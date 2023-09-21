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
              class="multiselect__input"
              style="display: block"
              :v-model="searchData"
              @click="
                () => {
                  isShowOptions = true;
                }
              "
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
              class="multiselect__input"
              :v-model="searchData"
              @click="
                () => {
                  isShowOptions = true;
                }
              "
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
        <div v-if="loadding" class="multiselect__spinner"></div>
      </div>
    </div>
    <div
      tabindex="-1"
      class="multiselect__content-wrapper"
      style="max-height: 300px"
      v-if="isShowOptions && !groupSelect"
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
              ? 'multiselect__option--selected'
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
    <div
      tabindex="-1"
      class="multiselect__content-wrapper"
      style="max-height: 300px"
      v-else-if="isShowOptions && groupSelect"
    >
      <ul
        role="listbox"
        id="listbox-null"
        class="multiselect__content"
        style="display: inline-block"
        v-for="(groupOption, index) in optionsForShow"
        :id="groupOption"
      >
        <li
          class="multiselect__element"
          @click="onChooseGroupOption(groupOption)"
        >
          <span
            class="multiselect__option multiselect__option--group multiselect__option--highlight"
          >
            {{ groupOption[groupLabel] }}
          </span>
        </li>
        <li
          v-for="option in groupOption[groupValues]"
          :id="option[label]"
          role="option"
          :class="[
            'multiselect__element',
            option[trackBy] === optionChose[trackBy] ||
            optionsChose.includes(option)
              ? 'multiselect__option--selected'
              : '',
          ]"
          @click="onChooseOption(option)"
        >
          <span
            class="multiselect__option"
            @mouseenter="addClass(option, $event)"
            @mouseleave="removeClass(option, $event)"
          >
            <slot name="option" :option="groupOption">
              <span>{{ option[label] }}</span>
            </slot>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["select", "multySelects", "search-change"],
  props: {
    options: [Array, Object],
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
    loadding: {
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
    asynchronousSelect: {
      type: Boolean,
      default: false,
    },
    groupLabel: {
      type: String,
      default: "",
    },
    groupValues: {
      type: String,
      default: "",
    },
    groupSelect: {
      type: Boolean,
      default: false,
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
  },
  watch: {
    options: function (newVal, oldVal) {
      this.optionsForShow = newVal;
    },
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
    removeOptionsFromOptionsChose(group) {
      group.forEach((element) => {
        if (this.optionsChose.includes(element)) {
          this.optionsChose = this.optionsChose.filter(
            (option) => option[this.trackBy] !== element[this.trackBy]
          );
        }
      });
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
    onChooseGroupOption(item) {
      if (!this.multiple) return;
      if (this.isSelectedAllGroupOption(item[this.groupValues])) {
        this.removeOptionsFromOptionsChose(item[this.groupValues]);
        return;
      }
      item[this.groupValues].forEach((element) => {
        if (this.optionsChose.includes(element)) {
          return;
        }
        this.optionsChose.push(element);
      });
    },
    isSelectedAllGroupOption(group) {
      return group.every((op) => this.optionsChose.includes(op));
    },
    onClearAll() {
      this.optionsChose = [];
      this.optionChose = {};
      this.$emit("multySelects", this.optionsChose);
      this.$emit("select", this.optionChose);
    },
    onSearchByKeyWork(keyword = "") {
      this.searchData = keyword;
      if (this.asynchronousSelect) {
        this.$emit("search-change", keyword);
      } else if (!this.groupSelect) {
        let result = [];
        for (let i = 0; i < this.options.length; i++) {
          if (this.options[i][this.label]?.includes(keyword)) {
            result.push(this.options[i]);
          }
        }
        this.optionsForShow = result;
      } else if (this.groupSelect) {
        let listGroupResult = [];
        let listOptionResult = [];
        for (let i = 0; i < this.options.length; i++) {
          for (let j = 0; j < this.options[i][this.groupValues].length; j++) {
            if (
              this.options[i][this.groupValues][j][this.label].includes(keyword)
            ) {
              listOptionResult.push(this.options[i][this.groupValues][j]);
            }
          }
          if (!!listOptionResult.length) {
            listGroupResult.push({
              ...this.options[i],
              [this.groupValues]: [...listOptionResult],
            });
          }
          listOptionResult = [];
        }
        this.optionsForShow = [...listGroupResult];
      }
    },
  },
};
</script>

<style src="./index.css"></style>
