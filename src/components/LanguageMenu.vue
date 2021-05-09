<template>
  <q-btn
    :label="$q.screen.lt.md ? '' : $t('header.language')"
    :dense="$q.screen.lt.md"
    icon="language"
    flat>
    <q-menu
      fit>
      <q-list>
        <q-item
          v-for="langOption in langOptions"
          :key="langOption.value"
          clickable
          @click="setLanguage(langOption.value)">
          <q-item-section class="text-center">
            {{ langOption.label }}
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script>
export default {
  name: "LanguageMenu",
  data() {
    return {
      lang: this.$i18n.locale,
      langOptions: [
        {value: 'en-us', label: 'English', emoji: '🇺🇸'},
        {value: 'zh-cn', label: '简体中文', emoji: '🇺🇸'}
      ],
    }
  },
  methods: {
    setLanguage(lang) {
      this.$i18n.locale = lang;
    }
  }
}
</script>
