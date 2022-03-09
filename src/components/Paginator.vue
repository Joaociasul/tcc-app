<template>
  <div class="flex flex-center">
    <q-pagination
      v-model="currentPage"
      color="primary"
      :max="paginator.pageCount"
      :max-pages="4"
      boundary-numbers
      boundary-links
      direction-links
    />
  </div>
</template>

<script>
import { ref } from "vue";
import { mapActions, mapState } from "vuex";
import product from "src/store/product";
import * as types from "../store/paginator/mutation-types";
export default {
  emits: ["onPage"],
  props: {
    paginator: { type: Object, required: true },
  },
  setup() {
    return {
      currentPage: ref(1),
    };
  },
  watch: {
    currentPage(val) {
      this.$emit("onPage", val);
      this.ActionSetPage(val);
    },
    page(val) {
      this.currentPage = val;
    },
  },
  methods: {
    ...mapActions("paginator", ["ActionSetPage"]),
  },
  computed: {
    ...mapState("paginator", ["page"]),
  },
};
</script>
