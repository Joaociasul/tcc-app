<template>
  <div class="full-width">
    <div class="flex full-width justify-between q-pr-md">
      <h4 class="q-mt-sm q-ml-md" style="margin-bottom: 0">{{ title }}</h4>
      <div class="flex">
        <q-input
          class="q-mt-sm q-mr-sm"
          rounded
          dense
          outlined
          @keypress.enter="onSearch"
          :label="labelSearch"
        />
        <q-btn
          v-if="showBtnAdd"
          round
          @click="send"
          class="q-mt-sm q-mr-sm"
          color="warning"
          icon="refresh"
        />
        <q-btn round class="q-mt-sm" color="primary" icon="filter_list">
          <q-menu
            transition-show="jump-down"
            transition-hide="jump-up"
            v-model="showing"
          >
            <q-list style="min-width: calc(100vw - 300px)">
              <q-form
                @submit="send"
                padding
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
    </div>
  </div>
</template>

<script>
export default {
  emits: ["filter", "openModalAdd", "onSearch"],
  props: {
    fieldOptions: { type: Array, required: true },
    showBtnAdd: { type: Boolean, default: true },
    labelSearch: { type: String, default: "Pesquisa por nome" },
    title: { type: String, required: true },
  },
  data() {
    return {
      bodyFilter: [
        {
          field: null,
          value: null,
        },
      ],
      showing: false,
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
      setTimeout(() => {
        this.showing = false;
      }, 100);
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
    onSearch(e) {
      this.$emit("onSearch", e.target.value);
    },
  },
};
</script>
