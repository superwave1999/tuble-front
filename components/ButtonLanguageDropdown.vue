<template>
  <v-menu offset-y transition="slide-y-transition" bottom>
    <template #activator="{ on, attrs }">
      <v-list-item v-bind="attrs" v-on="on">
        <v-list-item-icon>
          <v-icon>mdi-web</v-icon>
        </v-list-item-icon>
        <v-list-item-title
          >{{ $t('menu.lang') }}
          <v-icon>mdi-chevron-down</v-icon></v-list-item-title
        >
      </v-list-item>
    </template>
    <v-list dense>
      <v-list-item
        v-for="locale in availableLocales"
        :key="locale.code"
        @click="changeLanguage(locale.code)"
      >
        <v-list-item-title>{{ locale.name }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: 'ButtonLanguageDropdown',
  computed: {
    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale)
    },
  },
  methods: {
    changeLanguage(code) {
      this.$i18n.setLocale(code)
    },
  },
}
</script>
