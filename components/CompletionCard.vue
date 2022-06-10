<template>
    <v-card class="overflow-hidden">
        <h1 class="text-center">{{ $t('complete.title') }}</h1>
        <v-divider></v-divider>
        <div v-if="data" class="d-flex justify-space-evenly stats">
            <div class="d-flex flex-column">
                <v-icon large>mdi-timer</v-icon>
                <p v-if="data.NetTimeMs !== data.TimeMs" class="body-2 text-center">{{formattedBaseTime}}</p>
                <p v-if="data.TimeBenefitBlocks" class="body-2 green--text text-center">{{formattedTimeBenefit}}</p>
                <p v-if="data.TimePenaltyBlocks" class="body-2 red--text text-center">{{formattedTimePenalty}}</p>
                <p v-if="data.NetTimeMs" class="body-1 primary--text text-center font-weight-bold">{{formattedNetTime}}</p>
            </div>
            <div class="d-flex flex-column">
                <v-icon large>mdi-gesture-tap</v-icon>
                <p v-if="data.NetMoves !== data.Moves" class="body-2 text-center">{{data.Moves}}</p>
                <p v-if="data.MoveBenefitBlocks" class="body-2 green--text text-center">{{formattedMoveBenefit}}</p>
                <p v-if="data.MovePenaltyBlocks" class="body-2 red--text text-center">{{formattedMovePenalty}}</p>
                <p v-if="data.NetMoves" class="body-1 primary--text text-center font-weight-bold">{{data.NetMoves}}</p>
            </div>
        </div>
        <v-divider></v-divider>
        <v-card-actions>
            <v-btn
                color="blue darken-1"
                text
                @click="$emit('close', true)"
            >
                {{ $t('button.close') }}
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import dayjs from 'dayjs';
import { formatMoveStat } from '~/utils/movestat';
import { formatTimeStat } from '~/utils/timestat';

export default {
    name: "CompletionCard",
    props: {
        data: {
            type: Object,
            default: () => { return null }
        }
    },
    computed: {
        formattedBaseTime() {
            return dayjs(this.data?.TimeMs || 0).format('mm:ss')
        },
        formattedTimeBenefit() {
            const config = this.$store.state.config.timeBenefitMs;
            return formatTimeStat(config, this.data?.TimeBenefitBlocks || 0, '-')
        },
        formattedTimePenalty() {
            const config = this.$store.state.config.timePenaltyMs;
            return formatTimeStat(config, this.data?.TimePenaltyBlocks || 0, '+')
        },
        formattedNetTime() {
            let prefix = '';
            const value = this.data?.NetTimeMs || 0;
            if (value < 0) {
                prefix = '-';
            }
            const timeStr = dayjs(this.data?.NetTimeMs || 0).format('mm:ss')
            return `${prefix}${timeStr}`
        },
        formattedMoveBenefit() {
            const config = this.$store.state.config.moveBenefit;
            return formatMoveStat(config, this.data?.MoveBenefitBlocks || 0, '-');
        },
        formattedMovePenalty() {
            const config = this.$store.state.config.movePenalty;
            return formatMoveStat(config, this.data?.MovePenaltyBlocks || 0, '+');
        },
    }
}
</script>

<style scoped>
div.stats > div {
    flex: 0 0 50%
}
</style>