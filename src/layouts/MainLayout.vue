<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left"/>
        <HeaderLogo :mini="true"/>
        <q-space/>
        <q-toolbar-title/>
        <LoginState/>
        <LanguageMenu/>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="left" side="left" overlay elevated>
      <q-item
        to="/"
        clickable
        ripple>
        <q-item-section avatar>
          <q-icon name="home"/>
        </q-item-section>

        <q-item-section>
          {{ $t("mainDrawer.homePage") }}
        </q-item-section>
      </q-item>

      <q-item
        class="absolute-bottom"
        clickable
        v-ripple
        @click="openLink('https://github.com/26F-Studio/Techmino')">
        <q-item-section avatar>
          <q-icon name="fab fa-github"/>
        </q-item-section>

        <q-item-section>
          {{ $t("mainDrawer.githubRepo") }}
        </q-item-section>

        <q-item-section avatar>
          <q-icon name="link"/>
        </q-item-section>
      </q-item>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>

  </q-layout>
</template>

<script>
import HeaderLogo from "components/HeaderLogo";
import LoginState from "components/LoginState";
import LanguageMenu from "components/LanguageMenu";

export default {
  components: {
    HeaderLogo,
    LoginState,
    LanguageMenu
  },
  data() {
    return {
      left: false,
    }
  },
  methods: {
    openLink(url) {
      window.open(url);
    }
  }
}
</script>

<style lang="scss" scoped>
.logoClass_Base {
  fill: #ffffff
}
</style>
