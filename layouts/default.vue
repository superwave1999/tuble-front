<template>
  <v-app>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  async beforeMount() {
    let darkMode = localStorage.getItem('_tuble_dark')
    if (darkMode === null) {
      darkMode =
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
    } else {
      darkMode = Boolean(Number(darkMode))
    }
    this.$vuetify.theme.isDark = darkMode

    const config = await this.$axios.$get('config')
    this.$store.commit('config/init', config)
    const contents = await this.$axios.$get('start')
    this.$store.commit('game/init', contents)
  },
}
</script>

<style>
div.v-col-width {
  width: 100%;
  max-width: 60ch;
}
</style>
