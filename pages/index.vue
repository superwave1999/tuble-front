<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <Navigation />
    </v-col>
    <v-col cols="12">
      <game-map />
    </v-col>
    <v-col cols="12">
      <game-actions />
    </v-col>
    <v-col cols="12">
      <Footer />
    </v-col>
  </v-row>
</template>

<script>
const equals = require('array-equal')

export default {
    mounted() {
      window.addEventListener("keydown", this.keyboardListener);
    },
    beforeDestroy() {
      window.removeEventListener("keydown", this.keyboardListener);
    },
    methods: {
      keyboardListener(event) {
        if (this.$store.state.game.frozen) {
          return false
        }
        const arrowKeys = [
          "ArrowUp",
          "ArrowRight",
          "ArrowDown",
          "ArrowLeft"
        ]
        if (arrowKeys.includes(event.key)) {
          const topCoords = this.$store.state.game.map.length;
          let coords = this.$store.state.game.activeBlock;
          if (equals(coords, [-1, -1])) {
            coords = [0, 0];
          } else {
            const key = Number(Object.keys(arrowKeys).find(key => arrowKeys[key] === event.key));
            switch (key) {
              case 0:
                coords[1]--
                break;
              case 1:
                coords[0]++
                break;
              case 2:
                coords[1]++
                break;
              case 3:
                coords[0]--
                break;
            }
            coords = coords.map((c) => {
              if (c < 0) {
                c = 0
              }
              if (c >= topCoords) {
                c = topCoords - 1;
              }
              return c;
            });
          }
          this.$store.commit('game/activeBlock', [coords[0], coords[1]]);
        } else if (event.key === "x") {
          document.getElementById("action-rotate-left")?.click()
        } else if (event.key === "c") {
          document.getElementById("action-rotate-right")?.click()
        } else if (event.key === " ") {
          document.getElementById("action-submit")?.click()
        }
      }
    },
}
</script>