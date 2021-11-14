// Libraries
import Vuetify from "vuetify";

// Utilities
import { createLocalVue, shallowMount } from "@vue/test-utils";

// Components
import HelloWorld from "@/components/HelloWorld.vue";

describe("HelloWorld.vue", () => {
  const message = "Welcome to Vuetify";

  const localVue = createLocalVue();

  let vuetify;
  let wrapper;

  beforeEach(() => {
    // sandbox.spy(HelloWorld, "login");

    vuetify = new Vuetify();

    wrapper = shallowMount(HelloWorld, {
      localVue,
      vuetify,
      propsData: { msg: message },
    });
  });

  it("should show a message panel", () => {
    // Check the component is present
    expect(wrapper.findComponent(HelloWorld).exists()).toBe(true);
    expect(wrapper.findComponent({ name: "hello-world" }).exists()).toBe(true);

    console.log(wrapper.html());

    // Page title
    const messageElt = wrapper
      .find("v-container-stub")
      .find("v-row-stub h1");
    expect(messageElt.text()).toBe(message);
  });
});
