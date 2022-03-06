<template>
  <q-page class="flex flex-center"> </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";

export default defineComponent({
  name: "PageIndex",
  async mounted() {
    this.$q.loading.show();
    this.tokenExpired && (await this.ActionRefreshToken());
    this.$q.loading.hide();
  },
  methods: {
    ...mapActions("auth", ["ActionRefreshToken"]),
  },
  computed: {
    ...mapGetters("auth", ["tokenExpired"]),
  },
});
</script>
