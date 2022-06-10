<template>
  <v-row justify="center" align="center">
    <v-col class="v-col-width">
      <v-card v-if="map && map.length" class="d-flex justify-between map" elevation="4" width="100%">
        <div v-for="(xitems, xidx) in map" :key="xidx" class="map-column">
          <GameBlock v-for="(item, yidx) in xitems" :key="xidx + ',' + yidx" :properties="item || null" @select="changeActiveBlock"/>
        </div>
      </v-card>
      <v-card v-if="!map || !map.length" elevation="4" width="100%">
        <v-responsive :aspect-ratio="1">
          <v-progress-linear
            indeterminate
            color="teal"
          ></v-progress-linear>
          <v-card-title>{{ $t('loading') }}</v-card-title>
        </v-responsive>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'GameMap',
  computed: {
    map() {
      return this.$store.state.game.map; 
    }
  },
  methods: {
    changeActiveBlock(data) {
      this.$store.commit('game/activeBlock', data);
    }
  }
}
</script>

<style scoped>
div.map {
  margin: 0 auto;
  padding: 0.6ch;
}

div.map-column {
  max-width: 100px;
  flex: 0 3 100px;
}
</style>