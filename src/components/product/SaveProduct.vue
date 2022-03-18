<template>
  <div>
    <div class="q-pa-sm">
      <q-form v-if="action == 'create'">
        <div class="full-width">
          <Uploader />
        </div>
      </q-form>
      <div v-else-if="action == 'view'" class="q-gutter-md">
        <div class="row">
          <div class="col-sm-6 col-md-4 col-lg-3">
            <p><strong>Nome: </strong>{{ data.name }}</p>
          </div>
          <div class="col-sm-6 col-md-4 col-lg-3">
            <p><strong>Código: </strong>{{ data.cod }}</p>
          </div>
          <div class="col-sm-6 col-md-4 col-lg-3">
            <p>
              <strong>Data da compra: </strong
              >{{ date.formatDate(data.purchase_date, "DD/MM/YYYY HH:mm") }}
            </p>
          </div>
          <div class="col-sm-6 col-md-4 col-lg-3">
            <p><strong>Código de barras: </strong>{{ data.ean_cod }}</p>
          </div>
          <div class="col-sm-6 col-md-4 col-lg-3">
            <p>
              <strong>Valor unitário: </strong
              >{{
                new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(data.unitary_value)
              }}
            </p>
          </div>
          <div class="col-sm-6 col-md-4 col-lg-3">
            <p><strong>Quantidade comprada: </strong>{{ data.quantity }}</p>
          </div>
          <div class="col-sm-6 col-md-4 col-lg-3">
            <p>
              <strong>Unidade de medida: </strong>{{ data.unit_of_measure }}
            </p>
          </div>
          <div class="col-sm-6 col-md-4 col-lg-3">
            <p>
              <strong>Valor total: </strong
              >{{
                new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(data.total_amount)
              }}
            </p>
          </div>
          <div class="col-sm-6 col-md-4 col-lg-3">
            <p><strong>Código Cest: </strong>{{ data.cest }}</p>
          </div>
          <div class="col-sm-6 col-md-4 col-lg-3">
            <p><strong>Código NCM: </strong>{{ data.ncm }}</p>
          </div>
          <div class="col-lg-12 full-width flex justify-start">
            <h5 class="q-mb-md" style="margin-top: 0">Fornecedor</h5>
          </div>

          <div class="col-sm-6 col-md-4 col-lg-3">
            <p>
              <strong>Rasão Social: </strong
              >{{ data.supplier_company.corporate_name }}
            </p>
          </div>
          <div class="col-sm-6 col-md-4 col-lg-3">
            <p>
              <strong>Nome Fantasia: </strong
              >{{ data.supplier_company.corporate_name }}
            </p>
          </div>
          <div class="col-sm-6 col-md-4 col-lg-3">
            <p>
              <strong>Telefone: </strong
              >{{ data.supplier_company.phone_number }}
            </p>
          </div>
          <div class="col-sm-6 col-md-4 col-lg-3">
            <p><strong>Cep: </strong>{{ data.supplier_company.postal_code }}</p>
          </div>
          <div class="col-sm-6 col-md-4 col-lg-3">
            <p><strong>Cidade: </strong>{{ data.supplier_company.city }}</p>
          </div>
          <div class="col-sm-6 col-md-4 col-lg-3">
            <p><strong>Estado: </strong>{{ data.supplier_company.uf }}</p>
          </div>
          <div class="col-sm-6 col-md-4 col-lg-3">
            <p>
              <strong>Endereço: </strong>{{ data.supplier_company.street }},
              {{ data.supplier_company.number }},
              {{ data.supplier_company.district }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Uploader from "components/Uploader.vue";
import { date } from "quasar";

export default {
  name: "SaveCompany",
  props: {
    emitChilds: { default: false },
    action: { required: true, type: String },
  },
  emits: ["onForm"],
  components: {
    Uploader,
  },
  data() {
    return {
      form: {
        files: null,
      },
      data: {
        cest: null,
        cod: null,
        ean_cod: null,
        created_at: null,
        name: null,
        ncm: null,
        purchase_date: null,
        quantity: null,
        total_amount: null,
        unit_of_measure: null,
        unitary_value: null,
        xml_name: null,
        supplier_company: {
          city: null,
          cnpj: null,
          complement: null,
          corporate_name: null,
          country: null,
          district: null,
          fantasy_name: null,
          number: null,
          phone_number: null,
          postal_code: null,
          street: null,
          uf: null,
        },
      },
      date,
    };
  },
  methods: {
    ...mapActions("companies", ["ActionGetDataByCnpj"]),

    resetForm() {
      this.form = {
        files: null,
      };
    },
  },
  watch: {
    emitChilds(val) {
      if (val == true) {
        this.$emit("onForm", { ...this.form });
      }
    },
  },
  mounted() {},

  computed: {
    ...mapState("products", ["product"]),
  },
  watch: {
    product(val) {
      if (!val) return;
      (this.data.cest = val.cest),
        (this.data.cod = val.cod),
        (this.data.ean_cod = val.ean_cod),
        (this.data.created_at = val.created_at),
        (this.data.name = val.name),
        (this.data.ncm = val.ncm),
        (this.data.purchase_date = val.purchase_date),
        (this.data.quantity = val.quantity),
        (this.data.total_amount = val.total_amount),
        (this.data.unit_of_measure = val.unit_of_measure),
        (this.data.unitary_value = val.unitary_value),
        (this.data.xml_name = val.xml_name),
        (this.data.supplier_company.city = val.supplier_company.city),
        (this.data.supplier_company.cnpj = val.supplier_company.cnpj),
        (this.data.supplier_company.complement =
          val.supplier_company.complement),
        (this.data.supplier_company.corporate_name =
          val.supplier_company.corporate_name),
        (this.data.supplier_company.country = val.supplier_company.country),
        (this.data.supplier_company.district = val.supplier_company.district),
        (this.data.supplier_company.fantasy_name =
          val.supplier_company.fantasy_name),
        (this.data.supplier_company.number = val.supplier_company.number),
        (this.data.supplier_company.phone_number =
          val.supplier_company.phone_number),
        (this.data.supplier_company.postal_code =
          val.supplier_company.postal_code),
        (this.data.supplier_company.street = val.supplier_company.street),
        (this.data.supplier_company.uf = val.supplier_company.uf);
    },
  },
};
</script>

<style scoped>
.j-input {
  /* width = 30%; */
  margin: 0 0 20px 0;
}
</style>
