<template>
  <div class="flex flex-center">
    <q-pagination
      v-model="currentPage"
      color="primary"
      :max="Math.ceil(paginator.total / paginator.perPage)"
      :max-pages="4"
      boundary-numbers
      boundary-links
      direction-links
      @change="change"
    />
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  emits: ["onPage"],
  props: {
    paginator: { type: Object, required: true },
    page: { type: Number, default: 1 },
  },
  setup() {
    return {
      currentPage: ref(1),
    };
  },
  watch: {
    currentPage(val) {
      this.$emit("onPage", val);
    },
    page(val) {
      this.currentPage = val;
    },
  },
  methods: {
    change(val) {
      console.log(val);
    },
  },
};
</script>
