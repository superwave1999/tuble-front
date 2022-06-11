<template>
  <v-row justify="center" align="center">
    <v-col class="v-col-width">
      <v-card
        class="pa-2 d-flex justify-space-around align-center rounded-xl"
        elevation="4"
      >
        <v-btn
          v-if="!isFrozenGame"
          id="action-rotate-left"
          color="primary"
          fab
          x-large
          :disabled="!isMapLoaded || !isBlockModifiable"
          @click="rotateCounter"
        >
          <v-icon>mdi-restore</v-icon>
        </v-btn>

        <ButtonSubmit v-if="!isFrozenGame" @submit="handleSubmit" />

        <v-btn
          v-if="!isFrozenGame"
          id="action-rotate-right"
          color="primary"
          fab
          x-large
          :disabled="!isMapLoaded || !isBlockModifiable"
          @click="rotateClock"
        >
          <v-icon>mdi-reload</v-icon>
        </v-btn>
        <v-card-text v-if="isFrozenGame" class="text-center">
          {{ $t('action.finished') }}
        </v-card-text>
      </v-card>
    </v-col>
    <v-snackbar
      v-model="playerErrorTooltip"
      rounded="pill"
      color="red accent-3"
      timeout="3000"
    >
      {{ $t('snackbar.submitError') }}
    </v-snackbar>
    <v-dialog v-model="dialogCompletion" scrollable max-width="66ch">
      <CompletionCard :data="completedStats" @close="closeCompletionDialog" />
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'GameActions',
  data() {
    return {
      dialogCompletion: false,
      completedStats: null,
      playerErrorTooltip: false,
    }
  },
  computed: {
    isMapLoaded() {
      return this.$store.state.game.map && this.$store.state.game.map.length
    },
    isBlockModifiable() {
      return this.$store.state.game.activeBlockModifiable
    },
    isFrozenGame() {
      return this.$store.state.game.frozen
    },
  },
  methods: {
    rotateCounter() {
      this.$store.commit('game/rotateActiveBlock', false)
    },
    rotateClock() {
      this.$store.commit('game/rotateActiveBlock', true)
    },
    handleSubmit(state) {
      if (state === false) {
        this.playerErrorTooltip = true
      } else {
        this.completedStats = state
        this.dialogCompletion = true
      }
    },
    closeCompletionDialog() {
      this.dialogCompletion = false
    },
  },
}
</script>
