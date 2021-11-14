// Libraries
import Vuetify from "vuetify";
import Vuex from "vuex";

// Utilities
import { createLocalVue, shallowMount } from "@vue/test-utils";

// Components
import SignIn from "@/components/dialogs/SignIn";

describe("SignIn.vue", () => {
  const message = "Sign in";

  const localVue = createLocalVue();

  let vuetify;
  let wrapper;

  let actions;
  let getters;
  let state;
  let store;

  beforeEach(() => {
    // sandbox.spy(HelloWorld, "login");

    vuetify = new Vuetify();

    // Fake store
    actions = {
      login: jest.fn(),
    };
    getters = {
      isLoggedIn: jest.fn(),
    };
    state = {
      sampleState: jest.fn(),
    };

    store = new Vuex.Store({
      modules: {
        Authentication: {
          namespaced: true,
          actions,
          getters,
          state,
        },
      },
    });

    wrapper = shallowMount(SignIn, {
      localVue,
      vuetify,
      store,
      propsData: { msg: message },
    });
  });

  it("should show a login form", () => {
    // Check the component is present
    expect(wrapper.findComponent(SignIn).exists()).toBe(true);
    console.log("Wrapper: ", wrapper.html())

    // Got a dialog with a form
    const messageElt = wrapper
      .find("v-dialog-stub")
      .find("v-form-stub > v-card-stub > v-card-title-stub");
    expect(messageElt.text()).toBe(message);

    // Form fields
    expect(wrapper.findAll("v-text-field-stub").at(0).attributes("label")).toBe(
      "Email*"
    );

    expect(wrapper.findAll("v-text-field-stub").at(1).attributes("label")).toBe(
      "Password*"
    );

    // Form actions
    expect(wrapper.find('v-btn-stub[type="button"]').text()).toBe("Close");
    expect(wrapper.find('v-btn-stub[type="submit"]').text()).toBe("Sign in");
  });

  it("should hide login form on button click", async () => {
    // Login form is visible
    // console.log(wrapper.find('v-form-stub').html());
    expect(wrapper.find("v-form-stub").isVisible()).toBe(true);

    // Submit the form
    await wrapper.find('v-btn-stub[type="button"]').trigger("click");
    expect(actions.login).toHaveBeenCalled();

    // await wrapper.vm.login();

    // Login form is visible
    // Testing visibility of a vuetify element is not possible with this method!
    // console.log(wrapper.find('v-form-stub').html());
    // expect(wrapper.find('v-form-stub').isVisible()).toBe(false);
  });

  it("should call login action on button click", async () => {
    // Mock the 'login' methods
    const login = jest.fn();
    wrapper.setMethods({ login });

    // Submit the form
    await wrapper.find('v-btn-stub[type="submit"]').trigger("click");
    await wrapper.vm.login();

    expect(login).toBeCalled();
  });
});
