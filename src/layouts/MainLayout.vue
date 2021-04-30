<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left"/>

        <q-toolbar-title>
          <q-avatar>
            <img src="../assets/avatar.png" alt="avatar">
          </q-avatar>
          Techmino
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="left" side="left" overlay elevated>
      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-icon name="pending"/>
        </q-item-section>

        <q-item-section>
          Coming soon...
        </q-item-section>
      </q-item>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      left: false
    }
  }
}
</script>
