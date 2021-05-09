<template>
  <div>
    <q-btn
      v-if="!loggedIn"
      class="q-py-sm q-mr-md"
      flat
      dense
      to="/user/login">
      {{ $t('header.login') }}
    </q-btn>
    <q-btn
      v-if="loggedIn"
      class="q-mr-md"
      flat
      :dense="$q.screen.lt.md"
      :round="$q.screen.lt.md">
      <q-avatar
        :size="$q.screen.lt.md? 'lg' : 'xl'">
        <q-img :src="avatar"/>
      </q-avatar>
      <div class="q-pl-sm gt-sm text-body1">
        {{ username }}
      </div>
      <q-menu
        fit>
        <q-list>
          <q-item
            clickable
            v-close-popup
            :to="avatarRouter">
            <q-item-section>
              <q-item-label>{{ $t('header.user.profile') }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            clickable
            v-close-popup
            @click="logout">
            <q-item-section>
              <q-item-label>{{ $t('header.user.logout') }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginState",
  data() {
    return {
      loggedIn: false,
      avatar: null,
      username: null,
      avatarRouter: {
        path: "/user/profile",
        query: {},
      }
    }
  },
  created() {
    axios.post('/tech/api/v1/user/login', {}).then((response) => {
      let data = response.data;
      if (data.type === "Success") {
        this.avatarRouter.query = {
          uid: this.$q.cookies.get("uid"),
          authToken: this.$q.cookies.get("authToken"),
        };
        this.loggedIn = true;
        this.getProfileInfo(parseInt(this.$q.cookies.get("uid")));
        this.getAvatar(parseInt(this.$q.cookies.get("uid")));
      }
    }).catch((error) => {
      console.log(error);
    });
  },
  watch: {
    $route() {
      axios.post('/tech/api/v1/user/login', {}).then((response) => {
        let data = response.data;
        if (data.type === "Success") {
          this.avatarRouter.query = {
            uid: this.$q.cookies.get("uid"),
            authToken: this.$q.cookies.get("authToken"),
          };
          this.loggedIn = true;
          this.getProfileInfo(parseInt(this.$q.cookies.get("uid")));
          this.getAvatar(parseInt(this.$q.cookies.get("uid")));
        }
      }).catch((error) => {
        console.log(error);
      });
    }
  },
  methods: {
    getProfileInfo(uid) {
      axios.post('/tech/api/v1/user/profile/info', {
        uid: uid,
      }).then((response) => {
        let data = response.data;
        if (data.type === "Success") {
          this.username = data.data.username;
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    getAvatar(uid) {
      axios.post('/tech/api/v1/user/profile/avatar', {
        uid: uid,
        hash: this.$q.localStorage.getItem("avatarHash") || ""
      }).then((response) => {
        let data = response.data;
        if (data.type === "Success") {
          if (data.data) {
            this.avatar = data.data.avatar;
            this.$q.localStorage.set("avatarHash", data.data.hash);
          } else {
            this.avatar = this.$q.localStorage.getItem("avatar");
          }
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    logout() {
      this.$q.notify({
        color: 'green',
        textColor: 'white',
        icon: 'cloud_done',
        message: this.$t("notification.logout").toString()
      });
      this.$q.cookies.remove('uid');
      this.$q.cookies.remove('authToken');
      this.$q.localStorage.remove("avatar");
      this.$q.localStorage.remove("avatarHash");
      this.avatar = null;
      this.username = null;
      this.loggedIn = false;
      this.$router.replace({
        path: '/user/login',
      });
    }
  }
}
</script>

<style scoped>

</style>
