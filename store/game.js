import dayjs from 'dayjs'
import { isBlockModifiable } from '~/utils/modifiableblock'
import { instantiateTimeLog } from '~/utils/timelog'

export const state = () => ({
  fileTimestamp: 0,
  gameDate: null,
  map: [],

  timeLog: [],
  timerIsStarted: null,
  moves: 0,

  // The following properties are not saved.
  activeBlockModifiable: false,
  activeBlock: [-1, -1],
  frozen: false,
  _saveTimer: null,
})

export const mutations = {
  /**
   * Load daily map from server.
   */
  init(state, fullObject) {
    let memory = localStorage.getItem('_tuble_inc')
    if (memory) {
      memory = JSON.parse(memory)
    }
    const lastCompletedMap = localStorage.getItem('_tuble_lts')
    const serverTimestamp = fullObject.Timestamp
    let dataGameDate = fullObject.Date
    let dataMap = fullObject.Map
    if (memory) {
      // Restore map if exists.
      if (memory.gameDate) {
        dataGameDate = memory.gameDate
      }
      if (memory.map && memory.map.length) {
        dataMap = memory.map
      }

      // Restore stats.
      if (memory.moves) {
        state.moves = memory.moves
      }
      if (memory.timeLog && memory.timeLog.length) {
        state.timeLog = instantiateTimeLog(memory.timeLog)
      }

      if (memory.timerIsStarted) {
        // Duplicate last time log as a "stop" time.
        const lastStart = state.timeLog[state.timeLog.length - 1]
        state.timeLog.push(lastStart)
        state.timeLog.push(dayjs()) // Started.
      }
      state.timerIsStarted = memory.timerIsStarted
    }
    state.gameDate = dataGameDate
    state.fileTimestamp = serverTimestamp
    state.map = dataMap
    if (lastCompletedMap === serverTimestamp) {
      state.timerIsStarted = false
      state.frozen = true
    } else {
      if (memory && memory.timerIsStarted === false) {
        // Start timer if stopped.
        state.timeLog.push(dayjs())
        state.timerIsStarted = true
      }
      this.commit('game/startPeriodicSave')
    }
  },

  /**
   *
   * @param {*} state
   * @param {*} coords
   */
  activeBlock(state, coords) {
    const block = state.map[coords[0]][coords[1]]
    state.activeBlockModifiable = isBlockModifiable(block)
    state.activeBlock = [coords[0], coords[1]]
  },

  /**
   * Rotate block.
   * We increase or decrease the connector value of the selected block.
   * Straight pipes have two units between the in and out.
   * Curved pipes have one.
   * Overflow out of range is also handled.
   * @param {*} state
   * @param {*} toRight
   */
  rotateActiveBlock(state, toRight) {
    this.commit('game/startTimer')
    this.commit('game/addMove')
    const activeX = state.activeBlock[0]
    const activeY = state.activeBlock[1]
    const activeBlockFaces = state.map[activeX][activeY].Connections
    let diff = 1
    if (!toRight) {
      diff = 0 - diff
    }
    state.map[activeX][activeY].Connections = activeBlockFaces.map((face) => {
      let future = face + diff
      if (future > 3) {
        if (Math.abs(future - 3) > 1) {
          future = 1
        } else {
          future = 0
        }
      } else if (future < 0) {
        if (Math.abs(future - 0) > 1) {
          future = 2
        } else {
          future = 3
        }
      }
      return future
    })
  },

  startTimer(state) {
    if (!state.timerIsStarted) {
      state.timeLog.push(dayjs())
      state.timerIsStarted = true
    }
  },

  stopTimer(state) {
    if (state.timerIsStarted) {
      if (!state.timeLog || !state.timeLog.length) {
        state.timeLog = []
      }
      state.timeLog.push(dayjs())
      state.timerIsStarted = false
    }
  },

  addMove(state) {
    state.moves++
  },

  freeze(state) {
    localStorage.setItem('_tuble_lts', state.fileTimestamp) // Save timestamp as completed.
    this.commit('game/stopTimer')
    state.activeBlockModifiable = false
    state.activeBlock = [-1, -1]
    state.frozen = true
    this.commit('game/stopPeriodicSave')
  },

  startPeriodicSave(state) {
    state._saveTimer = setInterval(() => {
      this.commit('game/save')
    }, 5000)
  },

  save(state) {
    const storage = {
      fileTimestamp: state.fileTimestamp,
      gameDate: state.gameDate,
      map: state.map,
      timeLog: state.timeLog,
      timerIsStarted: state.timerIsStarted,
      moves: state.moves,
    }
    const content = JSON.stringify(storage)
    localStorage.setItem('_tuble_inc', content)
  },

  stopPeriodicSave(state) {
    clearInterval(state._saveTimer)
  },
}
