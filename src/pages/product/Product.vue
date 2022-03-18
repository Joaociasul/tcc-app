<template>
  <q-page>
    <Filter
      @filter="sendFilter"
      :fieldOptions="filterOptions"
      :showBtnAdd="true"
      @openModalAdd="openModalAdd"
      labelSearch="Pesquisa por cód.barras"
      title="Produtos"
      @onSearch="search"
    />
    <Table
      :columns="columns"
      :rows="rows"
      :showActions="false"
      @onRowDblClick="openProduct"
      @onRowClick="rowClick"
    />
    <Paginator :paginator="paginator" @onPage="changePage" />
    <Modal
      v-model:openModal="modalOpen"
      @onOk="onOkModal"
      @onCancel="onCancelModal"
      :title="titleModal"
      v-model:fullWidth="fullWidth"
      :showBtnCancel="false"
      :labelBtnOk="'Ok'"
    >
      <template v-slot:content>
        <SaveProduct
          @onForm="changeForm"
          v-model:emitChilds="emitChilds"
          v-model:action="actionForm"
          v-model:company_id="company_id"
        />
      </template>
    </Modal>
  </q-page>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import Table from "components/Table.vue";
import Filter from "components/Filter.vue";
import { urlEncode } from "src/services/utils";
import Modal from "components/Modal.vue";
import SaveProduct from "components/product/SaveProduct.vue";
import Paginator from "components/Paginator.vue";
import { date } from "quasar";

export default {
  components: {
    Table,
    Filter,
    Modal,
    Paginator,
    SaveProduct,
  },
  data() {
    return {
      company_id: null,
      fullWidth: false,
      filters: {},
      filterString: "",
      columns: [
        {
          label: "Produto",
          field: "name",
          width: "200",
        },
        {
          label: "Código de barras",
          field: "ean_cod",
          width: "40",
        },

        {
          label: "Código",
          field: "cod",
          width: "50",
        },
        {
          label: "Valor unitário",
          field: "unitary_value",
          width: "100",
        },
        {
          label: "Quantidade",
          field: "quantity",
          width: "100",
        },
        {
          label: "Total",
          field: "total_amount",
          width: "100",
        },
        {
          label: "Comprado em",
          field: "purchase_date",
          width: "100",
        },
      ],
      rows: [],
      filterOptions: [
        {
          label: "Nome do produto",
          value: "name",
        },
        {
          label: "Código",
          value: "cod",
        },
        {
          label: "Código de barras",
          value: "ean_cod",
        },
      ],
      modalOpen: false,
      titleModal: "",
      emitChilds: false,
      paginator: { total: 0 },
      actionForm: "create",
      dblClick: false,
    };
  },
  methods: {
    ...mapActions("products", ["ActionGetProducts", "ActionGetProduct"]),
    ...mapActions("paginator", ["ActionSetPage"]),
    async onRequest() {
      if (this.tokenExpired) {
        setTimeout(async () => {
          return await this.onRequest(urlEncode(this.filters));
        }, 10);
      } else {
        this.$q.loading.hide();
        let data = await this.ActionGetProducts(urlEncode(this.filters));
        this.rows = [];
        data.data.map((el) => {
          el.total_amount = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(el.total_amount);
          el.unitary_value = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(el.unitary_value);
          el.purchase_date = date.formatDate(
            el.purchase_date,
            "DD/MM/YYYY HH:mm"
          );
          this.rows.push(el);
        });
        this.paginator = data.paginator;
        this.$q.loading.hide();
      }
    },
    sendFilter(filter) {
      for (const i in this.filters) {
        delete this.filters[i];
      }
      filter.map((el) => {
        this.filters[el.field] = el.value;
      });
      this.filters["page"] = 1;
      this.ActionSetPage(1);
      this.onRequest();
    },
    openModalAdd() {
      this.fullWidth = false;
      this.titleModal = "Upload de XML";
      this.actionForm = "create";
      this.modalOpen = false;
      this.$nextTick(() => {
        this.modalOpen = true;
      });
    },
    onOkModal() {
      this.modalOpen = true;
      this.$nextTick(() => {
        this.modalOpen = false;
        this.actionForm == "create" && this.onRequest();
      });
    },
    onCancelModal() {
      this.modalOpen = true;
      this.$nextTick(() => {
        this.modalOpen = false;
      });
    },
    changeForm(data) {
      this.updateOrCreateCompany(data);
    },
    changePage(val) {
      this.filters["page"] = val;
      this.onRequest();
    },
    rowClick(i) {
      let showed = this.$q.sessionStorage.getItem("showedMessageInfoRowClick");
      setTimeout(() => {
        if (!showed || !this.dblClick) {
          this.$q.notify({
            message: "Clique duas vezes para abrir.",
            icon: "announcement",
          });
        }
        this.$q.sessionStorage.set("showedMessageInfoRowClick", true);
      }, 200);
    },
    openProduct(element) {
      this.dblClick = true;
      this.fullWidth = true;
      this.ActionGetProduct(element);
      this.titleModal = "Visualizar Produto";
      this.actionForm = "view";
      this.modalOpen = false;
      this.$nextTick(() => {
        this.modalOpen = true;
      });
    },
    search(search_term) {
      this.filters["ean_cod"] = search_term;
      return this.onRequest();
    },
  },
  mounted() {
    this.onRequest();
  },
  computed: {
    ...mapGetters("auth", ["tokenExpired"]),
  },
};
</script>
