<template>
  <div class="flex justify-end q-pr-md">
    <q-btn round class="q-mt-sm" color="primary" icon="filter_list">
      <q-menu transition-show="jump-down" transition-hide="jump-up">
        <q-list style="min-width: calc(100vw - 300px)">
          <q-form
            @submit="send"
            padding
            @keypress.enter.prevent
            @reset="reset"
            class="q-gutter-md q-pa-sm"
          >
            <div
              v-for="(item, key) in bodyFilter"
              :key="key"
              class="q-pt-md-sm flex no-wrap justify-between"
            >
              <div class="flex no-wrap" style="width: 90%">
                <q-select
                  v-model="item.field"
                  :options="fieldOptions"
                  label="Campo"
                  class="q-ma-sm"
                  style="max-width: 50%; width: 50%"
                />
                <q-input
                  v-model="item.value"
                  class="q-ma-sm"
                  label="Pesquisa"
                  style="max-width: 50%; width: 50%"
                />
              </div>
              <q-btn
                round
                dense
                @click="addRow()"
                color="positive"
                icon="add"
                style="height: 30px; margin: auto 15px 0"
              />
            </div>
            <div width="100px" class="flex no-wrap justify-between">
              <q-btn
                class="q-ma-sm"
                label="Limpar"
                type="reset"
                color="primary"
                flat
              />
              <q-btn
                class="q-ma-sm"
                label="Ok"
                type="submit"
                v-close-popup
                color="primary"
              />
            </div>
          </q-form>
        </q-list>
      </q-menu>
    </q-btn>
    <q-btn
      v-if="showBtnAdd"
      round
      @click="$emit('openModalAdd', true)"
      class="q-mt-sm q-ml-sm"
      color="positive"
      icon="add"
    />
  </div>
</template>

<script>
export default {
  emits: ["filter", "openModalAdd"],
  props: {
    fieldOptions: { type: Array, required: true },
    showBtnAdd: { type: Boolean, default: true },
  },
  data() {
    return {
      bodyFilter: [
        {
          field: null,
          value: null,
        },
      ],
    };
  },
  methods: {
    send() {
      let filters = [];
      this.bodyFilter.map((el) => {
        if (el.field?.value && el.value) {
          filters.push({ field: el.field.value, value: el.value });
        }
      });
      this.$emit("filter", Object.assign([], filters));
      this.reset();
    },
    reset() {
      this.bodyFilter = [
        {
          field: null,
          value: null,
        },
      ];
    },
    addRow() {
      this.bodyFilter.push({
        field: null,
        value: null,
      });
    },
  },
};
</script>
