export const state = () => ({
    dark: false,
})
  
export const mutations = {
    setDarkMode(state, d) {
        state.dark = d;
    },

    toggleDarkMode(state) {
        state.dark = !state.dark;
    }
}

export const getters =  {
    isDarkMode: (state) => () => {
      return state.dark;
    }
}