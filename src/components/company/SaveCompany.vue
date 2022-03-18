<template>
  <div>
    <div class="row">
      <div class="col-sm-6 col-md-4 col-lg-3 q-pl-sm q-pr-sm">
        <q-input
          class="j-input full-width"
          autocomplete="nope"
          v-model="form.cnpj"
          mask="##.###.###/####-##"
          @blur="getByCnpj()"
          label="CNPJ"
          :rules="[
            (val) => (val && val.length > 0) || validatorRequired('cnpj'),
          ]"
        />
      </div>
      <div class="col-sm-6 col-md-4 col-lg-3 q-pl-sm q-pr-sm">
        <q-input
          class="j-input full-width"
          autocomplete="nope"
          v-model="form.corporate_name"
          label="Rasão social"
          :rules="[
            (val) =>
              (val && val.length > 0) || validatorRequired('corporate_name'),
          ]"
        />
      </div>
      <div class="col-sm-6 col-md-4 col-lg-3 q-pl-sm q-pr-sm">
        <q-input
          class="j-input full-width"
          autocomplete="nope"
          v-model="form.email"
          type="email"
          label="Email"
          :rules="[
            (val) => (val && val.length > 0) || validatorRequired('email'),
          ]"
        />
      </div>
      <div class="col-sm-6 col-md-4 col-lg-3 q-pl-sm q-pr-sm">
        <q-input
          class="j-input full-width"
          autocomplete="nope"
          v-model="form.fantasy_name"
          label="Nome Fantasia"
          :rules="[
            (val) =>
              (val && val.length > 0) || validatorRequired('fantasy_name'),
          ]"
        />
      </div>
      <div class="col-sm-6 col-md-4 col-lg-3 q-pl-sm q-pr-sm">
        <q-input
          class="j-input full-width"
          autocomplete="nope"
          v-model="form.phone_number"
          mask="(##) # ####-####"
          label="Telefone"
          :rules="[
            (val) =>
              (val && val.length > 0) || validatorRequired('phone_number'),
          ]"
        />
      </div>
      <div class="col-sm-6 col-md-4 col-lg-3 q-pl-sm q-pr-sm">
        <q-input
          class="j-input full-width"
          autocomplete="nope"
          v-model="form.address.postal_code"
          mask="##.###-###"
          label="Cep"
          :rules="[
            (val) =>
              (val && val.length > 0) ||
              validatorRequired('address.postal_code'),
          ]"
        />
      </div>
      <div class="col-sm-6 col-md-4 col-lg-3 q-pl-sm q-pr-sm">
        <q-input
          class="j-input full-width"
          autocomplete="nope"
          v-model="form.address.number"
          label="Número"
          :rules="[
            (val) =>
              (val && val.length > 0) || validatorRequired('address.number'),
          ]"
        />
      </div>
      <div class="col-sm-6 col-md-4 col-lg-3 q-pl-sm q-pr-sm">
        <q-input
          class="j-input full-width"
          autocomplete="nope"
          v-model="form.address.street"
          label="Logradouro"
          :rules="[
            (val) =>
              (val && val.length > 0) || validatorRequired('address.street'),
          ]"
        />
      </div>
      <div class="col-sm-6 col-md-4 col-lg-3 q-pl-sm q-pr-sm">
        <q-input
          class="j-input full-width"
          autocomplete="nope"
          v-model="form.address.district"
          label="Bairro"
          :rules="[
            (val) =>
              (val && val.length > 0) || validatorRequired('address.district'),
          ]"
        />
      </div>
      <div class="col-sm-6 col-md-4 col-lg-3 q-pl-sm q-pr-sm">
        <q-input
          class="j-input full-width"
          autocomplete="nope"
          v-model="form.address.complement"
          label="Complemento"
          :rules="[
            (val) =>
              (val && val.length > 0) ||
              validatorRequired('address.complement'),
          ]"
        />
      </div>
      <div class="col-sm-6 col-md-4 col-lg-3 q-pl-sm q-pr-sm">
        <q-input
          class="j-input full-width"
          autocomplete="nope"
          v-model="form.address.city"
          label="Cidade"
          :rules="[
            (val) =>
              (val && val.length > 0) || validatorRequired('address.city'),
          ]"
        />
      </div>
      <div class="col-sm-6 col-md-4 col-lg-3 q-pl-sm q-pr-sm">
        <q-input
          class="j-input full-width"
          autocomplete="nope"
          v-model="form.address.uf"
          label="Estado"
          :rules="[
            (val) => (val && val.length > 0) || validatorRequired('address.uf'),
          ]"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Company from "src/models/Company";
import { mapActions } from "vuex";
import { getMessage } from "src/services/messages/company";
import { messageError, messageErrorValidator } from "src/services/utils";
export default {
  name: "SaveCompany",
  props: {
    emitChilds: { default: false },
    action: { required: true, type: String },
  },
  data() {
    return {
      form: {
        corporate_name: null,
        cnpj: null,
        email: null,
        fantasy_name: null,
        phone_number: null,
        address: {
          postal_code: null,
          number: null,
          street: null,
          district: null,
          complement: null,
          city: null,
          uf: null,
        },
        description: null,
      },
    };
  },
  methods: {
    ...mapActions("companies", ["ActionGetDataByCnpj"]),
    getByCnpj() {
      this.ActionGetDataByCnpj(this.form.cnpj)
        .then((resp) => {
          this.form.corporate_name = resp.razao_social;
          this.form.fantasy_name = resp.nome_fantasia;
          this.form.phone_number = resp.ddd_telefone_1;
          this.form.address.street = resp.logradouro;
          this.form.address.postal_code = resp.cep;
          this.form.address.district = resp.bairro;
          this.form.address.city = resp.municipio;
          this.form.address.uf = resp.uf;
          this.form.address.number = resp.numero;
          this.form.address.complement = resp.complemento;
        })
        .catch((e) => {
          return messageErrorValidator(e.message);
        });
    },
    resetForm() {
      this.form = {
        _id: null,
        corporate_name: null,
        cnpj: null,
        email: null,
        fantasy_name: null,
        phone_number: null,
        address: {
          postal_code: null,
          number: null,
          street: null,
          district: null,
          complement: null,
          city: null,
          uf: null,
        },
        description: null,
      };
    },
    validatorRequired(field) {
      return getMessage({ field, type: "required" });
    },
    sendForm() {
      this.$emit("onForm", { ...this.form });
    },
  },
  watch: {
    emitChilds(val) {
      if (val == true) {
        this.sendForm();
      }
    },
  },
  mounted() {
    this.resetForm();
    if (this.action == "update") {
      const company = this.company;
      this.form.corporate_name = company.data.corporate_name;
      this.form._id = company.data._id;
      this.form.cnpj = company.data.cnpj;
      this.form.fantasy_name = company.data.fantasy_name;
      this.form.email = company.data.email;
      this.form.phone_number = company.data.phone_number;
      this.form.address.street = company.data.address.street;
      this.form.address.postal_code = company.data.address.postal_code;
      this.form.address.district = company.data.address.district;
      this.form.address.city = company.data.address.city;
      this.form.address.uf = company.data.address.uf;
      this.form.address.number = company.data.address.number;
      this.form.address.complement = company.data.address.complement;
    }
  },

  computed: {
    company() {
      return Company.query().first();
    },
  },
};
</script>

<style scoped>
.j-input {
  /* width: 30%; */
  margin: 0 0 20px 0;
}
</style>
