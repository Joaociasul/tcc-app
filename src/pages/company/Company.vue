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
    <Paginator :paginator="paginator" @onPage="changePage" :page="page" />
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
import {
  messageConfirm,
  messageErrorValidator,
  messagesSuccess,
  urlEncode,
} from "src/services/utils";
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
      page: 1,
      company_id: null,
      filters: "",
      columns: [
        {
          label: "Rasão Social",
          field: "corporate_name",
          width: "200",
        },
        {
          label: "Nome Fantasia",
          field: "fantasy_name",
          width: "150",
        },
        {
          label: "CNPJ",
          field: "cnpj",
          width: "50",
        },
        {
          label: "Telefone",
          field: "phone_number",
          width: "100",
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
      "ActionUpdateCompany",
      "ActionDeleteCompany",
    ]),
    async onRequest() {
      if (this.tokenExpired) {
        setTimeout(async () => {
          return await this.onRequest(this.filters);
        }, 10);
      } else {
        this.$q.loading.hide();
        let data = await this.ActionGetCompanies(this.filters);
        this.rows = data.data;
        this.paginator = data.paginator;
        this.$q.loading.hide();
      }
    },
    sendFilter(filter) {
      this.$q.loading.show();
      this.filters = urlEncode(filter);
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
    onDelete(element) {
      messageConfirm(
        "Deseja excluir a empresa " + element.corporate_name + "?"
      ).onOk(async () => {
        this.ActionDeleteCompany(element)
          .then(() => {
            messagesSuccess("deleteCompanySuccess");
            return this.onRequest();
          })
          .catch((e) => {
            console.log(e);
            messageError("deleteCompanyError");
            return this.onRequest();
          });
      });
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
          await this.ActionCreateCompany(payload);
          this.modalOpen = false;
          this.$q.loading.hide();
          messagesSuccess("createCompanySuccess");
          return this.onRequest();
        } catch (e) {
          if (e?.error?.validator) {
            messageErrorValidator(getMessage(e.error.validator));
            this.$q.loading.hide();
          }
        }
      }
      try {
        await this.ActionUpdateCompany(payload);
        this.modalOpen = false;
        this.$q.loading.hide();
        messagesSuccess("updateCompanySuccess");
        return this.onRequest();
      } catch (e) {
        if (e?.error?.validator) {
          messageErrorValidator(getMessage(e.error.validator));
          this.$q.loading.hide();
        }
      }
    },
    changePage(val) {
      const filter = [{ field: "page", value: val }];
      this.filters = urlEncode(filter);
      this.onRequest();
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
