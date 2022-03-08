<template>
  <div class="flex flex-center">
    <q-pagination
      v-model="current"
      color="primary"
      :max="Math.ceil(paginator.total / paginator.perPage)"
      :max-pages="4"
      boundary-numbers
      boundary-links
      direction-links
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
      current: ref(1),
    };
  },
  watch: {
    current(val) {
      this.$emit("onPage", val);
    },
    page(val) {
      this.current = val;
    },
  },
};
</script>
