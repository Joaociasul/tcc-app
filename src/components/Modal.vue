<template>
  <q-dialog v-model="fullModal" persistent full-width>
    <q-card>
      <q-card-section>
        <div class="text-h6">{{ title }}</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <slot name="content"></slot>
      </q-card-section>
      <q-card-actions align="right" class="bg-white">
        <q-btn
          color="negative"
          @click="cancel()"
          label="Cancelar"
          class="q-mr-sm"
        />
        <q-btn color="positive" @click="ok()" label="Salvar" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
import { ref } from "vue";
export default {
  name: "Modal",
  emits: ["onOk", "onCancel"],
  props: {
    openModal: { type: Boolean },
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      fullModal: false,
    };
  },
  methods: {
    ok() {
      this.$emit("onOk", true);
    },
    cancel() {
      this.$emit("onCancel", true);
    },
  },
  watch: {
    openModal(val) {
      this.fullModal = val;
    },
  },
};
</script>
