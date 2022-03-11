<template>
  <q-dialog v-model="fullModal" persistent :full-width="fullWidth">
    <q-card>
      <q-card-section>
        <div class="text-h6">{{ title }}</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <slot name="content"></slot>
      </q-card-section>
      <q-card-actions align="right" class="bg-white">
        <q-btn
          v-if="showBtnCancel"
          color="negative"
          @click="cancel()"
          label="Cancelar"
          class="q-mr-sm"
        />
        <q-btn color="positive" @click="ok()" :label="labelBtnOk" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
export default {
  name: "Modal",
  emits: ["onOk", "onCancel"],
  props: {
    openModal: { type: Boolean },
    title: {
      type: String,
      required: true,
    },
    fullWidth: { type: Boolean, default: true },
    labelBtnOk: { type: String, default: "Salvar" },
    showBtnCancel: { type: Boolean, default: true },
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
