import usersService from "@/services/users.service";

const initialState = () => ({
  status: "",
  error: "",
  headers: [
    {
      text: "Identifier",
      align: "center",
      sortable: false,
      value: "id",
    },
    { text: "First name", value: "firstName" },
    { text: "Last name", value: "lastName" },
    { text: "Mail", value: "email" },
    { text: "Gender", value: "gender" },
    { text: "Language", value: "language" },
  ],
  items: [],
  countItems: 0,
  pageSize: 10,
  totalItems: 0,
});

const state = initialState();

const actions = {
  reset({ commit }) {
    commit("RESET");
  },
  getAll({ commit }) {
    commit("GET_ALL_REQUEST");

    return usersService
      .getAll()
      .then((resp) => {
        commit("GET_ALL_SUCCESS", resp);
      })
      .catch((error) => {
        if (error.response) {
          // client received an error response (5xx, 4xx)
        } else if (error.request) {
          // client never received a response, or request never left
        } else {
          // anything else
        }
        commit("GET_ALL_FAILURE", error);
      });
  },
  // todo: try this...
  getById({ commit, getters }, uuid) {
    const existing = getters.itemById(uuid);
    if (existing) {
      console.log("Still existing");
      return Promise.resolve(existing);
    }

    commit("GET_ONE_REQUEST");

    // return patientService.getById(uuid).then(
    //   data => {
    //     commit("GET_ONE_SUCCESS", data);
    //     dispatch("toasts/success", router.app.$t("patients.ok_message"), {
    //       root: true
    //     });
    //   },
    //   error => {
    //     commit("GET_ONE_FAILURE", error);
    //     if (error && error !== "Unauthorized") {
    //       dispatch("toasts/error", error, { root: true });
    //     } else {
    //       dispatch("user/userDenied", "patients", { root: true });
    //     }
    //   }
    // );
  },
};

const mutations = {
  // Reset to the initial state
  RESET(state) {
    const newState = initialState();
    Object.keys(newState).forEach((key) => {
      state[key] = newState[key];
    });
  },
  GET_ALL_REQUEST(_state) {
    _state.status = "loading";
    _state.error = null;
  },
  GET_ALL_SUCCESS(_state, data) {
    _state.status = "success";
    _state.items = [];
    _state.countItems = 0;
    _state.totalItems = 0;

    if (data) {
      _state.totalItems = data["hydra:totalItems"];
      console.log("Users - Total", _state.totalItems);
      _state.countItems += data["hydra:member"].length;
      console.log("Users - Count", _state.countItems);
      // Update stored data
      _state.items = data["hydra:member"];

      this.$toast.success(
        `Got ${_state.countItems} users from the remote backend.`
      );
    }
  },
  GET_ALL_FAILURE(_state, error) {
    _state.status = "error";
    _state.error = error;
  },
  GET_ONE_REQUEST(_state) {
    _state.status = "loading";
    _state.error = null;
  },
  GET_ONE_SUCCESS(_state, data) {
    if (!data) {
      return;
    }
    _state.status = "success";

    const found = _state.items.find((item) => item.id === data.id);
    if (found) {
      const index = _state.items.findIndex((item) => item.id === data.id);
      _state.items[index] = data;
    } else {
      _state.items.push(data);
    }
    console.warn("Stored my patients information.");
  },
  GET_ONE_FAILURE(_state, error) {
    _state.status = "error";
    _state.error = error;
  },
};

const getters = {
  // Status
  isLoading: (_state) => _state.status === "loading",
  isError: (_state) => _state.status === "loading",
  getError: (_state) => _state.error,
  isLoaded: (_state) => _state.status === "success",

  // Items
  pageSize: (_state) => _state.pageSize,
  itemsCount: (_state) => _state.items.length,
  headers: (_state) => _state.headers,
  allItems: (_state) => _state.items,
  totalItems: (_state) => _state.totalItems,

  itemById: (_state) => (uuid) => {
    return _state.items.find((item) => item.id === uuid);
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
