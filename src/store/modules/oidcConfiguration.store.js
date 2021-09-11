const initialState = () => ({
  status: "",
  errors: [],
  configuration: null,
});

const state = initialState();

export const actions = {
  reset({ commit }) {
    commit("RESET");
  },
  async getOidcConfiguration({ commit, rootState }) {
    commit("GET_REQUEST");

    await this.axios
      .get(rootState.remote.oidcConfiguration)
      .then((response) => {
        commit("GET_SUCCESS", response.data);
      })
      .catch((error) => {
        commit("GET_FAILURE", error);
      });
  },
};

export const mutations = {
  // Reset to the initial state
  RESET(state) {
    const newState = initialState();
    Object.keys(newState).forEach((key) => {
      state[key] = newState[key];
    });
  },
  GET_REQUEST(_state) {
    _state.status = "loading";
    _state.error = null;
  },
  GET_SUCCESS(_state, data) {
    _state.status = "success";
    _state.configuration = data;
  },
  GET_FAILURE(_state, error) {
    _state.status = "error";
    _state.error = error;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
