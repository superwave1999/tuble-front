<template>
    <v-card>
        <v-card-title>{{ $t('history.title') }}</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 66vh;">

        <v-data-table
            dense
            :headers="headers"
            :items="historyStorageDesc"
            :items-per-page="-1"
            hide-default-footer
            disable-sort
        ></v-data-table>

        </v-card-text>
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

<script lang="js">
import historyMixin from '~/plugins/mixin-history'

export default {
    name: "HistoryCard",
    mixins: [historyMixin],
    data() {
        return {
            historyStorageDesc : [],
            headers: [
                { text: this.$t('history.colDate'), align: 'start', value: 'gameDate'},
                { text: this.$t('history.colMoves'), value: 'netMoves' },
                { text: this.$t('history.colTime'), value: 'netTime' },
            ]
        };
    },
    mounted() {
        this.historyStorageDesc = this.historyStorage.slice(0).reverse()
    }
}
</script>