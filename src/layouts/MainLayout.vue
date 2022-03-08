<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          title="Menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title> Table Parts </q-toolbar-title>
        <q-btn flat round @click="logout()" title="Sair" class="q-btn">
          <span clickable style="font-size: 23px" class="material-icons"
            >logout</span
          >
        </q-btn>
      </q-toolbar>
    </q-header>
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label style="font-weight: 600" header>
          {{ getFantasyName }}
        </q-item-label>
        <template v-for="link in essentialLinks" :key="link.title">
          <EssentialLink
            v-if="checkPermission(link.permissions)"
            v-bind="link"
          />
        </template>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";
const linksList = [
  {
    title: "Dashboard",
    caption: "Atualizações ao vivo",
    icon: "dashboard",
    link: "#/home",
    permissions: ["root", "administrator", "user"],
  },
  {
    title: "Empresas",
    caption: "Cadastro e listagem",
    icon: "business",
    link: "#/companies",
    permissions: ["root"],
  },
  {
    title: "Empresas",
    caption: "Cadastro e listagem",
    icon: "business",
    link: "#/companies",
    permissions: ["root"],
  },
];

import { defineComponent, ref } from "vue";
import { mapActions, mapGetters } from "vuex";

export default defineComponent({
  name: "MainLayout",
  components: {
    EssentialLink,
  },
  methods: {
    ...mapActions("auth", ["ActionLogout", "ActionRefreshToken"]),
    checkPermission(arr) {
      let items = null;
      for (const item of arr) {
        items = this.getDataUser.roles.find((el) => el.name == item);
        if (items) break;
      }
      return !!items;
    },
    socketConnect(token) {
      this?.$socket?.close();
      this.$socket = this.$io(process.env.API_URL, {
        extraHeaders: {
          authorization: "Bearer " + token,
        },
      });
      this.$socket.on("hello", (e) => {
        console.log(e);
      });
    },
    logout() {
      this.$socket.close();
      this.ActionLogout();
    },
  },
  created() {
    if (this.tokenExpired) {
      const payload = {
        refresh_token: this.getRefreshToken,
      };
      setTimeout(async () => {
        await this.ActionRefreshToken(payload).catch((e) => {
          this.$q
            .dialog({
              title: "Autenticação necessária!",
              message: "Você foi desconectado, faça login novamente!",
              persistent: true,
            })
            .onOk(() => {
              this.logout();
            });
        });
      }, 200);
    }
    this.socketConnect(this.getToken);
  },
  setup() {
    const leftDrawerOpen = ref(false);
    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
  computed: {
    ...mapGetters("auth", [
      "getDataUser",
      "getToken",
      "tokenExpired",
      "getRefreshToken",
    ]),
    getFantasyName() {
      return this.getDataUser?.company?.fantasy_name ?? "Administrador";
    },
  },
  watch: {
    getToken(token) {
      this.socketConnect(token);
    },
  },
});
</script>
