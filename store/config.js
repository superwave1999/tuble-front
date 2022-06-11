export const state = () => ({
  timeBenefitMs: 0,
  timePenaltyMs: 0,
  moveBenefit: 0,
  movePenalty: 0,
})

export const mutations = {
  /**
   * Get config from server.
   */
  init(state, fullObject) {
    state.timeBenefitMs = fullObject.ScoreTimeBenefitMs
    state.timePenaltyMs = fullObject.ScoreTimePenaltyMs
    state.moveBenefit = fullObject.ScoreMoveBenefit
    state.movePenalty = fullObject.ScoreMovePenalty
  },
}
