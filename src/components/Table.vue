<template>
  <div style="font-size: 14px" class="q-pa-md">
    <q-markup-table
      style="
        max-height: calc(100vh - 178px);
        overflow-y: auto;
        min-height: calc(100vh - 178px);
      "
      :separator="separator"
      flat
      bordered
    >
      <thead>
        <tr>
          <th
            style="font-size: 14px"
            v-for="(item, key) in columns"
            :key="key"
            class="text-left"
          >
            {{ item.label }}
          </th>
          <th style="font-size: 14px; min-width: 103px" width="103">Ações</th>
        </tr>
      </thead>
      <tbody style="overflow: scroll">
        <tr v-for="(i, key) in rows" :key="key">
          <td
            style="font-size: 14px"
            v-for="(j, k) in columns"
            :key="k"
            class="text-rigth"
          >
            {{ i[j.field] }}
          </td>
          <td class="flex no-wrap justify-between">
            <q-btn
              @click="onEdit(i)"
              padding="xs"
              round
              color="info"
              icon="edit"
            />
            <q-btn
              @click="onDelete(i)"
              padding="xs"
              round
              color="negative"
              icon="delete"
            />
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>
<script>
import { ref } from "vue";
export default {
  emits: ["onEdit", "onDelete"],
  components: {},
  props: {
    columns: { type: Array, required: true },
    rows: { type: Array, required: true },
  },
  setup() {
    return {
      separator: ref("cell"),
      separatorOptions: [
        { label: "Linha", value: "horizontal" },
        { label: "Coluna", value: "vertical" },
        { label: "Células", value: "cell" },
        { label: "Nenhum", value: "none" },
      ],
    };
  },
  methods: {
    onEdit(element) {
      this.$emit("onEdit", Object.assign({}, element));
    },
    onDelete(element) {
      this.$emit("onDelete", Object.assign({}, element));
    },
  },
};
</script>
