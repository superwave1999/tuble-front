<template>
    <v-btn
        id="action-submit"
        color="success"
        large
        rounded
        :disabled="(!isMapLoaded) || loading"
        :loading="loading"
        @click="submitMap"
    >
      {{ $t('button.submit') }}
    </v-btn>
</template>

<script>
import { calculateTime } from '~/utils/timelog.js';
import historyMixin from '~/plugins/mixin-history'

export default {
    name: 'ButtonSubmit',
    mixins: [historyMixin],
    data: () => {
      return {
        loading: false
      }
    },
    computed: {
        isMapLoaded() {
          return this.$store.state.game.map && this.$store.state.game.map.length; 
        }
    },
    methods: {
      fireConfetti() {
            this.$confetti.start({
                particles: [
                    {
                        type: 'rect',
                    },
                    {
                        type: 'circle',
                    },
                ]
            });
            setTimeout(() => {
                this.$confetti.stop();
            }, 2000);
        },
      async submitMap() {
        this.loading = true;
        this.$store.commit('game/stopTimer');
        const timeLog = this.$store.state.game.timeLog;
        const timestamp = calculateTime(timeLog, true, true);
        const data = {
            "Map": this.$store.state.game.map,
            "TimeMs": timestamp,
            "Moves": this.$store.state.game.moves,
        };
        try {
          const response = await this.$axios.$post('validate', data);
          this.addResponseToHistory(response);
          this.fireConfetti();
          this.$store.commit('game/freeze');
          this.$emit('submit', response);
        } catch (error) {
          if (error.response && error.response.status === 400) {
              this.$store.commit('game/startTimer');
              this.$store.commit('game/addMove');
              this.$emit('submit', false);
          }
        } finally {
          this.loading = false;
        }
      }
    }
}
</script>