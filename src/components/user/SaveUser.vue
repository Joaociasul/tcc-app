<template>
  <div>
    <q-form @keypress.enter="sendForm">
      <div class="row">
        <div class="col-12">
          <div class="col-12">
            <q-input
              class="j-input full-width"
              autocomplete="nope"
              v-model="form.name"
              label="Nome completo"
            />
          </div>
          <div class="col-12">
            <q-input
              class="j-input full-width"
              autocomplete="nope"
              v-model="form.email"
              label="Email"
            />
          </div>
          <div class="col-12">
            <q-input
              class="j-input full-width"
              autocomplete="nope"
              v-model="form.phone_number"
              mask="(##) # ####-####"
              label="Telefone"
            />
          </div>
          <div class="col-12">
            <q-select
              v-model="form.permission"
              :options="permissionOptions"
              transition-show="scale"
              transition-hide="scale"
              label="Nível de permissão"
            />
          </div>
          <div v-if="checkPermission(['root', 'administrator'])" class="col-12">
            <select-scroll :data="companies" />
          </div>
        </div>
      </div>
    </q-form>
  </div>
</template>

<script>
import { messageErrorValidator } from "src/services/utils";
import { mapActions, mapGetters, mapState } from "vuex";
import SelectScroll from "../SelectScroll.vue";
export default {
  components: { SelectScroll },
  name: "Saveuser",
  props: {
    emitChilds: { default: false },
    action: { required: true, type: String },
  },
  emits: ["onForm"],
  data() {
    return {
      form: {
        _id: null,
        name: null,
        email: null,
        phone_number: null,
      },
      permissionOptions: [],
      companies: null,
    };
  },
  methods: {
    ...mapActions("companies", ["ActionGetCompanies"]),
    resetForm() {
      this.form = {
        _id: null,
        name: null,
        email: null,
        phone_number: null,
      };
    },
    sendForm() {
      this.$emit("onForm", { ...this.form });
    },
    checkPermission(arr) {
      let items = null;
      for (const item of arr) {
        items = this.getDataUser.roles.find((el) => el.name == item);
        if (items) break;
      }
      return !!items;
    },
  },
  watch: {
    emitChilds(val) {
      if (val == true) {
        this.sendForm();
      }
    },
  },
  created() {
    for (const el of this.getDataUser.roles) {
      if (el.name == "root") {
        this.permissionOptions.push(
          { label: "Root", value: "root" },
          { label: "Administrador", value: "administrator" },
          { label: "Usuário", value: "user" }
        );
        break;
      } else if (el.name == "administrator") {
        this.permissionOptions.push(
          { label: "Administrador", value: "administrator" },
          { label: "Usuário", value: "user" }
        );
        break;
      }
    }
  },
  mounted() {
    this.resetForm();
    if (this.action == "update") {
      const user = this.user;
      this.form.name = user.data.name;
      this.form._id = user.data._id;
      this.form.email = user.data.email;
      this.form.phone_number = user.data.phone_number;
    }
    this.checkPermission(["root", "administrator"]) &&
      this.ActionGetCompanies()
        .then((resp) => (this.companies = resp))
        .catch((e) => messageErrorValidator(e.message));
  },
  computed: {
    ...mapState("user", ["user"]),
    ...mapGetters("auth", ["getDataUser"]),
  },
};
</script>

<style scoped>
.j-input {
  /* width: 30%; */
  margin: 0 0 20px 0;
}
</style>
