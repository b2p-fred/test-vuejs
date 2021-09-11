const initialState = () => ({
  // A notifications queue
  queue: [],
  // The maximum messages count stored in the queue
  max: 10,
  // A message specific for the login/register pages
  loginMessage: null,
});

const state = initialState();

const actions = {
  reset({ commit }) {
    commit("RESET");
  },
  success({ commit }, message) {
    commit("NOTIFY_SUCCESS", message);
  },
  error({ commit }, message) {
    commit("NOTIFY_ERROR", message);
  },
  loginAlert({ commit }, message) {
    commit("LOGIN_MESSAGE_ALERT", message);
  },
  loginClear({ commit }) {
    commit("LOGIN_MESSAGE_CLEAR");
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
  NOTIFY_SUCCESS(_state, message) {
    // Pushes a notification message in the queue
    _state.queue.push({
      // title: "Success message",
      type: "success",
      duration: 5000,
      text: message,
    });

    if (_state.queue.length > _state.max) {
      // Perhaps alerting would be useful?
      _state.queue.shift();
    }
  },
  NOTIFY_ERROR(_state, message) {
    _state.queue.push({
      // title: "Alert message",
      type: "error",
      // Very long duration to avoid making it mandatory clickable
      duration: 60000,
      text: message,
    });

    if (_state.queue.length > _state.max) {
      // Perhaps alerting would be useful?
      console.warn("Too much messages in the notification queue.");
      _state.queue.shift();
    }
  },
  LOGIN_MESSAGE_ALERT(_state, message) {
    _state.loginMessage = message;
  },
  LOGIN_MESSAGE_CLEAR(_state) {
    _state.loginMessage = null;
  },
};

const getters = {
  lastLoginMessage: (state) => {
    return state.loginMessage &&
      state.loginMessage !== "" &&
      state.loginMessage !== "undefined"
      ? state.loginMessage
      : "";
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
