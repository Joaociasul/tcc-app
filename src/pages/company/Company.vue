<template>
  <q-page>
    <Filter
      @filter="sendFilter"
      :fieldOptions="filterOptions"
      @openModalAdd="openModal"
    />
    <Table
      :columns="columns"
      :rows="rows"
      @onDelete="onDelete"
      @onEdit="onEdit"
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
import { mapActions, mapGetters, mapMutations } from "vuex";
import Table from "components/Table.vue";
import Filter from "components/Filter.vue";
import { messageErrorValidator, urlEncode } from "src/services/utils";
import Modal from "components/Modal.vue";
import SaveCompany from "components/company/SaveCompany.vue";
import Paginator from "components/Paginator.vue";
import Company from "src/models/Company";
import { messageError } from "../../services/utils";
import { getMessage } from "../../services/messages/company";

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
      columns: [
        {
          label: "Rasão Social",
          field: "corporate_name",
        },
        {
          label: "Nome Fantasia",
          field: "fantasy_name",
        },
        {
          label: "CNPJ",
          field: "cnpj",
        },
        {
          label: "Telefone",
          field: "phone_number",
        },
      ],
      rows: [],
      filterOptions: [
        {
          label: "Rasão Social",
          value: "corporate_name",
        },
        {
          label: "Nome Fantasia",
          value: "fantasy_name",
        },
        {
          label: "CNPJ",
          value: "cnpj",
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
    ...mapActions("companies", [
      "ActionGetCompanies",
      "ActionCreateCompany",
      "ActionGetCompany",
      "ActionSetCompany",
    ]),
    async onRequest(search_terms = "") {
      if (this.tokenExpired) {
        setTimeout(async () => {
          return await this.onRequest(search_terms);
        }, 10);
      } else {
        let data = await this.ActionGetCompanies(search_terms);
        this.rows = data.data;
        this.paginator = data.paginator;
        this.$q.loading.hide();
      }
    },
    sendFilter(filter) {
      this.$q.loading.show();
      this.onRequest(urlEncode(filter));
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
    onDelete(element) {
      console.log(element);
    },
    async onEdit(element) {
      this.titleModal = "Editar Empresa";
      this.actionForm = "update";
      this.modalOpen = false;
      const data = await this.ActionGetCompany(element);
      Company.create({ data: { data } });
      setTimeout(() => {
        this.modalOpen = true;
      }, 1);
    },
    changeForm(data) {
      this.updateOrCreateCompany(data);
    },
    async updateOrCreateCompany(payload) {
      this.$q.loading.show();
      if (this.actionForm === "create") {
        try {
          const resp = await this.ActionCreateCompany(payload);
          this.modalOpen = false;
          this.$q.loading.hide();
          return this.rows.push(resp);
        } catch (e) {
          if (e?.error?.validator) {
            messageErrorValidator(getMessage(e.error.validator));
            this.$q.loading.hide();
          }
        }
      }
    },
    changePage(val) {
      const filter = [{ field: "page", value: val }];
      this.onRequest(urlEncode(filter));
    },
  },
  mounted() {
    this.$q.loading.show();
    this.onRequest();
  },
  computed: {
    ...mapGetters("auth", ["tokenExpired"]),
  },
};
</script>
