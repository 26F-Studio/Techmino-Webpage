<template>
  <div id="q-app" class="no-scroll">
    <router-view/>
  </div>
</template>
<script>
export default {
  name: 'App',
  created: function () {
    this.$q.dark.set(true)
    this.$i18n.locale = this.$q.lang.getLocale();
  }
}
</script>
