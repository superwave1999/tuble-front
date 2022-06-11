<template>
  <v-sheet
    class="block-base"
    :class="{
      click: isModifiable,
      noclick: !isModifiable,
      active: isActiveBlock,
      frozen: isFrozenGame,
    }"
    rounded
    :elevation="isActiveBlock && !isFrozenGame ? 4 : 0"
    @click="setActiveBlock"
  >
    <div v-if="properties" :style="baseImage + styleString" class="block-image">
      <div class="aspect-ratio"></div>
    </div>
    <div v-if="properties && overlayIcon" class="overlay">
      <v-btn
        class="extra-static"
        elevation="2"
        :color="overlayColour"
        fab
        x-small
        @click="false"
      >
        <v-icon>{{ overlayIcon }}</v-icon>
      </v-btn>
    </div>
  </v-sheet>
</template>

<script>
import { isBlockModifiable } from '~/utils/modifiableblock'

const equals = require('array-equal')

const typeIcons = {
  a: { icon: 'mdi-timer', colour: 'light-green darken-3' }, // Time benefit
  b: { icon: 'mdi-gesture-tap', colour: 'light-green darken-3' }, // Moves benefit
  x: { icon: 'mdi-timer', colour: 'pink darken-2' }, // Time penalty
  z: { icon: 'mdi-gesture-tap', colour: 'pink darken-2' }, // Moves penalty
}

export default {
  name: 'GameBlock',
  props: {
    properties: {
      type: Object,
      default: () => {
        return null
      },
    },
  },
  data() {
    return {
      coords: [0, 1, 2, 3],
    }
  },
  computed: {
    isCurved() {
      if (this.properties.Connections.includes(-1)) {
        return false
      }
      const diff = Math.abs(
        this.properties.Connections[0] - this.properties.Connections[1]
      )
      return Boolean(diff % 2)
    },
    baseImage() {
      let suffix
      if (this.properties.Connections.includes(-1)) {
        suffix = 'h'
      } else if (this.isCurved) {
        suffix = 'c'
      } else {
        suffix = 's'
      }
      const img = 'img/block_' + suffix + '.svg'
      return `background-image: url("${img}");`
    },
    overlayIcon() {
      return typeIcons[this.properties.Type]?.icon || ''
    },
    overlayColour() {
      return typeIcons[this.properties.Type]?.colour || ''
    },
    styleString() {
      const parts = []
      if (this.properties.Connections.includes(-1)) {
        const max = Math.max(...this.properties.Connections)
        parts.push('rotate(' + max * 90 + 'deg)')
      } else if (!this.isCurved) {
        if ((this.properties.Connections[0] || 0) % 2 === 1) {
          parts.push('rotate(90deg)')
        }
      } else {
        const sort = this.properties.Connections.slice()
        sort.sort()
        let sum
        if (equals(sort, [0, 3])) {
          sum = Math.max(...this.properties.Connections)
        } else {
          sum = Math.min(...this.properties.Connections)
        }
        parts.push('rotate(' + sum * 90 + 'deg)')
      }
      return 'transform: ' + parts.join(' ')
    },
    isActiveBlock() {
      const [x, y] = this.$store.state.game.activeBlock
      return x === this.properties.X && y === this.properties.Y
    },
    isModifiable() {
      return isBlockModifiable(this.properties)
    },
    isFrozenGame() {
      return this.$store.state.game.frozen
    },
  },
  methods: {
    setActiveBlock() {
      this.$emit('select', [this.properties.X, this.properties.Y])
    },
  },
}
</script>

<style scoped>
div.block-base {
  width: 100%;
  background-color: transparent;
  position: relative;
  transform: rotate(0.01deg); /* Improve antialiasing */
}

div.block-base.click {
  cursor: pointer;
}

div.block-base.click:hover {
  background-color: #00695c2f !important; /* teal darken-3 */
}

div.block-base.noclick {
  cursor: not-allowed;
}

div.block-base.noclick:hover {
  background-color: #c628282f !important; /* red lighten-1 */
}

div.block-base.active,
div.block-base.active:hover {
  cursor: default;
  background-color: #00695c !important; /* teal darken-3 */
}

div.block-base.active.noclick,
div.block-base.active.noclick:hover {
  cursor: not-allowed;
  background-color: #c62828bb !important; /* red lighten-1 */
}

div.block-base.frozen:not(.active) {
  /* Override everything */
  pointer-events: none !important;
  cursor: default !important;
  opacity: 0.7 !important;
  background-color: transparent !important;
}

div.overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  text-align: center;
}

/* Custom implementation of aspect-ratio. v-img not working with svg */
div.block-image {
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
}

div.block-image div.aspect-ratio {
  padding: 100% 0 0;
}
</style>
