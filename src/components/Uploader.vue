<template>
  <div>
    <q-uploader
      style="width: 100%"
      :url="$url_api + '/product/xml-import'"
      :headers="[{ name: 'authorization', value: 'Bearer ' + getToken }]"
      :field-name="'xmls'"
      label="Somente arquivos
    XML"
      multiple
      batch
      accept=".xml, application/xml"
      @rejected="onRejected"
      auto-upload
    />
  </div>
</template>

<script>
import { messageErrorValidator } from "src/services/utils";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("auth", ["getToken"]),
  },
  methods: {
    onRejected(val) {
      messageErrorValidator("Formato de arquivo inválido.");
    },
  },
};
</script>

<style></style>
