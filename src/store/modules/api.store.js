import versionService from "@/services/version.service";

const initialState = () => ({
  status: "",
  error: null,
  configuration: null,
});

const state = initialState();

const actions = {
  reset({ commit }) {
    commit("RESET");
  },
  async getVersion({ commit, rootState }, parameters) {
    commit("GET_REQUEST");

    // // Some GET version parameters
    // for (const [key, value] of Object.entries(parameters)) {
    //   console.log(`Parameters ${key} = ${value}`);
    // }

    versionService
      .get(parameters)
      .then((response) => {
        commit("GET_SUCCESS", response.data);
      })
      .catch((error) => {
        commit("GET_FAILURE", error);
      });
  },
};

const mutations = {
  // Reset to the initial _state
  RESET(_state) {
    const newState = initialState();
    Object.keys(newState).forEach((key) => {
      _state[key] = newState[key];
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
