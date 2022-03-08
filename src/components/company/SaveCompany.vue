<template>
  <div>
    <q-form>
      <div class="row">
        <div class="col-sm-6 col-md-4 col-lg-3 q-pl-sm q-pr-sm">
          <q-input
            class="j-input full-width"
            autocomplete="nope"
            v-model="form.cnpj"
            mask="##.###.###/####-##"
            @blur="getByCnpj()"
            label="CNPJ"
          />
        </div>
        <div class="col-sm-6 col-md-4 col-lg-3 q-pl-sm q-pr-sm">
          <q-input
            class="j-input full-width"
            autocomplete="nope"
            v-model="form.corporate_name"
            label="Rasão social"
          />
        </div>
        <div class="col-sm-6 col-md-4 col-lg-3 q-pl-sm q-pr-sm">
          <q-input
            class="j-input full-width"
            autocomplete="nope"
            v-model="form.email"
            label="Email"
          />
        </div>
        <div class="col-sm-6 col-md-4 col-lg-3 q-pl-sm q-pr-sm">
          <q-input
            class="j-input full-width"
            autocomplete="nope"
            v-model="form.fantasy_name"
            label="Nome Fantasia"
          />
        </div>
        <div class="col-sm-6 col-md-4 col-lg-3 q-pl-sm q-pr-sm">
          <q-input
            class="j-input full-width"
            autocomplete="nope"
            v-model="form.phone_number"
            mask="(##) # ####-####"
            label="Telefone"
          />
        </div>
        <div class="col-sm-6 col-md-4 col-lg-3 q-pl-sm q-pr-sm">
          <q-input
            class="j-input full-width"
            autocomplete="nope"
            v-model="form.address.postal_code"
            mask="##.###-###"
            label="Cep"
          />
        </div>
        <div class="col-sm-6 col-md-4 col-lg-3 q-pl-sm q-pr-sm">
          <q-input
            class="j-input full-width"
            autocomplete="nope"
            v-model="form.address.number"
            label="Número"
          />
        </div>
        <div class="col-sm-6 col-md-4 col-lg-3 q-pl-sm q-pr-sm">
          <q-input
            class="j-input full-width"
            autocomplete="nope"
            v-model="form.address.street"
            label="Logradouro"
          />
        </div>
        <div class="col-sm-6 col-md-4 col-lg-3 q-pl-sm q-pr-sm">
          <q-input
            class="j-input full-width"
            autocomplete="nope"
            v-model="form.address.district"
            label="Bairro"
          />
        </div>
        <div class="col-sm-6 col-md-4 col-lg-3 q-pl-sm q-pr-sm">
          <q-input
            class="j-input full-width"
            autocomplete="nope"
            v-model="form.address.complement"
            label="Complemento"
          />
        </div>
        <div class="col-sm-6 col-md-4 col-lg-3 q-pl-sm q-pr-sm">
          <q-input
            class="j-input full-width"
            autocomplete="nope"
            v-model="form.address.city"
            label="Cidade"
          />
        </div>
        <div class="col-sm-6 col-md-4 col-lg-3 q-pl-sm q-pr-sm">
          <q-input
            class="j-input full-width"
            autocomplete="nope"
            v-model="form.address.uf"
            label="Estado"
          />
        </div>
      </div>
    </q-form>
  </div>
</template>

<script>
import Company from "src/models/Company";
import { mapActions, mapState } from "vuex";
export default {
  name: "SaveCompany",
  props: {
    emitChilds: { default: false },
    action: { required: true, type: String },
  },
  emits: ["onForm"],
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
          console.log(resp);
          this.form.corporate_name = resp.nome;
          this.form.fantasy_name = resp.fantasia;
          this.form.email = resp.email;
          this.form.phone_number = resp.telefone;
          this.form.address.street = resp.logradouro;
          this.form.address.postal_code = resp.cep;
          this.form.address.district = resp.bairro;
          this.form.address.city = resp.municipio;
          this.form.address.uf = resp.uf;
          this.form.address.number = resp.numero;
          this.form.address.complement = resp.complemento;
        })
        .catch((e) => console.log(e));
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
  },
  watch: {
    emitChilds(val) {
      if (val == true) {
        this.$emit("onForm", { ...this.form });
      }
      console.log(val);
    },
    action(val) {
      console.log(val);
    },
    // company_id(val) {
    //   console.log({ val });
    // },
  },
  mounted() {
    this.resetForm();
    if (this.action == "update") {
      const company = this.company;
      // this.form = company.data;
      console.log(company.data);
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
