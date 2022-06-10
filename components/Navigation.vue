<template>
  <v-row justify="center" align="center">
    <v-col class="v-col-width">
      <v-app-bar
        rounded
        dense
      >
        <v-toolbar-title>{{ $t('title') }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <div class="pr-3 pr-sm-6 pr-md-8">
          <v-icon>mdi-timer</v-icon>
          <span class="text-subtitle-1">
            {{(isMapLoaded) ? ((time) ? time : '00:00') : '--:--'}}
          </span>
        </div>
        <div class="pr-3 pr-sm-6 pr-md-8">
          <v-icon>mdi-gesture-tap</v-icon>
          <span class="text-subtitle-1">
            {{(isMapLoaded) ? moves : '--'}}
          </span>
        </div>
        <NavigationMenu @openHelpDialog="openHelpDialog" @openHistoryDialog="openHistoryDialog" />
      </v-app-bar>
    </v-col>
      <v-dialog
        v-model="dialogHelp"
        scrollable
        max-width="66ch"
      >
        <HelpCard @close="closeHelpDialog"/>
      </v-dialog>
      <v-dialog
        v-model="dialogHistory"
        scrollable
        max-width="66ch"
      >
        <HistoryCard @close="closeHistoryDialog"/>
      </v-dialog>
  </v-row>
</template>

<script lang="js">
import { calculateTime } from '~/utils/timelog.js';

export default {
    name: "Navigation",
    data() {
        return {
            dialogHelp: false,
            dialogHistory: false,
            dialogTimerStartedBeforeOpen: false,
            interval: null,
            time: null
        };
    },
    computed: {
        moves() {
          return this.$store.state.game.moves;
        },
        isMapLoaded() {
          return this.$store.state.game.map && this.$store.state.game.map.length; 
        },
        timerIsStarted() {
          return this.$store.state.game.timerIsStarted;
        }
    },
    watch: {
        timerIsStarted(isStarted) {
          if (!isStarted && !this.time) {
            this.calcTime();
          } else if (isStarted) {
            this.interval = setInterval(function () {
              this.calcTime();
            }.bind(this), 1000);  
          } else {
            clearInterval(this.interval)
          }
        }
    },
    mounted() {
      // Detect new player and show help.
      if (localStorage.getItem("_tuble_helped") === null) {
        this.dialogHelp = true
      }
    },
    beforeDestroy () {
      clearInterval(this.interval)
    },
    methods: {
        calcTime() {
          const timeLog = this.$store.state.game.timeLog;
          this.time = calculateTime(timeLog, false, this.timerIsStarted);
        },
        closeHelpDialog() {
          if (this.dialogTimerStartedBeforeOpen) {
            this.$store.commit('game/startTimer');
          }
          this.dialogHelp = false;
          localStorage.setItem("_tuble_helped", true)
        },
        openHelpDialog() {
          this.dialogTimerStartedBeforeOpen = this.$store.state.game.timerIsStarted; 
          this.$store.commit('game/stopTimer');
          this.dialogHelp = true;
        },
        closeHistoryDialog() {
          if (this.dialogTimerStartedBeforeOpen) {
            this.$store.commit('game/startTimer');
          }
          this.dialogHistory = false;
        },
        openHistoryDialog() {
          this.dialogTimerStartedBeforeOpen = this.$store.state.game.timerIsStarted; 
          this.$store.commit('game/stopTimer');
          this.dialogHistory = true;
        }
    }
}
</script>