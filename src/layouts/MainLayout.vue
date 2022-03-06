<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title> Table Parts </q-toolbar-title>
        <div @click="logout()" style="cursor: pointer" class="q-btn">
          <span clickable style="font-size: 25px" class="material-icons"
            >logout</span
          >
        </div>
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
    title: "Github",
    caption: "github.com/quasarframework",
    icon: "code",
    link: "#/teste",
    permissions: ["root", "administrator", "user"],
  },
  {
    title: "Discord Chat Channel",
    caption: "chat.quasar.dev",
    icon: "chat",
    link: "#",
    permissions: ["root", "administrator", "user"],
  },
  {
    title: "Forum",
    caption: "forum.quasar.dev",
    icon: "record_voice_over",
    link: "#",
    permissions: ["root", "administrator", "user"],
  },
  {
    title: "Twitter",
    caption: "@quasarframework",
    icon: "rss_feed",
    link: "#",
    permissions: ["root", "administrator", "user"],
  },
  {
    title: "Facebook",
    caption: "@QuasarFramework",
    icon: "public",
    link: "#",
    permissions: ["root", "administrator", "user"],
  },
  {
    title: "Quasar Awesome",
    caption: "Community Quasar projects",
    icon: "favorite",
    link: "#",
    permissions: ["root", "administrator", "user"],
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
    ...mapActions("auth", ["ActionLogout"]),
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
        console.log(e); // x8WIv7-mJelg7on_ALbx
      });
    },
    logout() {
      this.$socket.close();
      this.ActionLogout();
    },
  },
  mounted() {
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
    ...mapGetters("auth", ["getDataUser", "getToken"]),
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
