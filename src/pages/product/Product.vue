<template>
  <q-page>
    <Filter
      @filter="sendFilter"
      :fieldOptions="filterOptions"
      :showBtnAdd="false"
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
    >
      <template v-slot:content>
        <SaveCompany
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
import SaveCompany from "components/company/SaveCompany.vue";
import Paginator from "components/Paginator.vue";

export default {
  components: {
    Table,
    Filter,
    Modal,
    SaveCompany,
    Paginator,
  },
  data() {
    return {
      company_id: null,
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
    };
  },
  methods: {
    ...mapActions("products", ["ActionGetProducts"]),
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
    openModal() {
      this.titleModal = "Nova Empresa";
      this.actionForm = "create";
      this.modalOpen = false;
      setTimeout(() => {
        this.modalOpen = true;
      }, 1);
    },
    onOkModal() {
      this.modalOpen = true;
      this.emitChilds = false;
      setTimeout(() => {
        this.emitChilds = true;
      }, 1);
    },
    onCancelModal() {
      this.modalOpen = true;
      setTimeout(() => {
        this.modalOpen = false;
      }, 1);
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
      if (!showed) {
        this.$q.notify({
          message: "Clique duas vezes para abrir.",
          icon: "announcement",
        });
      }
      this.$q.sessionStorage.set("showedMessageInfoRowClick", true);
    },
    openProduct(i) {
      console.log(i);
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
