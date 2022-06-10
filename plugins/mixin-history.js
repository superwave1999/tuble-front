import dayjs from 'dayjs';

export default {
    computed: {
        historyStorage: {
            get() {
                let value = [];
                const stored = localStorage.getItem('_tuble_history')
                if (stored) {
                    value = JSON.parse(stored);
                }
                return value;
            },
            set(data) {
                const str = JSON.stringify(data);
                localStorage.setItem('_tuble_history', str)
            }
        }
    },
    methods: {
        addResponseToHistory(item) {
            const h = this.historyStorage;
            h.push({
                netMoves: item.NetMoves,
                netTime: dayjs(item.NetTimeMs).format('mm:ss'),
                gameDate: this.$store.state.game.gameDate,
            })
            if (h.length > 30) {
                // localStorage size is limited. We will keep only 30 entries.
                h.shift()
            }
            this.historyStorage = h;
        }
    }
}