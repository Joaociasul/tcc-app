<template>
  <q-page class="window-height window-width row justify-center items-center">
    <div class="column">
      <div class="row flex-center">
        <h5 class="text-h5 text-dark q-my-md">Acesso restrito</h5>
      </div>
      <div class="row">
        <q-card square bordered class="q-pa-lg shadow-1">
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input
                square
                filled
                clearable
                v-model="email"
                type="email"
                label="Usuário"
              />
              <q-input
                square
                filled
                clearable
                v-model="password"
                type="password"
                label="Senha"
              />
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn
              unelevated
              color="primary"
              size="lg"
              class="full-width"
              label="Login"
              @click="login()"
            />
          </q-card-actions>
          <q-card-section class="text-center q-pa-none"> </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { useQuasar } from "quasar";
import { messageError } from "src/services/utils";
import { ref } from "@vue/reactivity";
export default {
  name: "Login",
  setup() {
    const email = ref(null);
    const password = ref(null);
    return {
      email,
      password,
    };
  },
  methods: {
    ...mapActions("auth", ["ActionLogin"]),
    async login() {
      this.$q.loading.show();
      const data = {
        email: this.email,
        password: this.password,
      };
      await this.ActionLogin(data)
        .then((resp) => {
          this.$q.loading.hide();
          this.$router.push("/home");
        })
        .catch(({ error }) => {
          if (error.validator) {
            error.validator.auth == false && messageError("auth");
          }
        });
    },
  },
};
</script>

<style>
.q-card {
  width: 360px;
}
</style>
