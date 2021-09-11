// test/CustomCard.spec.js

// Libraries
import Vuetify from "vuetify";

// Utilities
import { createLocalVue, mount } from "@vue/test-utils";

// Components
import CustomCard from "@/components/CustomCard";

describe("CustomCard.vue", () => {
  const localVue = createLocalVue();
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it("should show the configured message and a button", async () => {
    const message = "Welcome to Your Vue.js App";

    // A wrapper allows to manipulate the vue...
    const wrapper = mount(CustomCard, {
      localVue,
      vuetify,
      propsData: { title: message },
    });

    // Check the component is present
    expect(wrapper.findComponent(CustomCard).exists()).toBe(true);
    expect(wrapper.findComponent({ name: "custom-card" }).exists()).toBe(true);

    // Dump the built HTML
    // console.log(wrapper.html())

    // wrapper find may be chained ;)
    const messageElt = wrapper
      .find(".v-card")
      .find(".v-card__title")
      .find("span");
    expect(messageElt.text()).toBe(message);

    // or wrapper find may be complex CSS selectors ;)
    const messageElt2 = wrapper.find(".v-card .v-card__title > span");
    expect(messageElt2.text()).toBe(message);

    // Button
    expect(wrapper.find(".v-card").find(".v-btn").text()).toBe("Action");
  });

  it("should have a custom title and match snapshot", () => {
    const wrapper = mount(CustomCard, {
      localVue,
      vuetify,
      propsData: { title: "Foobar" },
    });

    // With jest we can create snapshot files of the HTML output
    expect(wrapper.html()).toMatchSnapshot();

    // We could also verify this differently
    // by checking the text content
    const title = wrapper.find(".v-card__title > span");

    expect(title.text()).toBe("Foobar");
  });

  it("should emit an event when the action v-btn is clicked", () => {
    const wrapper = mount(CustomCard, {
      localVue,
      vuetify,
      propsData: { title: "Foobar" },
    });

    const event = jest.fn();
    const button = wrapper.find(".v-btn");

    // Here we bind a listener to the wrapper
    // instance to catch our custom event
    // https://vuejs.org/v2/api/#Instance-Methods-Events
    wrapper.vm.$on("action-btn:clicked", event);

    expect(event).toHaveBeenCalledTimes(0);

    // Simulate a click on the button
    button.trigger("click");

    // Ensure that our mock event was called
    expect(event).toHaveBeenCalledTimes(1);
  });
});
