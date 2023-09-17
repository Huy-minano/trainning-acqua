<template>
  <div>
    <AppSelector
      :options="mountainList"
      @select="onSelect"
      :close-on-select="true"
      track-by="slug"
    />
    {{ option?.title }}
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
    };
  },
  computed: {
    ...mapState(["mountainList"]),
  },
  methods: {
    onSelect(item) {
      this.option = item;
    },
  },
};
</script>
