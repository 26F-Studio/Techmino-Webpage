<template>
  <q-page id="mainContainer" class="flex flex-center">
    <InterstellarTravel class="dimmed" :mino-base-amount="300"/>
    <div class="row full-width q-pa-md justify-center">
      <div class="col-xl-4 col-lg-5 col-md-6 col-sm-7 col-xs-8">
        <q-form
          class="column q-gutter-md"
          action="/tech/api/v1/user/login"
          method="post"
          @submit="onSubmit">
          <div class="text-h4">
            {{ $t('login.title') }}
          </div>
          <q-input
            filled
            clearable
            v-model="email"
            :label="$t('login.emailLabel')"
            :rules="[emailRuleNotEmpty,emailRuleValidate]">
          </q-input>

          <q-input
            filled
            clearable
            type="password"
            v-model="password"
            :label="$t('login.passwordLabel')"
            :rules="[passwordRuleNotEmpty,passwordRuleValidate]"/>

          <q-toggle
            v-model="remember"
            :label="$t('login.rememberMe')"/>

          <q-btn
            class="col-auto"
            type="submit"
            color="primary"
            :label="$t('login.submitButton')"/>
        </q-form>
      </div>
    </div>
  </q-page>

</template>

<script>
import InterstellarTravel from "components/InterstellarTravel";
import axios from "axios";

export default {
  name: "Login",
  components: {
    InterstellarTravel
  },
  data: function () {
    return {
      email: null,
      password: null,
      remember: false
    }
  },
  created: function () {
    axios.post('/tech/api/v1/user/login', {}).then((response) => {
      let data = response.data;
      console.log(response.data);
      if (data.type === "Success") {
        this.$q.notify({
          color: 'green',
          textColor: 'white',
          icon: 'cloud_done',
          message: this.$t("notification.autoLogin").toString()
        });
        setTimeout(() => {
          this.$router.replace({
            path: '/user/profile',
            query: {
              uid: this.$q.cookies.get("uid"),
              webToken: this.$q.cookies.get("webToken"),
            }
          });
        }, 2000);
      } else {
        this.$q.notify({
          color: 'red',
          textColor: 'white',
          icon: 'fas fa-bug',
          message: this.$t("notification.unknownError").toString()
        });
      }
    }).catch((error) => {
      let data = error.response.data;
      if (data.type !== "Error") {
        this.$q.notify({
          color: 'red',
          textColor: 'white',
          icon: 'fas fa-bug',
          message: this.$t("notification.unknownError").toString()
        });
      }
    });
  },
  methods: {
    emailRuleNotEmpty(value) {
      return value !== null && value !== '' || this.$t('login.emailEmpty');
    },
    emailRuleValidate(value) {
      if (value.length >= 255) {
        return this.$t('login.emailViolation');
      }
      let pos = value.search(/^([a-zA-Z0-9]+[-_.]?)+@([a-zA-Z0-9]+[-_.]?)+\.[a-z]+$/);
      return pos === -1 ? this.$t('login.emailViolation') : true;
    },
    passwordRuleNotEmpty(value) {
      return value !== null && value !== '' || this.$t('login.passwordEmpty');
    },
    passwordRuleValidate(value) {
      if (value.length >= 255) {
        return this.$t('login.emailViolation');
      }
      let pos = value.search(/^\S+$/);
      return pos === -1 ? this.$t('login.passwordViolation') : true;
    },
    onSubmit() {
      axios.post('/tech/api/v1/user/login', {
        email: this.email,
        password: this.password,
        remember: this.remember
      }).then((response) => {
        let data = response.data;
        console.log(response.data);
        if (data.type === "Success") {
          this.$q.notify({
            color: 'green',
            textColor: 'white',
            icon: 'cloud_done',
            message: this.$t("notification.submitSuccess").toString()
          });
          setTimeout(() => {
            this.$router.replace({
              path: '/user/profile',
              query: {
                uid: data.data.uid,
                webToken: data.data.webToken,
              }
            });
          }, 2000);
        } else {
          this.$q.notify({
            color: 'red',
            textColor: 'white',
            icon: 'fas fa-bug',
            message: this.$t("notification.unknownError").toString()
          });
        }
      }).catch((error) => {
        let data = error.response.data;
        console.log(error.response);
        if (data.type === "Error") {
          this.$q.notify({
            color: 'amber',
            textColor: 'white',
            icon: 'warning',
            message: data.reason
          });
        } else {
          this.$q.notify({
            color: 'red',
            textColor: 'white',
            icon: 'fas fa-bug',
            message: this.$t("notification.unknownError").toString()
          });
        }
        this.password = null;
      });
    },
  },
  beforeDestroy() {
  }
}
</script>

<style scoped lang="scss">

</style>
