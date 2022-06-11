<template>
  <v-card id="help-card">
    <v-card-title>{{ $t('help.title') }}</v-card-title>
    <v-divider></v-divider>
    <v-card-text style="height: 66vh">
      <v-chip small class="my-3" color="cyan">
        {{ $t('help.timeReminder') }}
      </v-chip>
      <h3>{{ $t('help.section1') }}</h3>
      <p>{{ $t('help.s1p1') }}</p>
      <p>{{ $t('help.s1p2') }}</p>
      <p>{{ $t('help.s1p3') }}</p>
      <p>{{ $t('help.s1p4') }}</p>
      <h3>{{ $t('help.section2') }}</h3>
      <table>
        <tbody>
          <tr>
            <td class="extra-static match-btn">
              <v-icon x-large>mdi-timer</v-icon>
            </td>
            <td>{{ $t('help.s2d1') }}</td>
          </tr>
          <tr>
            <td class="extra-static match-btn">
              <v-icon x-large>mdi-gesture-tap</v-icon>
            </td>
            <td>{{ $t('help.s2d2') }}</td>
          </tr>
          <tr>
            <td class="extra-static match-btn">
              <v-icon x-large>mdi-dots-vertical</v-icon>
            </td>
            <td>{{ $t('help.s2d3') }}</td>
          </tr>
        </tbody>
      </table>
      <h3>{{ $t('help.section3') }}</h3>
      <table>
        <tbody>
          <tr>
            <td class="extra-static">
              <v-btn
                x-large
                :color="isDarkMode ? 'amber lighten-3' : 'indigo darken-3'"
                icon
              >
                <v-icon>{{
                  isDarkMode ? 'mdi-white-balance-sunny' : 'mdi-weather-night'
                }}</v-icon>
              </v-btn>
            </td>
            <td>
              {{ $t('help.s3d1') }}
            </td>
          </tr>
          <tr>
            <td class="extra-static">
              <v-btn x-large icon>
                <v-icon>mdi-podium</v-icon>
              </v-btn>
            </td>
            <td>
              {{ $t('help.s3d2') }}
            </td>
          </tr>
          <tr>
            <td class="extra-static">
              <v-btn x-large icon>
                <v-icon>mdi-web</v-icon>
              </v-btn>
            </td>
            <td>
              {{ $t('help.s3d3') }}
            </td>
          </tr>
          <tr>
            <td class="extra-static">
              <v-btn icon x-large>
                <v-icon>mdi-help</v-icon>
              </v-btn>
            </td>
            <td>
              {{ $t('help.s3d4') }}
            </td>
          </tr>
        </tbody>
      </table>
      <h3>{{ $t('help.section4') }}</h3>
      <p>{{ $t('help.s4p1') }}</p>
      <p>{{ $t('help.s4p2') }}</p>
      <p>{{ $t('help.s4p3') }}</p>
      <p>{{ $t('help.s4p4') }}</p>
      <h3>{{ $t('help.section5') }}</h3>
      <table>
        <tbody>
          <tr>
            <td class="extra-static pipe">
              <GameBlock :properties="fakeStraightBlock" />
            </td>
            <td>
              {{ $t('help.s5d1') }}
            </td>
          </tr>
          <tr>
            <td class="extra-static pipe">
              <GameBlock :properties="fakeCurveBlock" />
            </td>
            <td>
              {{ $t('help.s5d2') }}
            </td>
          </tr>
          <tr>
            <td class="extra-static pipe">
              <GameBlock :properties="fakeEndBlock" />
            </td>
            <td>
              {{ $t('help.s5d3') }}
            </td>
          </tr>
        </tbody>
      </table>

      <h3>{{ $t('help.section6') }}</h3>
      <table>
        <tbody>
          <tr>
            <td class="extra-static pipe">
              <GameBlock :properties="fakeTimeBenefitBlock" />
            </td>
            <td>
              {{ $t('help.s6d1') }}
            </td>
          </tr>
          <tr>
            <td class="extra-static pipe">
              <GameBlock :properties="fakeTimePenaltyBlock" />
            </td>
            <td>
              {{ $t('help.s6d2') }}
            </td>
          </tr>
          <tr>
            <td class="extra-static pipe">
              <GameBlock :properties="fakeMoveBenefitBlock" />
            </td>
            <td>
              {{ $t('help.s6d3') }}
            </td>
          </tr>
          <tr>
            <td class="extra-static pipe">
              <GameBlock :properties="fakeMovePenaltyBlock" />
            </td>
            <td>
              {{ $t('help.s6d4') }}
            </td>
          </tr>
        </tbody>
      </table>

      <h3>{{ $t('help.sectionKb') }}</h3>
      <p>
        <span class="text-h6 mr-3">{{ $t('help.keyRLeft') }}</span
        >{{ $t('help.descRLeft') }}
      </p>
      <p>
        <span class="text-h6 mr-3">{{ $t('help.keyRRight') }}</span
        >{{ $t('help.descRRight') }}
      </p>
      <p>
        <span class="text-h6 mr-3">{{ $t('help.keyValid') }}</span
        >{{ $t('help.descValid') }}
      </p>
      <p>
        <span class="text-h6 mr-3">{{ $t('help.keyUp') }}</span
        >{{ $t('help.descUp') }}.
      </p>
      <p>
        <span class="text-h6 mr-3">{{ $t('help.keyRight') }}</span
        >{{ $t('help.descRight') }}
      </p>
      <p>
        <span class="text-h6 mr-3">{{ $t('help.keyDown') }}</span
        >{{ $t('help.descDown') }}
      </p>
      <p>
        <span class="text-h6 mr-3">{{ $t('help.keyLeft') }}</span
        >{{ $t('help.descLeft') }}
      </p>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn color="blue darken-1" text @click="$emit('close', true)">
        {{ $t('button.close') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'HelpCard',
  data() {
    return {
      fakeStraightBlock: { Type: 'n', X: 0, Y: 0, Connections: [1, 3] },
      fakeCurveBlock: { Type: 'n', X: 0, Y: 0, Connections: [0, 1] },
      fakeEndBlock: { Type: 'e', X: 0, Y: 0, Connections: [-1, 1] },
      fakeTimeBenefitBlock: { Type: 'a', X: 0, Y: 0, Connections: [1, 3] },
      fakeTimePenaltyBlock: { Type: 'x', X: 0, Y: 0, Connections: [1, 3] },
      fakeMoveBenefitBlock: { Type: 'b', X: 0, Y: 0, Connections: [1, 3] },
      fakeMovePenaltyBlock: { Type: 'z', X: 0, Y: 0, Connections: [1, 3] },
    }
  },
  computed: {
    isDarkMode: {
      get() {
        return this.$vuetify.theme.isDark
      },
      set(value) {
        this.$vuetify.theme.isDark = value
      },
    },
  },
}
</script>

<style>
#help-card table {
  width: 100%;
  display: flex;
  flex-direction: column;
}

#help-card table tr {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: center;
}

#help-card table tr td {
  flex: 1 0;
}

#help-card table tr td:first-child {
  flex: 0 0;
  margin-right: 2ch;
}

#help-card .match-btn i.v-icon {
  width: 52px;
  height: 52px;
}

#help-card table tr td:first-child.pipe {
  flex: 0 0 17%;
  min-width: 8ch !important;
}
</style>
