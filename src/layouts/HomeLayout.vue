<template>
  <q-layout view="hHh lpR fff">
    <q-header class="text-white"
              style="background: linear-gradient(rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.0))">
      <q-toolbar>
        <HeaderLogo/>
        <q-space/>
        <q-toolbar-title/>
        <LoginState/>
        <LanguageMenu/>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import LoginState from "components/LoginState";
import HeaderLogo from "components/HeaderLogo";
import LanguageMenu from "components/LanguageMenu";

export default {
  components: {
    HeaderLogo,
    LoginState,
    LanguageMenu
  },
  data() {
    return {
      right: false
    }
  },
  methods: {
    openLanguageDrawer() {
      this.$refs.languageDrawer.openDrawer();
    }
  }
}
</script>
