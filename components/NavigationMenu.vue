<template>
    <v-menu
        transition="slide-y-transition"
        left
    >
      <template #activator="{ on, attrs }">
        <v-btn
          icon
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list dense>
        <v-list-item @click="toggleDarkMode">
            <v-list-item-icon>
                <v-icon :color="(isDarkMode) ? 'amber lighten-3' : 'indigo darken-3'">{{(isDarkMode) ? 'mdi-white-balance-sunny' : 'mdi-weather-night'}}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{(isDarkMode) ? $t('menu.lightMode') : $t('menu.darkMode')}}</v-list-item-title>
        </v-list-item>
        <ButtonLanguageDropdown />
        <v-list-item @click="$emit('openHistoryDialog')">
            <v-list-item-icon>
                <v-icon>mdi-podium</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ $t('menu.history') }}</v-list-item-title>
        </v-list-item>
        <v-list-item @click="$emit('openHelpDialog')">
            <v-list-item-icon>
                <v-icon>mdi-help</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ $t('menu.help') }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
</template>

<script>
export default {
    name: "NavigationMenu",
    data: () => {
        return {
            languageSubmenu: false,
        };
    },
    computed: {
        isDarkMode: {
            get() {
                return this.$vuetify.theme.isDark;
            },
            set(value) {
                this.$vuetify.theme.isDark = value;
                localStorage.setItem("_tuble_dark", Number(value));
            }
        },
    },
    methods: {
        toggleDarkMode() {
            this.isDarkMode = !this.isDarkMode;
        }
    }
}
</script>