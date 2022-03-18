<template>
  <div>
    <q-select
      v-model="model"
      use-input
      input-debounce="2"
      label="Empresa"
      :options="options"
      @filter="filterFn"
      style="width: 250px"
      @virtual-scroll="onScroll"
      :loading="loading"
    />
  </div>
</template>

<script>
import { nextTick } from "vue";

export default {
  props: {
    data: { default: Object },
  },
  data() {
    const allOptions = [];
    let pageSize = 50;

    const lastPage = Math.ceil(allOptions.length / pageSize);
    return {
      loading: false,
      allOptions: [],
      nextPage: 2,
      model: null,
      lastPage,
      options: [{ label: "Selecione uma empresa", value: null }],
    };
  },
  methods: {
    onScroll({ to, ref }) {
      console.log(to);
      // const lastIndex = this.options.length - 1;
      // if (
      //   this.loading !== true &&
      //   this.nextPage < this.lastPage &&
      //   to === lastIndex
      // ) {
      //   this.loading = true;
      //   setTimeout(() => {
      //     this.nextPage++;
      //     nextTick(() => {
      //       // ref.refresh();
      //       this.loading = false;
      //     });
      //   }, 500);
      // }
    },
    filterFn(val, update, abort) {
      update(() => {
        console.log(val);
        if (!val) return;
        const needle = val.toLowerCase();
        this.$emit(
          "update:options",
          this.options.filter((v) => v.label.toLowerCase().indexOf(needle) > -1)
        );
      });
    },
  },
  watch: {
    data(val) {
      console.log(val);
    },
  },
};
</script>
