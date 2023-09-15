export const state = () => ({
  mountainList: null,
});

export const getters = {
  getMountain(state) {
    return keyword => state.mountainList.find(mountain =>{
      return mountain.slug === keyword
    });
  }
};

export const mutations = {
  SET_MOUNTAINSLIST(state, dataList) {
    state.mountainList = dataList;
  },
};

export const actions = {
  async nuxtServerInit({ commit }) {
    await fetch("https://api.nuxtjs.dev/mountains")
      .then((response) => response.json())
      .then((response) => {
        commit("SET_MOUNTAINSLIST", response);
      });
  },
};
