<template>
  <v-row justify="center" align="center">
    <v-col class="v-col-width">
      <div class="text-center text-caption text--disabled">{{ $t('footer.year', { year }) }} <a :href="site" target="_blank">Imanol Romera</a>. {{ $t('footer.rights') }} <a :href="source" target="_blank">{{ $t('footer.source') }}</a>.</div>
    </v-col>
  </v-row>
</template>

<script>
import { toRoman } from 'roman-numerals';

export default {
  name: 'Footer',
  data () {
    return {
      year: toRoman(new Date().getFullYear()),
      site: 'https://www.iromera.com',
      source: 'https://github.com/superwave1999/tuble-front'
    }
  }
}
</script>